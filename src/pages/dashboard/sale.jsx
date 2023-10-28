import { useState, useEffect } from "react";
import { format } from "date-fns-tz";
import {
  Card,
  CardFooter,
  Input,
  Typography,
  Select,
  Option,
  IconButton,
  Button,
  Radio ,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { GiCancel } from "react-icons/gi";
import { IoIosSave } from "react-icons/io";
import { BiReceipt } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { PiReceipt } from "react-icons/pi";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import THBText from 'thai-baht-text'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";

import axios from "axios";
import Swal from "sweetalert2";

import { PDFViewer } from "@react-pdf/renderer";
import { Receive } from "./Receive";
import {Receipt1} from "./Receipt1"
import {Receipt2} from "./Receipt2"
import {Receipt3} from "./Receipt3"
 
export function Sale() {
  const Token = localStorage.getItem("token");
  const [editBill, setEditBill] = useState(false);

  const [selectedSavingsBond,setSelectedSavingsBond] = useState(0)
  const [selectedGovernmentBonds,setSelectedGovernmentBonds] = useState(0)

  // console.log(selectedGovernmentBonds)
  // console.log(selectedSavingsBond)



  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  //---------- แสดงข้อมูลในตาราง --------------- //

  const [listData, setListData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectCustomerData, setSelectCustomerData] = useState([]);
  const [selectedEditCustomerData, setSelectedEditCustomerData] =
    useState(null);
  const [selectedNewCustomerData, setSelectedNewCustomerData] =
    useState(null);
  const [billRefNo, setBillRefNo] = useState("");
  const [billNo, setBillNo] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API}/Customer`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      setListData(response.data);
      // console.log(listData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -----  แก้ปัญหาคลิกครั้งแรกข้อมูลไม่แสดง ---- //

  useEffect(() => {
    setFilteredOptions(listData);
  }, [listData]);
  // console.log(listData)

  const handleSearch = (text) => {
    setSearchText(text);
    setIsOpen(true);
    const filtered = listData.filter((item) =>
      item.customer_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelect = (value) => {
    setIsOpen(false);
    const selectedCustomer = listData.find(
      (item) => item.customer_name === value
    );
    setSearchText(selectedCustomer.customer_name);
    setSelectCustomerData(selectedCustomer);
    setSelectedEditCustomerData(selectedCustomer);
  };
  // console.log(selectCustomerData)


  const handleClear = () => {
    setSearchText("");
    setIsOpen(false);
  };

  // ------------ Dialog เพิ่มข้อมูลผู้บริจาค  menu2 ------------------------ //
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");
  const [newCustomerDelivery, setNewCustomerDelivery] = useState("");
  const [newCustomerContract, setNewCustomerContract] = useState("");
  const [newCustomerTel, setNewCustomerTel] = useState("");
  const [newCustomerNoun, setNewCustomerNoun] = useState("");
  const [newCustomerNumber, setNewCustomerNumber] = useState("");

  //-------------- เพิ่ม ผู้บริจาค ------------------- //

  const createNewCustomer = async () => {
    setOpenViewCustomerDialog(false);

    try {
      const data = {
        customer_name: newCustomerName,
        customer_address: newCustomerAddress,
        customer_delivery: newCustomerDelivery,
        customer_contract: newCustomerContract,
        customer_tel: newCustomerTel,
        customer_noun: newCustomerNoun,
        customer_number: newCustomerNumber,
      };

      // console.log(data);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/Customer`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data);
      setSelectedNewCustomerData(response.data)
      setNewCustomerName("");
      setNewCustomerAddress("");
      setNewCustomerDelivery("");
      setNewCustomerContract("");
      setNewCustomerTel("");
      setNewCustomerNoun("");
      setNewCustomerNumber("");
      await fetchData();
      Swal.fire({
        // position: 'top-end',
        icon: "success",
        title: "เพิ่มผู้บริจาคเรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("ไม่สามารถเพิ่มหัวข้อประมูลได้", error);
      Swal.fire({
        icon: "error",
        title: "เพิ่มผู้บริจาคไม่สำเร็จ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  // ------  แก้ไขผู้บริจาค  ถาวร ------------- //

  const editCustomer = async () => {
    setOpenViewCustomerDialog(false);

    try {
      if (!selectedEditCustomerData) {
        console.error("No data selected for editing.");
        return;
      }

      // console.log(selectedEditCustomerData);
      const data = {
        customer_name: selectedEditCustomerData.customer_name,
        customer_address: selectedEditCustomerData.customer_address,
        customer_delivery: selectedEditCustomerData.customer_delivery,
        customer_contract: selectedEditCustomerData.customer_contract,
        customer_tel: selectedEditCustomerData.customer_tel,
        customer_noun: selectedEditCustomerData.customer_noun,
        customer_number: selectedEditCustomerData.customer_number,
        customer_line: "aaaa",
      };
      // console.log(data);
      // console.log(selectedEditCustomerData.id);
      // console.log(Token);

      const response = await axios.put(
        `${import.meta.env.VITE_APP_API}/Customer/${selectedEditCustomerData.id}/edit`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );

      // console.log(response);

      await fetchData();
    } catch (error) {
      console.error("ไม่สามารถแก้ไขผู้บริจาคได้", error);
      Swal.fire({
        icon: "error",
        title: "แก้ไขผู้บริจาคไม่สำเร็จ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  // ------  แก้ไขผู้บริจาค  ชั่วคราว ------------- //

  const editCustomerTemp = async () => {
    setOpenViewCustomerDialog(false);

    try {
      if (!selectedEditCustomerData) {
        console.error("No data selected for editing.");
        return;
      }

      // console.log(selectedEditCustomerData);
      const data = {
        customer_name: selectedEditCustomerData.customer_name,
        customer_address: selectedEditCustomerData.customer_address,
        customer_delivery: selectedEditCustomerData.customer_delivery,
        customer_contract: selectedEditCustomerData.customer_contract,
        customer_tel: selectedEditCustomerData.customer_tel,
        customer_noun: selectedEditCustomerData.customer_noun,
        customer_number: selectedEditCustomerData.customer_number,
        customer_line: "aaaa",
      };
      // console.log(data);
      

      await fetchData();
    } catch (error) {
      console.error("ไม่สามารถแก้ไขผู้บริจาคได้", error);
      Swal.fire({
        icon: "error",
        title: "แก้ไขผู้บริจาคไม่สำเร็จ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };


  useEffect(() => {
    if (selectedEditCustomerData) {
      // ดึงข้อมูลผู้บริจาคจาก selectedEditCustomerData
      const {
        customer_name,
        customer_address,
        customer_delivery,
        customer_contract,
        customer_noun,
        customer_tel,
        customer_number,
      } = selectedEditCustomerData;
      // ตั้งค่าข้อมูลให้แสดงผ่าน selectCustomerData
      setSelectCustomerData({
        customer_name,
        customer_address,
        customer_delivery,
        customer_contract,
        customer_noun,
        customer_tel,
        customer_number,
      });
      setSearchText(customer_name);
    } 

  }, [selectedEditCustomerData]);


  useEffect(() => {
    if (selectedNewCustomerData) {
      // ดึงข้อมูลผู้บริจาคจาก selectedEditCustomerData
      const {
        customer_name,
        customer_address,
        customer_delivery,
        customer_contract,
        customer_noun,
        customer_tel,
        customer_number,
      } = selectedNewCustomerData;
      // ตั้งค่าข้อมูลให้แสดงผ่าน selectCustomerData
      setSelectCustomerData({
        customer_name,
        customer_address,
        customer_delivery,
        customer_contract,
        customer_noun,
        customer_tel,
        customer_number,
      });
      setSearchText(customer_name);
    } 

  }, [selectedNewCustomerData]);


  // ----------  หัวข้อตาราง -------------- //
  const TABLE_HEAD = [
    "ลำดับ",
    "หมวดหมู่",
    "รายการ",
    "จำนวน",
    "หน่วยนับ",
    "ราคา/หน่วย",
    "จำนวนเงิน",
    "ลบ",
  ];

  const TABLE_HEAD1 = [
    "ลำดับ",
    "ชื่อสินค้า",
    "หน่วยนับ",
    "หมวดหมู่",
    "เลือก",
  ];
  // -------------------------------------- //

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);
  // --------------------------------------- //

  //---------- แสดงข้อมูลสินค้าในตาราง --------------- //

  const [listProductData, setListProductData] = useState([]);
  const [searchQueryProductName, setSearchQueryProductName] = useState("");

  const [noProductData, setNoProductData] = useState(true);

  const [newProductName, setNewProductName] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");

  const [selectedEditData, setSelectedEditData] = useState(null);

  const [saveSelectedProductData,setSaveSelectedProductData] = useState([])
  const [note,setNote] = useState('')

  const [billData,setBillData] = useState([])
  const [billDataId,setBillDataId] = useState('')

  const fetchProductData = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/Product`;

      if (searchQueryProductName) {
        // console.log(searchQueryProductName);
        url = `${import.meta.env.VITE_APP_API}/Search-Product/?search=${searchQueryProductName}`;
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response.data);
      setListProductData(response.data);
      setNoProductData(false);
    } catch (error) {
      console.error(error);
      setNoProductData(true);
    }
  };

  useEffect(() => {
    fetchProductData();
    
  }, [searchQueryProductName]);

  //-------------- เพิ่มสินค้า ------------------- //

  const createNewProduct = async () => {
    setOpenViewProductDialog(false);

    try {
      const data = {
        product_name: newProductName,
        product_count: newProductCount,
        product_category: newProductCategory,
      }

      // console.log(data)
      const response = await axios.post(`${import.meta.env.VITE_APP_API}/Product`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response.data.Data)
      setNewProductName(""); 
      setNewProductCount(""); 
      setNewProductCategory(""); 
      await fetchData()
      setSearchQueryProductName('')
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'เพิ่มสินค้าเรียบร้อย',
        showConfirmButton: false,
        timer: 1500
      })

        // เพิ่มรายการสินค้าที่เพิ่มเข้ามาใน saveSelectedProductData
        // const newData = { product_category: response.data.product_category, product_name: response.data.product_name, product_count: response.data.product_count  , amount: 0, unit:0, total: 0 };
        const newData = { ...response.data.Data, amount: 0, unit:0, total: 0 };
        setSaveSelectedProductData([...saveSelectedProductData, newData]);
      
    } catch (error) {
      console.error("ไม่สามารถเพิ่มสินค้าได้", error);
      setSearchQueryProductName('')
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มสินค้าไม่สำเร็จ ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
    }
  };

 

  // ------  แก้ไขหัวข้อสินค้า ------------- //
  const editProduct = async () => {
    setOpenViewProductDialog(false);
    try {
      if (!selectedEditData || !selectedEditData.id) {
        console.error("No data selected for editing or missing ID.");
        return;
      }
  
      const data = {
        product_name: selectedEditData.product_name,
        product_count: selectedEditData.product_count,
        product_category: selectedEditData.product_category,
      };
      // console.log(data)
  
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API}/Product/${selectedEditData.id}/edit`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // console.log("Product edited successfully.");
        // ทำการอัปเดต state หรือตัวแปรที่ใช้เก็บข้อมูลตารางด้านล่าง
        setSaveSelectedProductData((prevData) => {
          const updatedData = [...prevData];
          // หาตำแหน่งของข้อมูลที่แก้ไข
          const dataIndex = updatedData.findIndex((item) => item.id === selectedEditData.id);
          if (dataIndex !== -1) {
            updatedData[dataIndex] = {
              ...updatedData[dataIndex],
              product_name: selectedEditData.product_name,
              product_count: selectedEditData.product_count,
              product_category: selectedEditData.product_category,
              // อัปเดตข้อมูลอื่น ๆ ตามที่คุณต้องการ
            };
          }
          return updatedData;
        });
  
        setSearchQueryProductName("");
        Swal.fire({
          icon: "success",
          title: "แก้ไขสินค้าเรียบร้อย",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("ไม่สามารถแก้ไขสินค้าได้");
        setSearchQueryProductName("");
        Swal.fire({
          icon: "error",
          title: "แก้ไขสินค้าไม่สำเร็จ",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      console.error("ไม่สามารถแก้ไขสินค้าได้", error);
      setSearchQueryProductName("");
      Swal.fire({
        icon: "error",
        title: "แก้ไขสินค้าไม่สำเร็จ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };
  

  // -------------------------------------------------- //

  
  const handleEditClick = (data) => {
      // console.log(data)
      setSelectedEditData(data)
  };

  

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const itemsProductPerPage = 5;

  const startProductIndex = (currentProductPage - 1) * itemsProductPerPage;
  const endProductIndex = startProductIndex + itemsProductPerPage;
  const displayedProductData = listProductData.slice(
    startProductIndex,
    endProductIndex
  );

  const totalProductPages = Math.ceil(
    listProductData.length / itemsProductPerPage
  );


  const saveSelectedProduct = (data) => {
    // console.log(data);
  
    // ตรวจสอบว่าข้อมูลที่ถูกเลือกไม่ซ้ำกับข้อมูลที่มีอยู่แล้วใน saveSelectedProductData
    if (!saveSelectedProductData.some(item => item.id === data.id)) {
      if (saveSelectedProductData.length < 8) {
        const newData = { ...data, amount: 0, unit:0, total: 0 };
      setSaveSelectedProductData([...saveSelectedProductData, newData]);

      } else {
        // setOpenViewProductDialog(false);
        Swal.fire({
          icon: "error",
          title: "ข้อมูลเกิน 8 รายการ",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    } else {
      // แจ้งเตือนถ้าข้อมูลซ้ำกัน
      // setOpenViewProductDialog(false);
      Swal.fire({
        icon: "error",
        title: "ข้อมูลนี้มีอยู่ในรายการแล้ว",
        text: "กรุณาเลือกข้อมูลอื่น",
        confirmButtonText: "ตกลง",
      });
    }
    setOpenViewProductDialog(false);
  }
  

// สร้างฟังก์ชันที่จะใช้ในการอัปเดต amount และ unit และคำนวณค่า total
const [sumTotal, setSumTotal] = useState(0);
const [thbText, setThbText] = useState('');

const handleInputChangeAmount = (value, index) => {
  // ทำการสร้างรายการใหม่ที่มีข้อมูลเดิมและเปลี่ยนค่า amount
  const updatedData = [...saveSelectedProductData];
  updatedData[index].amount = parseInt(value, 10); // แปลงค่าเป็นตัวเลขจำนวนเต็ม

  const amount = updatedData[index].amount || 0;
  const unit = updatedData[index].unit || 0;
  updatedData[index].total = amount * unit;

  let newSumTotal = 0;
  updatedData.forEach(item => {
    newSumTotal += item.total || 0;
  });

  // อัปเดตค่า sumtotal ใน state
  setSumTotal(newSumTotal);
  setThbText(THBText(newSumTotal))
  
  setSaveSelectedProductData(updatedData);
};

// console.log(thbText)

const handleInputChangeUint = (value, index) => {
  // ทำการสร้างรายการใหม่ที่มีข้อมูลเดิมและเปลี่ยนค่า amount
  const updatedData = [...saveSelectedProductData];
  updatedData[index].unit = parseInt(value, 10); // แปลงค่าเป็นตัวเลขจำนวนเต็ม

  const amount = updatedData[index].amount || 0;
  const unit = updatedData[index].unit || 0;
  updatedData[index].total = amount * unit;

  let newSumTotal = 0;
  updatedData.forEach(item => {
    newSumTotal += item.total || 0;
  });

  // อัปเดตค่า sumtotal ใน state
  setSumTotal(newSumTotal);
  setThbText(THBText(newSumTotal))

  setSaveSelectedProductData(updatedData);
};





// -----  ลบสินค้า  ------------------------//

const deleteProduct = (index) => {
  // const newData = saveSelectedProductData.filter((_, i) => i !== index);
  // setSaveSelectedProductData(newData);

  const deletedProduct = saveSelectedProductData[index];
const newData = saveSelectedProductData.filter((_, i) => i !== index);

// คำนวณ sumtotal ใหม่โดยลบค่า total ของรายการที่ถูกลบออกจากค่า sumtotal เดิม
const newSumTotal = sumTotal - (deletedProduct.total || 0);

// อัปเดตค่า sumtotal ใน state
setSumTotal(newSumTotal);
setThbText(THBText(newSumTotal))

// อัปเดตข้อมูลที่ saveSelectedProductData
setSaveSelectedProductData(newData);
}




  // ---------- แสดงวันที่ปัจจุบัน ------------//

  const currentDate = new Date();
  const thaiTimeZone = "Asia/Bangkok";
  const formattedDate = format(currentDate, "dd/MM/yyyy", {
    timeZone: thaiTimeZone,
  });

  //------------- แปลง วันที่ ------------------------------------- //

  function formatDate(dateString, format) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      return ""; // หรือค่า default ที่คุณต้องการ
    }

    if (format === "DD/MM/YYYY") {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  //---------- Dialog  ดูข้อมูลผู้บริจาค -------------- //
  const [activeCustomerMenu, setActiveCustomerMenu] = useState("menu1");
  const [selectedViewCustomerData, setSelectedViewCustomerData] =
    useState(null);
  const [openViewCustomerDialog, setOpenViewCustomerDialog] = useState(false);
  const [dialogSizeViewCustomer, setDialogSizeViewCustomer] = useState("xl");

  const handleViewCustomerClick = () => {
    setActiveCustomerMenu('menu1')
    setSelectedViewCustomerData(); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewCustomerDialog(true);
  };

  const handleCloseViewCustomerDialog = () => {
    setSelectedViewCustomerData(null);
    setOpenViewCustomerDialog(false);
  };
  // ------------ Dialog ดูข้อมูลผู้บริจาค  menu1------------------------------------ //
  const [searchQueryCustomer, setSearchQueryCustomer] = useState("");

  const handleSearchCustomer = (text) => {
    setSearchQueryCustomer(text);
    setIsOpen(true);
    const displayedData = listData.filter((data) =>
      data.Product_name.toLowerCase().includes(searchQueryCustomer.toLowerCase())
    );
  };

  //---------- Dialog  ดูข้อมูลสินค้า -------------- //
  const [activeProductMenu, setActiveProductMenu] = useState("menu1");
  const [selectedViewProductData, setSelectedViewProductData] = useState(null);
  const [openViewProductDialog, setOpenViewProductDialog] = useState(false);
  const [dialogSizeViewProduct, setDialogSizeViewProduct] = useState("xl");

  const handleViewProductClick = () => {
    setActiveProductMenu("menu1")
    setSelectedViewProductData(); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewProductDialog(true);
  };

  const handleCloseViewProductDialog = () => {
    setSelectedViewProductData(null);
    setOpenViewProductDialog(false);
  };

  //---------- Dialog  แก้ไขบิล -------------- //
  const [activeBillMenu, setActiveBillMenu] = useState("menu1");
  const [selectedViewBillData, setSelectedViewBillData] = useState(null);
  const [openViewBillDialog, setOpenViewBillDialog] = useState(false);
  const [dialogSizeViewBill, setDialogSizeViewBill] = useState("xxl");

  const handleViewBillClick = () => {
    setSelectedViewBillData(); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewBillDialog(true);
  };

  const handleCloseViewBillDialog = () => {
    setSelectedViewBillData(null);
    setEditBill(false);
    setOpenViewBillDialog(false);
  };

  //---------- Dialog  ใบรับของ -------------- //
  const [selectedViewReceiptData, setSelectedViewReceiptData] = useState(null);
  const [openViewReceiptDialog, setOpenViewReceiptDialog] = useState(false);
  const [dialogSizeViewReceipt, setDialogSizeViewReceipt] = useState("lg");

  const handleViewReceiptClick = () => {
    setSelectedViewReceiptData(billData); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewReceiptDialog(true);
  };

  const handleCloseViewReceiptDialog = () => {
    setSelectedViewReceiptData(null);
    setOpenViewReceiptDialog(false);
  };


    //---------- Dialog  ใบรับเสร็จรับเงิน -------------- //
    const [selectedViewReceiptData1, setSelectedViewReceiptData1] = useState(null);
    const [openViewReceiptDialog1, setOpenViewReceiptDialog1] = useState(false);
    const [dialogSizeViewReceipt1, setDialogSizeViewReceipt1] = useState("lg");
    
  
    const handleViewReceiptClick1 = () => {
      setSelectedViewReceiptData1(billData); // นำข้อมูลไปใช้งานภายใน modal / dialog
      setOpenViewReceiptDialog1(true);
    };
  
    const handleCloseViewReceiptDialog1 = () => {
      setSelectedViewReceiptData1(null);
      setOpenViewReceiptDialog1(false);
    };

    useEffect(() => {
      saveSelectedProductData.forEach((product) => {
        if (product.product_name === "ล็อตเตอรี่") {
          setSelectedSavingsBond(product.amount);
        } else if (product.product_name === "สลากออมสิน") {
          setSelectedGovernmentBonds(product.amount);
        }
      });
    }, [saveSelectedProductData]);
  
 
  const sendAllData = async () => {
    try {

      // ตรวจสอบว่า saveSelectedProductData และ selectCustomerData.customer_name มีค่าหรือไม่
    if (!saveSelectedProductData.length || !selectCustomerData.customer_name) {
      // ถ้าไม่มีค่าหรือค่าว่าง ให้แสดงข้อความแจ้งเตือน
      Swal.fire({
        icon: "error",
        title: "ต้องมีผู้บริจาคและรายการสินค้า",
        text: "กรุณาทำใหม่",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    console.log(saveSelectedProductData)

      const productData = saveSelectedProductData.map((product) => ({

        // sale_auction_start_event: product.product_name, // ID สินค้า
        // sale_auction_start_event_count: product.unit.toString(), 
        // sale_auction_start_event_count_price: product.amount.toString(),
        // sale_auction_start_event_count_cat: product.product_category,
        // sale_auction_start_event_count_unit: product.product_count

        sale_auction_start_event: product.product_name, // ID สินค้า
        sale_auction_start_event_count:  product.amount.toString(),
        sale_auction_start_event_count_price: product.unit.toString(),
        sale_auction_start_event_count_cat: product.product_category,
        sale_auction_start_event_count_unit: product.product_count

      }));

      console.log(selectedSavingsBond)
      console.log(selectedGovernmentBonds)

      const saleData = {
        sale_code_customer_name: selectCustomerData.customer_name || '',
        sale_code_customer_address: selectCustomerData.customer_address || '',
        sale_code_customer_delivery: selectCustomerData.customer_delivery || '',
        sale_code_customer_contract: selectCustomerData.customer_contract || '',
        sale_code_customer_noun: selectCustomerData.customer_noun || '',
        sale_code_customer_number: selectCustomerData.customer_number || '',
        sale_code_customer_tel: selectCustomerData.customer_tel || '',
        sale_code_customer_line: 'aaa',
        sale_auction_refer: billRefNo, 
        sale_auction_num: billNo, 
        sale_auction_q: note,
        product: productData,
        sale_auction_price: sumTotal.toString(),
        sale_code_id : 23, 
      
        aomsin: [
          {
            sale_auction_start_event: 1, 
            sale_auction_start_event_count: selectedSavingsBond.toString()
          },
          {
            sale_auction_start_event: 2, 
            sale_auction_start_event_count: selectedGovernmentBonds.toString()
          }
        ]
      };
      
      console.log(saleData)

      if(billDataId) {
        const response = await axios.put(`${import.meta.env.VITE_APP_API}/Sale/${billDataId}/edit`,saleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        });
        setBillData(response.data)
        await fetchUpdatedData(billDataId);
        await fetchData()
        setEditBill(true)
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลเรียบร้อย",
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
      const response = await axios.post(`${import.meta.env.VITE_APP_API}/Sale`,saleData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
        // data:saleData
      });
      // console.log(response.data)
      setBillData(response.data)
      setBillDataId(response.data.id)
      await fetchUpdatedData(response.data.id);
      await fetchData()
      setEditBill(true)
      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      })

      }
      
    } catch (error) {
      console.error(error)
    }
  }

  const [cancelNote,setCancelNote] = useState('')

  const endBill = async () => {
    try {
      // ถามครั้งที่ 1
      const result = await Swal.fire({
        title: 'กรอกหมายเหตุ',
        titleText: `ยกเลิกบิลเลขที่: ${billDataId}`,
        input: 'text',
        inputPlaceholder: 'กรอกหมายเหตุที่ยกเลิก',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
        preConfirm: (note) => {
          // นำค่าที่กรอกเก็บลงใน state หรือทำอะไรกับมันตามความเหมาะสม
            setCancelNote(note);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        // ถามครั้งที่ 2
        const result2 = await Swal.fire({
          title: 'แน่ใจหรือไม่ที่จะยกเลิก',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'ยืนยัน',
        });

        if (result2.isConfirmed) {
          // นำค่าที่กรอกจากครั้งที่ 1 ไปส่ง API
          const data = {
            show_Id: billDataId,
            sale_auction_q: cancelNote,
         
          }
          const response = await axios.post(`${import.meta.env.VITE_APP_API}/Cancel-Sale`, data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${Token}`,
              },
            });

          // console.log(response.data)

          // อัปเดต state หรือทำอย่างอื่นตามที่ต้องการ
          setBillDataId('');
          setSumTotal('');
          setSearchText('');
          setPayStatus('1')
          document.getElementById('billRefNo').value = '';
          document.getElementById('billNo').value = '';
          setBillData([]);
          setSaveSelectedProductData([]);
          setSelectedEditCustomerData([]);
          document.getElementById('note').value = '';
          setEditBill(false);

          // แสดงข้อความหลังจากส่งข้อมูลสำเร็จ
          Swal.fire({
            title: 'สำเร็จ',
            text: 'บิลถูกยกเลิกแล้ว',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (result2.dismiss === Swal.DismissReason.cancel) {
          // ผู้ใช้กดยกเลิก
        }
      }
    } catch (error) {
      // กรณีเกิดข้อผิดพลาดในการส่งข้อมูล
      Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถยกเลิกบิลได้ในขณะนี้', 'error');
    }
  };
  const newBill = () => {
    Swal.fire({
      title:"ต้องการสร้างบิลใหม่ ?",
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน',
      preConfirm: (note) => {
        // นำค่าที่กรอกเก็บลงใน state หรือทำอะไรกับมันตามความเหมาะสม
        setCancelNote(note);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if  (result.isConfirmed) {
        setBillDataId('');
        setSumTotal('');
        setSearchText('');
        setPayStatus('1')
        document.getElementById('billRefNo').value = '';
        document.getElementById('billNo').value = '';
        setBillData([]);
        setSaveSelectedProductData([]);
        setSelectedEditCustomerData([]);
        document.getElementById('note').value = '';
        setEditBill(false);
        // document.getElementById("note").value = "";

        // ผู้ใช้กดยืนยัน
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // ผู้ใช้กดยกเลิก
      }
    });
  }

  const [reportData,setReportData] = useState([])

  const fetchUpdatedData = async (billDataId) => {
    // console.log(billDataId)
    try {
      // console.log(billDataId)
      const response = await axios.get(`${import.meta.env.VITE_APP_API}/Sale/${billDataId}/detail`, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });
  
      // console.log(response.data)
      setReportData(response.data)
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
  };

  // useEffect(()=>{
  //   fetchUpdatedData()
  // },[payStatus])
  

  //---------- Dialog  ชำระเงิน -------------- //
  const [activePayMenu, setActivePayMenu] = useState("menu1");
  const [selectedViewPayData, setSelectedViewPayData] = useState(null);
  const [openViewPayDialog, setOpenViewPayDialog] = useState(false);
  const [dialogSizeViewPay, setDialogSizeViewPay] = useState("lg");

  const [payCustomerPayee, setPayCustomerPayee] = useState("");
  const [payBillIssuer, setPayBillIssuer] = useState("");
  const [payDate, setPayDate] = useState("");
  const [payRef, setPayRef] = useState("");
  const [payStatus, setPayStatus] = useState('1');
  const [payAcc, setPayAcc] = useState('');
  const [payBank, setPayBank] = useState('');
  const [payCheck, setPayCheck] = useState('');
  const [receiptId,setReceiptId] = useState('')
  const [receiptStatusId,setReceiptStatusId] = useState('')


  const handleViewPayClick = () => {
    setActivePayMenu("menu1")
    setSelectedViewPayData(); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewPayDialog(true);
  };

  const handleCloseViewPayDialog = () => {
    setSelectedViewPayData(null);
    setOpenViewPayDialog(false);
  };

  const dateObject = new Date(reportData.sale_auction_date);

  // รับค่าวันที่, เดือน, และปี
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // เดือนจะนับเริ่มต้นที่ 0, เพิ่ม 1 เพื่อเป็นเดือนที่ถูกต้อง
  const year = dateObject.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.

  // สร้างรูปแบบวันที่ใหม่ "dd/mm/yyyy"
  const formattedDate1 = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;


    // console.log(formatDate(payDate))

    const [selectedFile, setSelectedFile] = useState(null);
    const sendPay = async () => {
      try {
        // สร้าง FormData เพื่อแนบไฟล์
        // console.log(payStatus)
        const formData = new FormData();
        formData.append("sale_auction", billDataId);
        // formData.append("sale_auction", billData.sale_code);
        formData.append("sale_receipt_name", payCustomerPayee);
        formData.append("sale_receipt_name_export", payBillIssuer);
        formData.append("sale_receipt_date_pay", formatDate(payDate));
        formData.append("sale_receipt_number", payRef);
        formData.append("sale_receipt_bank", payBank);
        formData.append("sale_receipt_acc", payAcc);
        formData.append("sale_receipt_check", payCheck);
        formData.append("sale_receipt_status", Number(payStatus));
        formData.append("sale_receipt_image", selectedFile || "");

        // console.log("FormData:", JSON.stringify([...formData.entries()]));

    
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/Receipt`,
          formData,
          {
            headers: {
              Authorization: `Token ${Token}`,
              "Content-Type": "multipart/form-data", // ระบุ Content-Type เป็น multipart/form-data
            },
          }
        );
        console.log(response.data)
        setReceiptId(response.data.id);
        setReceiptStatusId(response.data.sale_receipt_status);
        setOpenViewPayDialog(false);
        await fetchUpdatedData(billDataId);
        await fetchReceiptData(response.data.id);
        setPayRef("");
        setPayCustomerPayee("");
        setPayBillIssuer("");
        setPayDate("");
        setPayAcc("");
        setPayBank("");
        setPayCheck("");
        setSelectedFile(null); // เคลียร์ไฟล์ที่เลือก
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลใบเสร็จเรียบร้อย",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        setOpenViewPayDialog(false);
        Swal.fire({
          icon: "error",
          title: "บันทึกข้อมูลใบเสร็จไม่สำเร็จ",
          text: "กรุณาลองใหม่อีกครั้ง (กรุณาใส่ข้อมูลให้ครบถ้วน)",
          confirmButtonText: "ตกลง",
        });
      }
    };
    

    const [receiptData,setReceiptData] = useState([])

    const fetchReceiptData = async (receiptId) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/Receipt/${receiptId}/detail`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
    
        // console.log(response.data)
        setReceiptData(response.data)
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        
      }
    };

    // console.log(billData)

  

    
  return (
    <>
      <Card className=" h-auto  w-full overflow-scroll px-5 ">
        <div className="flex flex-col gap-3 md:px-3">
          <div className="bd-blue-500 flex flex-col gap-5 lg:flex-row  lg:justify-between ">
            {/* บนซ้าย */}
            <div className="flex flex-col  items-center lg:items-start">
              {editBill === true ? (
                <div className="mt-5 flex flex-col  items-center gap-1 sm:flex-row ">
                  <div>
                    <Typography className="flex w-[100px] text-sm font-bold">
                      แก้ไขบิลเลขที่:
                    </Typography>
                  </div>
                  <div className="">
                    <Typography className="">{billData.sale_code || ''}</Typography>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="mt-5 flex flex-col  items-center gap-5 sm:flex-row ">
                <div>
                  <Typography className="flex w-[80px] text-sm font-bold">
                    ผู้บริจาค:
                  </Typography>
                </div>
                <div className="flex items-center justify-center align-middle">
                  <div className="relative flex  justify-center">
                    <input
                      type="text"
                      placeholder="ค้นหาผู้บริจาค"
                      value={searchText || ''}
                      list="option"
                      onChange={(e) => handleSearch(e.target.value)}
                      className=" w-full rounded border border-gray-400  p-1 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                      onFocus={() => setIsOpen(true)} // แสดงเมื่อ Input ค้นหา active
                      onBlur={() => setTimeout(() => setIsOpen(false), 1000)}
                    />
                    {isOpen && filteredOptions.length > 0 && (
                      <div
                        className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                        style={{ backgroundColor: "#fff" }}
                      >
                        {filteredOptions.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleSelect(item.customer_name)}
                            className="cursor-pointer p-2 hover:bg-blue-200"
                          >
                            {item.customer_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex  justify-center border-green-500 text-center sm:justify-start">
                  
                  <IconButton
                    color="green"
                    size="sm"
                    className=" rounded-full border-4  border-green-500 "
                    onClick={handleViewCustomerClick}
                  >
                    <AiOutlinePlus  className="text-2xl" />
                  </IconButton>
                </div>
                <small  >เพิ่ม/แก้ไข ผู้บริจาค</small>
              </div>
              <div className="mt-5 flex flex-col  items-center gap-5 sm:flex-row ">
                <div>
                  <Typography className="flex lg:w-[110px] text-sm font-bold">
                    ที่อยู่:
                  </Typography>
                </div>
                <div>
                  <Typography className="flex  text-sm ">
                    {selectCustomerData?.customer_address || ""}
                  </Typography>
                </div>
              </div>
              <div className="mt-5 flex flex-col  items-center gap-5 sm:flex-row ">
                <div>
                  <Typography className="flex lg:w-[110px] text-sm font-bold">
                    สถานที่จัดส่ง:
                  </Typography>
                </div>
                <div>
                  <Typography className="flex  text-sm ">
                    {selectCustomerData?.customer_delivery || ""}
                  </Typography>
                </div>
              </div>
              <div className="mt-5 flex flex-col  items-center gap-5 sm:flex-row ">
                <div>
                  <Typography className="flex lg:w-[110px] text-sm font-bold">
                    ผู้ติดต่อ:
                  </Typography>
                </div>
                <div>
                  <Typography className="flex  text-sm ">
                    {selectCustomerData?.customer_contract || ""}
                  </Typography>
                </div>
              </div>
              <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row ">
                <div>
                  <Typography className="flex lg:w-[110px] text-sm font-bold">
                    เบอร์โทร:
                  </Typography>
                </div>
                <div>
                  <Typography className="flex  text-sm ">
                    {selectCustomerData?.customer_tel || ""}
                  </Typography>
                </div>
              </div>
            </div>

            {/* บนขวา */}
            <div className="flex flex-col items-center lg:items-end">
                <div className="mt-5 flex flex-col  items-center gap-5 md:flex-row lg:flex-col xl:gap-3 2xl:flex-row ">
                  <div className="flex gap-3">
                  <div className="flex w-full items-center justify-center align-middle md:justify-start">
                    <Button
                        size="sm"
                        variant="gradient"
                        color="blue"
                        disabled={!editBill}
                        className=" flex w-[135px] items-center align-middle  text-sm"
                        onClick={newBill}
                      >
                        <span className="mr-2 flex text-base">
                          <PiReceipt />
                        </span>
                        สร้างบิลใหม่
                      </Button> 
                    </div>
            
                    <div className="flex w-full items-center justify-center align-middle md:justify-start">
                      <Button
                        size="sm"
                        variant="gradient"
                        color="green"
                        className=" flex items-center align-middle text-sm"
                        onClick={sendAllData}
                      >
                        <span className="mr-2 flex text-base">
                          <IoIosSave />
                        </span>
                        บันทึก
                      </Button>
                    </div>
                    <div className="flex w-full items-center justify-center align-middle md:justify-start">
                      <Button
                        size="sm"
                        variant="gradient"
                        color="red"
                        disabled={!editBill}
                        className=" flex items-center align-middle text-sm"
                        onClick={endBill}
                      >
                        <span className="mr-2 flex text-base">
                          <GiCancel />
                        </span>
                        ยกเลิก
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-3">
           
                    <div className="flex w-full items-center justify-center align-middle md:justify-start">
                      <Button
                        size="sm"
                        variant="gradient"
                        color="purple"
                        disabled={!editBill || reportData?.status_sale == 2}
                        className=" flex w-[120px] items-center align-middle  text-sm"
                        onClick={handleViewPayClick}
                      >
                        <span className="mr-2 flex text-base">
                          <MdOutlinePayment />
                        </span>
                        ชำระเงิน
                      </Button>
                    </div>
                  

                  <div className="flex w-full items-center justify-center align-middle lg:justify-start">
                      <Button
                        size="sm"
                        variant="gradient"
                        color="orange"
                        disabled={!editBill}
                        className=" flex w-[120px] items-center align-middle text-sm"
                        onClick={handleViewReceiptClick}
                      >
                        <span className="mr-2 flex text-base">
                          <BiReceipt />
                        </span>
                        ใบรับของ
                      </Button>
                  </div>
                      <div className="flex w-full items-center justify-center align-middle md:justify-start">
                        <div className="flex gap-5 ">
                          <div>
                        <Button
                        size="sm"
                        variant="gradient"
                        color="amber"
                        disabled={reportData?.status_sale !== 2 || !editBill }
                        className=" flex w-[110px] items-center align-middle  text-sm"
                        onClick={handleViewReceiptClick1}
                      >
                        <span className="mr-2 flex text-base">
                          <PiReceipt />
                        </span>
                        ใบเสร็จ
                      </Button>
                          </div>

                        </div>
            
                    </div>
                    
                  </div>
                </div>
          
              <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row  ">
                <div>
                  <Typography className="flex w-[40px] text-sm font-bold">
                    วันที่:
                  </Typography>
                </div>
                <div>
                  <Typography className="flex  text-sm ">
                    {formattedDate || ''}
                  </Typography>
                </div>
              </div>
              <div className="mt-5 flex flex-col  items-center gap-5 sm:flex-row ">
                <div>
                  <Typography className="flex w-[110px] text-sm font-bold">
                    ออกสลากในนาม:
                  </Typography>
                </div>
                <div>
                  <Typography className="flex  text-sm ">
                    {selectCustomerData?.customer_noun || ""}
                  </Typography>
                </div>
              </div>
              
              <div className="mt-5 flex flex-col  items-center gap-3 sm:flex-row ">
                <div className=" flex flex-col  items-center gap-3 sm:flex-row ">
                  <div>
                    <Typography className="flex w-[100px] text-sm font-bold">
                      บิลอ้างอิงเล่มที่:
                    </Typography>
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="text"
                      id="billRefNo"
                      maxLength="10"
                      className=" focus:shadow-outline  w-[100px] appearance-none rounded  border border-gray-400 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setBillRefNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col  items-center gap-3 sm:flex-row ">
                  <div>
                    <Typography className="flex w-60px] text-sm font-bold">
                      / เล่มที่:
                    </Typography>
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="text"
                      id="billNo"
                      maxLength="10"
                      className=" focus:shadow-outline  w-[100px] appearance-none rounded  border border-gray-400 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setBillNo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col  items-center gap-5 sm:flex-row ">
              <small >เพิ่ม/แก้ไข สินค้า</small>
                <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                  <IconButton
                    color="green"
                    size="sm"
                    className=" rounded-full border-4  border-green-500 "
                    onClick={handleViewProductClick}
                  >
                    <AiOutlinePlus className="text-2xl" />
                  </IconButton>
                </div>
                
                <div className="flex gap-3">
                  <Typography className="text-md flex text-sm font-bold text-red-500">
                    ราคาทั้งหมด:
                  </Typography>
                  <Typography className="text-md flex text-sm  font-bold text-red-500">
                    {sumTotal.toLocaleString() || ''}
                  </Typography>
                  <Typography className="text-md flex  font-bold text-red-500">
                    บาท
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          {/* ตาราง */}
          <div>
            {/* ------------ table  ----------------------------------------- */}

            <Card className="mt-5 h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-gray-300 bg-gray-100 p-4 text-sm text-gray-700"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head || ''}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {saveSelectedProductData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border-b border-gray-300 p-4">
                        <div className="flex items-center justify-center">
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {index + 1 || ""}
                          </Typography>
                        </div>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data.product_category || ""}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data.product_name || ""}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <input
                          type="number"
                          variant="small"
                          min="0"
                          color="blue-gray"
                          className="font-normal text-xs w-[100px]  border-2  border-gray-400 rounded-lg focus:outline-none focus:ring-gray-500 focus:ring-1 px-2 py-2"
                          placeholder="จำนวน"
                          onChange={(e) => handleInputChangeAmount(e.target.value, index)}
                        />
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data.product_count || ""}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <input
                          type="number"
                          variant="small"
                          min="0"
                          color="blue-gray"
                          className="font-normal text-xs w-[100px]  border-2  border-gray-400 rounded-lg focus:outline-none focus:ring-gray-500 focus:ring-1 px-2 py-2"
                          placeholder="ราคา/หน่วย"
                          onChange={(e) => handleInputChangeUint(e.target.value, index)}
                        />
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data.total.toLocaleString() || 0}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <div className="flex justify-center">
                          <div>
                            <IconButton
                              variant="text"
                              onClick={() => deleteProduct(index)}
                            >
                              <AiFillDelete className="h-4 w-4" />
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        
            </Card>
            {/* ----------------  หมายเหตุ -------------------------------- */}
              <div className="flex flex-col md:flex-row w-full gap-3 align-middle items-center py-3">
              <div className="flex">
                <Typography>หมายเหตุ:</Typography>
             
              </div>
              <div className="flex w-full">
              <Input 
              type="text"
              id="note"
              maxLength="100"
              onChange={(e)=> setNote(e.target.value)}  
                />
              </div>

              </div>
          </div>

          {/* ----  View ผู้บริจาค -------------- */}
          <Dialog
            open={openViewCustomerDialog}
            size={dialogSizeViewCustomer}
            handler={handleCloseViewCustomerDialog}
            className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-[600px]  "
          >
            <DialogHeader className="bg-blue-700 py-3  px-2 text-center  text-base text-white opacity-80 ">
              <div className="flex gap-3 ">
                <Typography className="text-xl">ผู้บริจาค</Typography>
              </div>
            </DialogHeader>
            <DialogBody>
              <Card className=" h-full w-full ">
                {/* menu bar */}
                <div className=" item-center mt-0 flex w-full flex-col gap-2 md:justify-around lg:flex-row">
                  <div className="flex  flex-col gap-5  lg:gap-10 xl:flex-row xl:gap-20 ">
                    <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                      {/* <div className="flex  justify-center">
                        <Button
                          variant="outlined"
                          size="lg"
                          className={` flex w-[150px] justify-center  py-2  px-4 shadow-lg ${
                            activeCustomerMenu === "menu1"
                              ? "bg-blue-700 text-white"
                              : ""
                          }`}
                          onClick={() => setActiveCustomerMenu("menu1")}
                        >
                          ค้นหา
                        </Button>
                      </div> */}
                      <div className="flex justify-center">
                        <Button
                          size="lg"
                          variant="outlined"
                          className={`w-[150px] rounded-md py-2  px-4  ${
                            activeCustomerMenu === "menu1"
                              ? "bg-blue-700 text-white"
                              : ""
                          }`}
                          onClick={() => setActiveCustomerMenu("menu1")}
                        >
                          เพิ่มผู้บริจาค
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-5 sm:flex-row lg:gap-20">
                      <div className="flex justify-center">
                        <Button
                          variant="outlined"
                          size="lg"
                          className={`w-[150px]  py-2  px-4  ${
                            activeCustomerMenu === "menu2"
                              ? "bg-blue-700 text-white"
                              : ""
                          }`}
                          onClick={() => setActiveCustomerMenu("menu2")}
                        >
                          แก้ไขข้อมูล
                        </Button>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          size="lg"
                          variant="outlined"
                          className={`w-[150px]  py-2  px-4  ${
                            activeCustomerMenu === "menu3"
                              ? "bg-blue-700 text-white"
                              : ""
                          }`}
                          onClick={() => setActiveCustomerMenu("menu3")}
                        >
                          แก้ไขเฉพาะบิล
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {activeCustomerMenu === "menu1" && (
                  <div>
                    <hr className=" mt-5 border border-gray-500" />
                    <Card className="h-full w-full  p-3">
                      <div>
                        <div className="mt-5 flex w-full flex-col gap-4 ">
                          <div className="flex flex-col items-center sm:flex-row ">
                            <div className="">
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                ชื่อผู้บริจาค:
                              </Typography>
                            </div>
                            <div className="mt-3 sm:mt-0 md:w-[300px] ">
                              <Input
                                type="text"
                                label="ชื่อผู้บริจาค"
                                maxLength="45"
                                value={newCustomerName || ''}
                                onChange={(e) =>
                                  setNewCustomerName(e.target.value)
                                }
                                className="w-full "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center sm:flex-row ">
                            <div>
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                ที่อยู่ผู้บริจาค:
                              </Typography>
                            </div>
                            <div className="mt-3 sm:mt-0 md:w-[470px]  ">
                              <Input
                                type="text"
                                label="ที่อยู่ผู้บริจาค"
                                maxLength="50"
                                value={newCustomerAddress || ''}
                                onChange={(e) =>
                                  setNewCustomerAddress(e.target.value)
                                }
                                className="w-full  "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center sm:flex-row">
                            <div>
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                สถานที่จัดส่ง:
                              </Typography>
                            </div>
                            <div className="mt-3 sm:mt-0 md:w-[470px] ">
                              <Input
                                type="text"
                                label="สถานที่จัดส่ง"
                                maxLength="50"
                                value={newCustomerDelivery || ''}
                                onChange={(e) =>
                                  setNewCustomerDelivery(e.target.value)
                                }
                                className="w-full "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                            <div className="flex flex-col items-center sm:flex-row">
                              <div>
                                <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                  ผู้ติดต่อ:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="ผู้ติดต่อ"
                                  maxLength="50"
                                  value={newCustomerContract || ''}
                                  onChange={(e) =>
                                    setNewCustomerContract(e.target.value)
                                  }
                                  className="w-full  "
                                />
                              </div>
                            </div>
                            <div className="flex flex-col items-center sm:flex-row">
                              <div>
                                <Typography className="sm:mr-5 sm:w-[130px] md:w-[130px] xl:mr-0 xl:w-[130px]">
                                  ออกฉลากในนาม:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="ออกฉลากในนาม"
                                  maxLength="45"
                                  value={newCustomerNoun || ''}
                                  onChange={(e) =>
                                    setNewCustomerNoun(e.target.value)
                                  }
                                  className="w-full "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                            <div className="flex flex-col items-center sm:flex-row ">
                              <div>
                                <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                  เบอร์โทรศัพท์:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="เบอร์โทรศัพท์"
                                  maxLength="20"
                                  value={newCustomerTel || ''}
                                  onChange={(e) =>
                                    setNewCustomerTel(e.target.value)
                                  }
                                  className="w-full "
                                />
                              </div>
                            </div>
                            <div className="flex flex-col items-center sm:flex-row">
                              <div>
                                <Typography className="sm:mr-5 sm:w-[120px] md:w-[120px] xl:w-[100px]">
                                  เลขอ้างอิง:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="เลขอ้างอิง"
                                  maxLength="20"
                                  value={newCustomerNumber || ''}
                                  onChange={(e) =>
                                    setNewCustomerNumber(e.target.value)
                                  }
                                  className="w-full "
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:justify-end">
                        <Button
                          variant="gradient"
                          color="green"
                          className=" flex items-center align-middle text-base"
                          onClick={createNewCustomer}
                        >
                          <span className="mr-2 flex text-xl">
                            <IoIosSave />
                          </span>
                          บันทึก
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
                {activeCustomerMenu === "menu2" && (
                  <div>
                    <hr className=" mt-5 border border-gray-500" />
                    <Card className="h-full w-full  p-3">
                      <div>
                        <div className="mt-5 flex w-full flex-col gap-4 ">
                          <div className="flex flex-col items-center sm:flex-row ">
                            <div className="">
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                ชื่อผู้บริจาค:
                              </Typography>
                            </div>
                            <div className="mt-3 sm:mt-0 md:w-[300px] ">
                              <Input
                                type="text"
                                label="ชื่อผู้บริจาค"
                                maxLength="50"
                                value={
                                  selectedEditCustomerData?.customer_name || ""
                                }
                                onChange={(e) =>
                                  setSelectedEditCustomerData({
                                    ...selectedEditCustomerData,
                                    customer_name: e.target.value,
                                  })
                                }
                                className="w-full "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center sm:flex-row ">
                            <div>
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                ที่อยู่ผู้บริจาค:
                              </Typography>
                            </div>
                            <div className="mt-3 sm:mt-0 md:w-[470px]  ">
                              <Input
                                type="text"
                                label="ที่อยู่ผู้บริจาค"
                                maxLength="50"
                                value={
                                  selectedEditCustomerData?.customer_address ||
                                  ""
                                }
                                onChange={(e) =>
                                  setSelectedEditCustomerData({
                                    ...selectedEditCustomerData,
                                    customer_address: e.target.value,
                                  })
                                }
                                className="w-full  "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center sm:flex-row">
                            <div>
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                สถานที่จัดส่ง:
                              </Typography>
                            </div>
                            <div className="mt-3 sm:mt-0 md:w-[470px]  ">
                              <Input
                                type="text"
                                label="สถานที่จัดส่ง"
                                maxLength="50"
                                value={
                                  selectedEditCustomerData?.customer_delivery ||
                                  ""
                                }
                                onChange={(e) =>
                                  setSelectedEditCustomerData({
                                    ...selectedEditCustomerData,
                                    customer_delivery: e.target.value,
                                  })
                                }
                                className="w-full "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                            <div className="flex flex-col items-center sm:flex-row">
                              <div>
                                <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                  ผู้ติดต่อ:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="ผู้ติดต่อ"
                                  maxLength="50"
                                  value={
                                    selectedEditCustomerData?.customer_contract ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    setSelectedEditCustomerData({
                                      ...selectedEditCustomerData,
                                      customer_contract: e.target.value,
                                    })
                                  }
                                  className="w-full  "
                                />
                              </div>
                            </div>
                            <div className="flex flex-col items-center sm:flex-row">
                              <div>
                                <Typography className="sm:mr-5 sm:w-[130px] md:w-[130px] xl:mr-0 xl:w-[130px]">
                                  ออกฉลากในนาม:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="ออกฉลากในนาม"
                                  maxLength="45"
                                  value={
                                    selectedEditCustomerData?.customer_noun ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    setSelectedEditCustomerData({
                                      ...selectedEditCustomerData,
                                      customer_noun: e.target.value,
                                    })
                                  }
                                  className="w-full "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                            <div className="flex flex-col items-center sm:flex-row ">
                              <div>
                                <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                                  เบอร์โทรศัพท์:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="เบอร์โทรศัพท์"
                                  maxLength="20"
                                  value={
                                    selectedEditCustomerData?.customer_tel || ""
                                  }
                                  onChange={(e) =>
                                    setSelectedEditCustomerData({
                                      ...selectedEditCustomerData,
                                      customer_tel: e.target.value,
                                    })
                                  }
                                  className="w-full "
                                />
                              </div>
                            </div>
                            <div className="flex flex-col items-center sm:flex-row">
                              <div>
                                <Typography className="sm:mr-5 sm:w-[120px] md:w-[120px] xl:w-[100px]">
                                  เลขอ้างอิง:
                                </Typography>
                              </div>
                              <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]">
                                <Input
                                  type="text"
                                  label="เลขอ้างอิง"
                                  maxLength="20"
                                  value={
                                    selectedEditCustomerData?.customer_number ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    setSelectedEditCustomerData({
                                      ...selectedEditCustomerData,
                                      customer_number: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:justify-end">
                        <Button
                          variant="gradient"
                          color="purple"
                          style={{ backgroundColor: "purple" }}
                          className=" flex items-center align-middle text-base"
                          onClick={editCustomer}
                        >
                          <span className="mr-2 flex text-xl">
                            <IoIosSave />
                          </span>
                          อัพเดท
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
                {activeCustomerMenu === "menu3" && (
                 <div>
                 <hr className=" mt-5 border border-gray-500" />
                 <Card className="h-full w-full  p-3">
                   <div>
                     <div className="mt-5 flex w-full flex-col gap-4 ">
                       <div className="flex flex-col items-center sm:flex-row ">
                         <div className="">
                           <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                             ชื่อผู้บริจาค:
                           </Typography>
                         </div>
                         <div className="mt-3 sm:mt-0 md:w-[300px] ">
                           <Input
                             type="text"
                             label="ชื่อผู้บริจาค"
                             maxLength="50"
                             value={
                               selectedEditCustomerData?.customer_name || ""
                             }
                             onChange={(e) =>
                               setSelectedEditCustomerData({
                                 ...selectedEditCustomerData,
                                 customer_name: e.target.value,
                               })
                             }
                             className="w-full "
                           />
                         </div>
                       </div>
                       <div className="flex flex-col items-center sm:flex-row ">
                         <div>
                           <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                             ที่อยู่ผู้บริจาค:
                           </Typography>
                         </div>
                         <div className="mt-3 sm:mt-0 md:w-[470px]  ">
                           <Input
                             type="text"
                             label="ที่อยู่ผู้บริจาค"
                             maxLength="50"
                             value={
                               selectedEditCustomerData?.customer_address ||
                               ""
                             }
                             onChange={(e) =>
                               setSelectedEditCustomerData({
                                 ...selectedEditCustomerData,
                                 customer_address: e.target.value,
                               })
                             }
                             className="w-full  "
                           />
                         </div>
                       </div>
                       <div className="flex flex-col items-center sm:flex-row">
                         <div>
                           <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                             สถานที่จัดส่ง:
                           </Typography>
                         </div>
                         <div className="mt-3 sm:mt-0 md:w-[470px] ">
                           <Input
                             type="text"
                             label="สถานที่จัดส่ง"
                             maxLength="50"
                             value={
                               selectedEditCustomerData?.customer_delivery ||
                               ""
                             }
                             onChange={(e) =>
                               setSelectedEditCustomerData({
                                 ...selectedEditCustomerData,
                                 customer_delivery: e.target.value,
                               })
                             }
                             className="w-full "
                           />
                         </div>
                       </div>
                       <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                         <div className="flex flex-col items-center sm:flex-row">
                           <div>
                             <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                               ผู้ติดต่อ:
                             </Typography>
                           </div>
                           <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]">
                             <Input
                               type="text"
                               label="ผู้ติดต่อ"
                               maxLength="50"
                               value={
                                 selectedEditCustomerData?.customer_contract ||
                                 ""
                               }
                               onChange={(e) =>
                                 setSelectedEditCustomerData({
                                   ...selectedEditCustomerData,
                                   customer_contract: e.target.value,
                                 })
                               }
                               className="w-full  "
                             />
                           </div>
                         </div>
                         <div className="flex flex-col items-center sm:flex-row">
                           <div>
                             <Typography className="sm:mr-5 sm:w-[130px] md:w-[130px] xl:mr-0 xl:w-[130px]">
                               ออกฉลากในนาม:
                             </Typography>
                           </div>
                           <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                             <Input
                               type="text"
                               label="ออกฉลากในนาม"
                               maxLength="45"
                               value={
                                 selectedEditCustomerData?.customer_noun ||
                                 ""
                               }
                               onChange={(e) =>
                                 setSelectedEditCustomerData({
                                   ...selectedEditCustomerData,
                                   customer_noun: e.target.value,
                                 })
                               }
                               className="w-full "
                             />
                           </div>
                         </div>
                       </div>
                       <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                         <div className="flex flex-col items-center sm:flex-row ">
                           <div>
                             <Typography className="xl:w-25 sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0">
                               เบอร์โทรศัพท์:
                             </Typography>
                           </div>
                           <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                             <Input
                               type="text"
                               label="เบอร์โทรศัพท์"
                               maxLength="20"
                               value={
                                 selectedEditCustomerData?.customer_tel || ""
                               }
                               onChange={(e) =>
                                 setSelectedEditCustomerData({
                                   ...selectedEditCustomerData,
                                   customer_tel: e.target.value,
                                 })
                               }
                               className="w-full "
                             />
                           </div>
                         </div>
                         <div className="flex flex-col items-center sm:flex-row">
                           <div>
                             <Typography className="sm:mr-5 sm:w-[120px] md:w-[120px] xl:w-[100px]">
                               เลขอ้างอิง:
                             </Typography>
                           </div>
                           <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]">
                             <Input
                               type="text"
                               label="เลขอ้างอิง"
                               maxLength="20"
                               value={
                                 selectedEditCustomerData?.customer_number ||
                                 ""
                               }
                               onChange={(e) =>
                                 setSelectedEditCustomerData({
                                   ...selectedEditCustomerData,
                                   customer_number: e.target.value,
                                 })
                               }
                             />
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="mt-5 flex justify-center sm:justify-end">
                     <Button
                       variant="gradient"
                       color="purple"
                       style={{ backgroundColor: "purple" }}
                       className=" flex items-center align-middle text-base"
                       onClick={editCustomerTemp}
                     >
                       <span className="mr-2 flex text-xl">
                         <IoIosSave />
                       </span>
                       อัพเดท
                     </Button>
                   </div>
                 </Card>
               </div>
                )}
              </Card>
            </DialogBody>
          </Dialog>

          {/* ----  View สินค้า -------------- */}
          <Dialog
            open={openViewProductDialog}
            size={dialogSizeViewProduct}
            handler={handleCloseViewProductDialog}
            className="custom-dialog  h-[520px] overflow-scroll sm:h-[450px]  md:h-[500px] xl:h-[630px] "
          >
            <DialogHeader className="bg-blue-700  px-2 text-center  text-base text-white opacity-80 ">
              <div className="flex gap-3 ">
                <Typography className="text-xl">สินค้า</Typography>
              </div>
            </DialogHeader>
            <DialogBody>
              <Card className=" h-full w-full ">
                {/* menu bar */}
                <div className=" item-center mt-0 flex w-full flex-col gap-2 md:justify-around lg:flex-row">
                  <div className="flex  flex-col gap-5  lg:gap-10 xl:flex-row xl:gap-20 ">
                    <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                      <div className="flex  justify-center">
                        <Button
                          variant="outlined"
                          size="lg"
                          className={` flex w-[150px] justify-center  py-2  px-4 shadow-lg ${
                            activeProductMenu === "menu1"
                              ? "bg-blue-700 text-white"
                              : ""
                          }`}
                          onClick={() => {setActiveProductMenu("menu1") ,  setSearchQueryProductName(''), setCurrentProductPage(1)}}
                        >
                          ค้นหา
                        </Button>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          size="lg"
                          variant="outlined"
                          className={`w-[150px] rounded-md py-2  px-4  ${
                            activeProductMenu === "menu2"
                              ? "bg-blue-700 text-white"
                              : ""
                          }`}
                          onClick={() =>{ setActiveProductMenu("menu2") ,  setSearchQueryProductName('') , setCurrentProductPage(1)}}
                        >
                          เพิ่มสินค้า
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-5 sm:flex-row lg:gap-20">
                      <div className="flex justify-center">
                        <Button
                          variant="outlined"
                          size="lg"
                          className={`w-[150px]  py-2  px-4  ${
                            activeProductMenu === "menu3"
                              ? "bg-blue-700 text-white"
                              : ""
                          }`}
                          onClick={() =>{ setActiveProductMenu("menu3") , setSearchQueryProductName(''), setCurrentProductPage(1)}}
                        >
                          แก้ไขข้อมูล
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* content */}
                {activeProductMenu === "menu1" && (
                  <div>
                    <hr className=" mt-5 border border-gray-500" />
                    <Card className="mt-5 h-full w-full overflow-scroll px-2">
                      <div className="mt-3 flex flex-col items-center justify-center  sm:w-1/2 md:flex-row ">
                        <Input
                          type="text"
                          label="ค้นหาด้วยชื่อ"
                          value={searchQueryProductName || ''}
                          onChange={(e) => setSearchQueryProductName(e.target.value)}
                          className="ps-3 w-full py-2"
                        />
                      </div>
                      <table className="mt-3 w-full min-w-max table-auto text-left">
                        <thead>
                          <tr>
                            <th
                              // key={head}
                              className="flex justify-center border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                #
                              </Typography>
                            </th>
                            <th
                              // key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                ชื่อสินค้า
                              </Typography>
                            </th>
                            <th
                              // key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                หน่วยนับ
                              </Typography>
                            </th>
                            <th
                              // key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                หมวดหมู่
                              </Typography>
                            </th>
                            <th
                              // key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="text-center font-normal leading-none opacity-70"
                              >
                                เลือก
                              </Typography>
                            </th>
                          </tr>
                        </thead>
                        {noProductData ? (
                          <tbody>
                            <tr>
                              <td className="expanded-row " colSpan="5">
                                <Typography className="mt-3 flex justify-center ">
                                  ...ไม่พบข้อมูล...
                                </Typography>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {displayedProductData.map((data, index) => {
                              const isLast =
                                index === displayedProductData.length - 1;
                              const pageProductIndex =
                                startProductIndex + index;
                              const classes = isLast
                                ? "p-2"
                                : "p-3 border-b border-blue-gray-50";

                              return (
                                <tr key={index}>
                                  <td className={classes}>
                                    <div className="flex items-center justify-center">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold "
                                      >
                                        {pageProductIndex + 1 || ""}
                                      </Typography>
                                    </div>
                                  </td>
                                  <td className={classes}>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {data.product_name || ""}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {data.product_count || ""}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal "
                                    >
                                      {data.product_category || ""}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <div className="flex justify-center  ">
                                      <div>
                                        <IconButton
                                          color="green"
                                          size="sm"
                                          className=" rounded-full border-4  border-green-500 "
                                          onClick={()=> saveSelectedProduct(data) }
                                        >
                                          <AiOutlinePlus className="text-2xl" />
                                        </IconButton>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        )}
                      </table>
                      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Button
                          variant="outlined"
                          size="sm"
                          disabled={currentProductPage === 1}
                          onClick={() =>
                            setCurrentProductPage(currentProductPage - 1)
                          }
                        >
                          ก่อนหน้า
                        </Button>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalProductPages }, (_, i) => (
                            <IconButton
                              key={i}
                              variant="outlined"
                              size="sm"
                              onClick={() => setCurrentProductPage(i + 1)}
                              className={
                                currentProductPage === i + 1
                                  ? "bg-blue-500 text-white"
                                  : ""
                              }
                            >
                              {i + 1}
                            </IconButton>
                          ))}
                        </div>
                        <Button
                          variant="outlined"
                          size="sm"
                          disabled={currentProductPage === totalProductPages}
                          onClick={() =>
                            setCurrentProductPage(currentProductPage + 1)
                          }
                        >
                          ถัดไป
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}
                {activeProductMenu === "menu2" && (
                  <div>
                    <hr className=" mt-5 border border-gray-500" />
                    <Card className="h-full w-full  p-3">
                      <div>
                        <div className="mt-5 flex w-full flex-col gap-4 xl:flex-row ">
                          <div className="flex flex-col  items-center sm:flex-row xl:justify-start">
                            <div>
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] xl:mr-0">
                                ชื่อสินค้า:
                              </Typography>
                            </div>
                            <div className="mt-3 w-1/2 sm:mt-0   ">
                              <Input
                                type="text"
                                label="ชื่อสินค้า"
                                maxLength="50"
                                value={newProductName || ""}
                                onChange={(e) =>
                                  setNewProductName(e.target.value)
                                }
                                className="w-full "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center sm:flex-row xl:justify-start ">
                            <div>
                              <Typography className="xl:w-25  sm:mr-5 sm:w-[80px] xl:mr-0">
                                หน่วยนับ:
                              </Typography>
                            </div>
                            <div className="mt-3  w-full sm:mt-0 ">
                              <Input
                                value={newProductCount || ""}
                                label="หน่วยนับ"
                                maxLength="20"
                                onChange={(e) => {
                                  setNewProductCount(e.target.value);
                                }}
                              >
                              </Input>
                            </div>
                          </div>
                          <div className="flex flex-col  items-center justify-center sm:flex-row xl:justify-start">
                            <div>
                              <Typography className="xl:w-25  sm:mr-5 sm:w-[80px] xl:mr-0">
                                หมวดหมู่:
                              </Typography>
                            </div>
                            <div className="mt-3  w-full sm:mt-0  ">
                              <Select
                                // value={newProductCategory || ""}
                                label="หมวดหมู่"
                                value={newProductCategory || ""}
                                onChange={(e) => {
                                  setNewProductCategory(e);
                                }}
                                // onChange={handleNewProductCategory}
                              >
                                <Option value="">-</Option>
                                {/* <Option value="">ทั้งหมด</Option> */}
                                {/* <Option value="สลากออมสิน">สลากออมสิน</Option> */}
                                {/* <Option value="ล็อตเตอรี่">ล็อตเตอรี่</Option> */}
                                {/* <Option value="ล็อตเตอรรี่">ล็อตเตอรรี่</Option>
                                <Option value="สลากออมสิน">สลากออมสิน</Option> */}
                                <Option value="วัตถุมงคล">วัตถุมงคล</Option>
                                <Option value="โทรศัพท์">โทรศัพท์</Option>
                                <Option value="เครื่องใช้สำนักงาน">เครื่องใช้สำนักงาน</Option>
                                <Option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</Option>
                                <Option value="อื่นๆ">อื่นๆ</Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:justify-end">
                        <Button
                          variant="gradient"
                          color="green"
                          className=" flex items-center align-middle text-base"
                          onClick={createNewProduct}
                        >
                          <span className="mr-2 flex text-xl">
                            <IoIosSave />
                          </span>
                          บันทึก
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
                {activeProductMenu === "menu3" && (
                  <div>
                    <hr className=" mt-5 border border-gray-500" />
                    <Card className="h-full w-full  p-3">
                      <div>
                        <div className="mt-5 flex w-full flex-col gap-4 xl:flex-row">
                          <div className="flex flex-col  items-center sm:flex-row">
                            <div>
                              <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] xl:mr-0">
                                ชื่อสินค้า:
                              </Typography>
                            </div>
                            <div className="mt-3 w-1/2 sm:mt-0 ">
                              <Input
                                type="text"
                                label="ชื่อสินค้า"
                                maxLength="50"
                                value={selectedEditData?.product_name || ""}
                                onChange={(e) => {
                                  setSelectedEditData({
                                    ...selectedEditData,
                                    product_name: e.target.value,
                                  });
                                }}
                                className="w-full "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center sm:flex-row ">
                            <div>
                              <Typography className="xl:w-25  sm:mr-5 sm:w-[80px] xl:mr-0">
                                หน่วยนับ:
                              </Typography>
                            </div>
                            <div className="mt-3 w-full sm:mt-0  ">
                              <Input
                              type="text"
                                value={selectedEditData?.product_count || ""}
                                label="หน่วยนับ"
                                maxLength="20"
                                onChange={(e) =>
                                  setSelectedEditData({
                                    ...selectedEditData,
                                    product_count: e.target.value,
                                  })
                                }
                              >
                              </Input>
                            </div>
                          </div>
                          <div className="flex flex-col items-center sm:flex-row">
                            <div>
                              <Typography className="xl:w-25  sm:mr-5 sm:w-[80px] xl:mr-0">
                                หมวดหมู่:
                              </Typography>
                            </div>
                            <div className="mt-3 w-full sm:mt-0  ">
                              <Select
                                label="หมวดหมู่"
                                value={selectedEditData?.product_category || ""}
                                onChange={(e) =>
                                  setSelectedEditData({
                                    ...selectedEditData,
                                    product_category: e,
                                  })
                                }
                              >
                                <Option value="">-</Option>
                                {/* <Option value="สลากออมสิน">สลากออมสิน</Option>
                                <Option value="ล็อตเตอรี่">ล็อตเตอรี่</Option> */}
                                {/* <Option value="ล็อตเตอรรี่">ล็อตเตอรรี่</Option>
                                <Option value="สลากออมสิน">สลากออมสิน</Option> */}
                                <Option value="วัตถุมงคล">วัตถุมงคล</Option>
                                <Option value="โทรศัพท์">โทรศัพท์</Option>
                                <Option value="เครื่องใช้สำนักงาน">เครื่องใช้สำนักงาน</Option>
                                <Option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</Option>
                                <Option value="อื่นๆ">อื่นๆ</Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:justify-end">
                        <Button
                          variant="gradient"
                          color="purple"
                          className=" flex items-center align-middle text-base"
                          onClick={editProduct}
                        >
                          <span className="mr-2 flex text-xl">
                            <IoIosSave />
                          </span>
                          อัทเดรท
                        </Button>
                      </div>
                      <hr className=" mt-5 border border-gray-500" />
                      <Card className="mt-5 h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD1.map((head) => (
                      <th
                        key={head}
                        className="border-b border-gray-300 bg-gray-100 p-4 text-sm text-gray-700"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head || ''}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {saveSelectedProductData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border-b border-gray-300 p-4">
                        <div className="flex items-center justify-center">
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {index + 1 || ""}
                          </Typography>
                        </div>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                        {data.product_name || ""}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data.product_count || ""}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          
                          {data.product_category || ""}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300 p-4">
                        <div className="flex justify-center">
                          <div>
                          <IconButton
                            color="green"
                            size="sm"
                            className=" rounded-full border-4  border-green-500 "
                            // onClick={()=> saveSelectedProduct(data) }
                            onClick={() => setSelectedEditData(data)}
                            
                            >
                            <AiOutlinePlus className="text-2xl" />
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
                    </Card>
                  </div>
                )}
              </Card>
            </DialogBody>
          </Dialog>

          {/* ----  View ใบรับของ -------------- */}
          <Dialog
            open={openViewReceiptDialog}
            size={dialogSizeViewReceipt}
            handler={handleCloseViewReceiptDialog}
            // className="custom-dialog  h-[520px] overflow-scroll sm:h-[450px]  md:h-[500px] xl:h-auto"
            className="custom-dialog h-full  "
          >
            <DialogBody>
              <Card className=" h-full w-full ">
                <div className="h-full w-full">
                  <PDFViewer width="100%" height="600px">
                    {reportData && <Receive key={JSON.stringify(reportData)}  reportData={reportData} sumTotal={sumTotal}  thbText={thbText} />}
                  </PDFViewer>
                </div>
              </Card>
            </DialogBody>
            <DialogFooter className=" flex justify-center py-0  md:justify-end">
              <Button
                variant="text"
                color="red"
                onClick={handleCloseViewReceiptDialog}
                className=" flex items-center align-middle text-base"
              >
                <span className="mr-2 flex text-xl">
                  <GiCancel />
                </span>
                ยกเลิก
              </Button>

            </DialogFooter>
          </Dialog>


          {/* ----  View ใบเสร็จ -------------- */}
          <Dialog
            open={openViewReceiptDialog1}
            size={dialogSizeViewReceipt1}
            handler={handleCloseViewReceiptDialog1}
            // className="custom-dialog  h-[520px] overflow-scroll sm:h-[450px]  md:h-[500px] xl:h-auto"
            className="custom-dialog h-full  "
          >
            <DialogBody>
              <Card className=" h-full w-full ">
              {receiptStatusId == 1 && (
                <div className="h-full w-full">
                  <PDFViewer width="100%" height="600px">
                    {reportData && <Receipt1 key={JSON.stringify(reportData)} reportData={reportData} sumTotal={sumTotal} thbText={thbText} receiptData={receiptData} />}
                  </PDFViewer>
                </div>
              )}

              {receiptStatusId == 2 && (
                <div className="h-full w-full">
                  <PDFViewer width="100%" height="600px">
                    {reportData && <Receipt2 key={JSON.stringify(reportData)} reportData={reportData} sumTotal={sumTotal} thbText={thbText} receiptData={receiptData} />}
                  </PDFViewer>
                </div>
              )}

              {receiptStatusId == 3 && (
                <div className="h-full w-full">
                  <PDFViewer width="100%" height="600px">
                    {reportData && <Receipt3 key={JSON.stringify(reportData)} reportData={reportData} sumTotal={sumTotal} thbText={thbText} receiptData={receiptData} />}
                  </PDFViewer>
                </div>
              )}
                
              </Card>
            </DialogBody>
            <DialogFooter className=" flex justify-center py-0  md:justify-end">
              <Button
                variant="text"
                color="red"
                onClick={handleCloseViewReceiptDialog1}
                className=" flex items-center align-middle text-base"
              >
                <span className="mr-2 flex text-xl">
                  <GiCancel />
                </span>
                ยกเลิก
              </Button>

            </DialogFooter>
          </Dialog>


          {/* ----  View ชำระเงิน -------------- */}
          <Dialog
            open={openViewPayDialog}
            size={dialogSizeViewPay}
            handler={handleCloseViewPayDialog}
            className="custom-dialog h-[580px] overflow-scroll "
          >
            <DialogHeader className="bg-blue-700 py-3  px-5 text-center  justify-between  text-base text-white opacity-80  ">
              <div className="flex gap-3 ">
                <Typography className="text-xl">เลือกวิธีชำระเงิน</Typography>
              </div>
              <div className="flex gap-3 ">
              <div className="flex w-full flex-col sm:flex-row gap-5 justify-center md:justify-end   mt-3 md:mt-0">
                  <div>
                    <Typography className="text-lg font-bold text-center ">บิลที่:</Typography>
                  </div>
                  <div>
                    <Typography className="text-lg font-bold text-center ">{reportData.sale_code || ''}</Typography>
                  </div>
                  </div>
              </div>
            </DialogHeader>
            <DialogBody>
              <Card className=" h-full w-full px-3  ">
                {/* <div className="flex flex-col w-full  md:flex-row justify-between items-center">
                  <div className="flex flex-col md:flex-row w-full">
                  <div className="flex w-full  justify-center md:justify-start items-center">
                    <Typography className="text-lg font-bold "> ใบเสร็จ</Typography>
                  </div>
                  <div className="flex w-full flex-col sm:flex-row gap-5 justify-center md:justify-end   mt-3 md:mt-0">
                  <div>
                    <Typography className="text-lg font-bold text-center ">บิลที่</Typography>
                  </div>
                  <div>
                    <Typography className="text-lg font-bold text-center ">{reportData.sale_code || ''}</Typography>
                  </div>
                  </div>
                  </div>
                </div> */}
                <div className="flex flex-col w-full  md:flex-row  items-center">
                  <div className="flex flex-col sm:flex-row w-full justify-center md:justify-start mt-3 gap-5">
                  <div className="flex justify-center">
                    <Typography className="text-lg font-bold ">วันที่:</Typography>
                  </div>
                  <div className="flex justify-center">
                    <Typography className="text-lg font-bold ">{formattedDate1 || ''}</Typography>
                  </div>
                  </div>
                </div>
                <div className="flex flex-col w-full  md:flex-row  items-center">
                  <div className="flex flex-col md:flex-row w-full gap-5">
                  <div className="flex justify-center mt-3 sm:justify-start">
                    <Typography className="text-lg font-bold ">ชำระโดย:</Typography>
                  </div>
                  </div>
                </div>
               
                  {/* menu bar */}
                <div className=" item-center mt-5 flex w-full flex-col gap-2 md:justify-around lg:flex-row">
                  <div className="flex  flex-col gap-5  lg:gap-10 sm:flex-row xl:gap-20 ">
                    <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                      <div className="flex  justify-center">
                        <Radio
                            id="menu1"
                            name="payMenu"
                            value="menu1"
                            checked={activePayMenu === 'menu1'}
                            onChange={() => {
                              setActivePayMenu('menu1');
                              setPayStatus(1);
                            }}
                            label="เงินสด"
                            // color="light-green"
                            className="w-7 h-7"
                            
                        />
                      </div>
                    </div>
                    <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                      <div className="flex  justify-center">
                        <Radio
                            id="menu2"
                            name="payMenu"
                            value="menu2"
                            checked={activePayMenu === 'menu2'}
                            onChange={() => {
                              setActivePayMenu('menu2');
                              setPayStatus(2);
                            }}
                            label="เงินโอน"
                            // color="lightBlue"
                            className="w-7 h-7"
                        />
                      </div>
                    </div>
                    <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
                      <div className="flex  justify-center">
                        <Radio
                            id="menu3"
                            name="payMenu"
                            value="menu3"
                            checked={activePayMenu === 'menu3'}
                            onChange={() => {
                              setActivePayMenu('menu3');
                              setPayStatus(3);
                            }}
                            label="เช็ค"
                            // color="lightBlue"
                            className="w-7 h-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className=" mt-5 border border-gray-500" />

                {/* content */}
                {activePayMenu === "menu1" && (
                   <div className="mt-5 flex w-full flex-col gap-4 my-4">
                   <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
                           ผู้รับเงิน:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
                         <Input
                           type="text"
                           label="ผู้รับเงิน"
                           maxLength="20"
                           value={payCustomerPayee || ''}
                           onChange={(e) =>
                             setPayCustomerPayee(e.target.value)
                           }
                           className="w-full  "
                         />
                       </div>
                     </div> 
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0 xl:w-[100px]">
                           วันที่ชำระ:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                         <DatePicker
                         selected={payDate}
                         dateFormat="dd/MM/yyyy"
                         locale={th}
                          onChange={(date) => setPayDate(date)}
                          className="w-full border-2 border-gray-300 rounded-md p-2   shadow-sm focus:outline-none focus:border-blue-500"
                          />
                       </div>
                     </div>
                   </div>
                   <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
                           ผู้ออกบิล:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
                         <Input
                           type="text"
                           label="ผู้รับเงิน"
                           maxLength="20"
                           value={payBillIssuer || ''}
                           onChange={(e) =>
                            setPayBillIssuer(e.target.value)
                           }
                           className="w-full  "
                         />
                       </div>
                     </div> 
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                       <Typography className="xl:w-25 sm:mr-5 sm:w-[88px] md:w-[170px] xl:mr-0">
                       เลขที่อ้างอิงใบรับของ:
                       </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                       <Input
                         type="text"
                         label="เลขที่อ้างอิงใบรับของ"
                         maxLength="15"
                         value={payRef || ''}
                         onChange={(e) =>
                          setPayRef(e.target.value)
                         }
                         className="w-full "
                       />
                       </div>
                     </div>
                   </div>
                 </div>
                )}
                {activePayMenu === "menu2" && (
                    <div className="mt-5 flex w-full flex-col gap-4 my-4">
                    <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                      <div className="flex flex-col items-center sm:flex-row">
                        <div>
                          <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
                            ผู้รับเงิน:
                          </Typography>
                        </div>
                        <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
                          <Input
                            type="text"
                            label="ผู้รับเงิน"
                            maxLength="20"
                            value={payCustomerPayee || ''}
                            onChange={(e) =>
                              setPayCustomerPayee(e.target.value)
                            }
                            className="w-full  "
                          />
                        </div>
                      </div> 
                      <div className="flex flex-col items-center sm:flex-row">
                        <div>
                          <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
                            วันที่ชำระ:
                          </Typography>
                        </div>
                        <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[200px]">
                          <DatePicker
                          selected={payDate}
                          locale={th}
                          dateFormat="dd/MM/yyyy"
                           onChange={(date) => setPayDate(date)}
                           className="w-full border-2 border-gray-300 rounded-md p-2   shadow-sm focus:outline-none focus:border-blue-500"
                           />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                      <div className="flex flex-col items-center sm:flex-row">
                        <div>
                          <Typography className="sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0 xl:w-[120px]">
                            โอนเข้าธนาคาร:
                          </Typography>
                        </div>
                        <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px]  2xl:w-[210px]">
                          <Input
                            type="text"
                            label="โอนเข้าธนาคาร"
                            maxLength="15"
                            value={payAcc || ''}
                            onChange={(e) =>
                              setPayAcc(e.target.value)
                            }
                            className="w-full "
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-start items-center sm:flex-row mt-1  ">
                      <div className="">
                        <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
                          Upload สลิป:
                        </Typography>
                      </div>
                      <div className="mt-3 sm:mt-0 md:w-[250px] ">
                        <Input
                          type="file"
                          label="สลิป"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setSelectedFile(file);
                          }}
                          className="w-full "
                        />
                      </div>
                    </div>
                    </div>
                    <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
                           ผู้ออกบิล:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
                         <Input
                           type="text"
                           label="ผู้รับเงิน"
                           maxLength="20"
                           value={payBillIssuer || ''}
                           onChange={(e) =>
                            setPayBillIssuer(e.target.value)
                           }
                           className="w-full  "
                         />
                       </div>
                     </div> 
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                       <Typography className="xl:w-25 sm:mr-5 sm:w-[88px] md:w-[170px] xl:mr-0">
                       เลขที่อ้างอิงใบรับของ:
                       </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                       <Input
                         type="text"
                         label="เลขที่อ้างอิงใบรับของ"
                         maxLength="15"
                         value={payRef || ''}
                         onChange={(e) =>
                          setPayRef(e.target.value)
                         }
                         className="w-full "
                       />
                       </div>
                     </div>
                   </div>
                  </div>
                )}
                {activePayMenu === "menu3" && (
                   <div className="mt-5 flex w-full flex-col gap-4 my-4">
                   <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
                           ผู้รับเงิน:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
                         <Input
                           type="text"
                           label="ผู้รับเงิน"
                           maxLength="20"
                           value={payCustomerPayee || ''}
                           onChange={(e) =>
                             setPayCustomerPayee(e.target.value)
                           }
                           className="w-full  "
                         />
                       </div>
                     </div> 
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
                           วันที่ชำระ:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                         <DatePicker
                         selected={payDate}
                         locale={th}
                         dateFormat="dd/MM/yyyy"
                          onChange={(date) => setPayDate(date)}
                          className="w-full border-2 border-gray-300 rounded-md p-2   shadow-sm focus:outline-none focus:border-blue-500"
                          />
                       </div>
                     </div>
                   </div>
                   <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
                           ธนาคาร:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
                         <Input
                           type="text"
                           label="ธนาคาร"
                           maxLength="20"
                           value={payBank || ''}
                           onChange={(e) =>
                             setPayBank(e.target.value)
                           }
                           className="w-full  "
                         />
                       </div>
                     </div> 
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
                           เลขที่เช็ค:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px]  2xl:w-[210px]">
                         <Input
                           type="text"
                           label="เลขที่เช็ค"
                           maxLength="15"
                           value={payCheck || ''}
                           onChange={(e) =>
                             setPayCheck(e.target.value)
                           }
                           className="w-full "
                         />
                       </div>
                     </div>
                   </div>
                   <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
                           ผู้ออกบิล:
                         </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
                         <Input
                           type="text"
                           label="ผู้รับเงิน"
                           maxLength="20"
                           value={payBillIssuer || ''}
                           onChange={(e) =>
                            setPayBillIssuer(e.target.value)
                           }
                           className="w-full  "
                         />
                       </div>
                     </div> 
                     <div className="flex flex-col items-center sm:flex-row">
                       <div>
                       <Typography className="xl:w-25 sm:mr-5 sm:w-[88px] md:w-[170px] xl:mr-0">
                       เลขที่อ้างอิงใบรับของ:
                       </Typography>
                       </div>
                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
                       <Input
                         type="text"
                         label="เลขที่อ้างอิงใบรับของ"
                         maxLength="15"
                         value={payRef || ''}
                         onChange={(e) =>
                          setPayRef(e.target.value)
                         }
                         className="w-full "
                       />
                       </div>
                     </div>
                   </div>
                 </div>
                )}
              </Card>
            </DialogBody>
            <DialogFooter className=" flex justify-center py-3 ">
              <div className="flex w-full flex-col justify-center sm:justify-end gap-3 md:flex-row">
                <div className="flex justify-center">
                  <Button
                    variant="gradient"
                    color="red"
                    onClick={handleCloseViewPayDialog}
                    className=" flex items-center align-middle text-base"
                  >
                    <span className="mr-2 flex text-xl">
                      <GiCancel />
                    </span>
                    ออก
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="gradient"
                    color="purple"
                    onClick={sendPay}
                    className=" flex items-center align-middle text-base"
                  >
                    <span className="mr-2 flex text-xl">
                      <GiCancel />
                    </span>
                    ชำระเงิน
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </Dialog>
        </div>
      </Card>
    </>
  );
}
export default Sale;
