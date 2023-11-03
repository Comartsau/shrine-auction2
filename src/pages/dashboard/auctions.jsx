import { useState, useEffect } from "react";
import {
  Card,
  CardFooter,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { GiCancel } from "react-icons/gi";
import { IoIosSave } from "react-icons/io";
import { PencilIcon } from "@heroicons/react/24/solid";
import { PiBroomFill } from "react-icons/pi";
import { AiOutlinePlus,AiFillDelete,} from "react-icons/ai";

import axios from "axios";
import Swal from "sweetalert2";
import { Input } from "postcss";

// Socket
import io from "socket.io-client";
let socket = io.connect(`${import.meta.env.VITE_APP_API_SOCKET}`);


export function Auctions() {
  const Token = localStorage.getItem("token");
  const [selectedSavingsBond, setSelectedSavingsBond] = useState();
  const [selectedGovernmentBonds, setSelectedGovernmentBonds] = useState();

  const [showBottonWin , setShowBottonWin] = useState(false)
  

  // ----------  หัวข้อตาราง -------------- //
  const TABLE_HEAD = ["#", "ชื่อสินค้า", "จำนวน", "หน่วยนับ", "ลบ"];
  const TABLE_HEAD_auctions = ["ลำดับ", "ผู้บริจาค", "จำนวน", "แก้ไข"];
  // -------------------------------------- //

  //------------------ รับข้อมูล เลือกหัวข้อประมูล -----------------//
  const [listDataTitle, setListDataTitle] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(listDataTitle);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);


  const fetchDataChooseTitle = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/Title/Choose`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });

      setListDataTitle(response.data);
 
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ server ได้ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  useEffect(() => {
    fetchDataChooseTitle();
  }, []);

  useEffect(() => {
    setFilteredOptions(listDataTitle);
  }, [listDataTitle]);
  // console.log(listDataTitle)

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = listDataTitle.filter((option) =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  //-------- ฟังก์ชันเลือกตัวเลือก ---------------//
  const handleSelect = async (value) => {
    setSelectedOption(value.title_auction_topic);
    setSearchText(value.title_auction_topic);
    setIsSelectDisabled(true);  //  ยกเลิก  disable
    setIsOpen(false);
    
    
    try {
      const data = {
        auctionstarted_auction_topic: Number(value.auction_topic_id) , 
        auctionstarted_status_A: "1"
      };
      // console.log(data)
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/Show`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data)
      setSelectedId(response.data.id_auctionstarted)
      localStorage.setItem("id_auctionstarted", response.data.id_auctionstarted || '')
      setRoomId(response.data.auctionstarted_auction_topic)

      // Socket 
      socket.emit('display_1')

    } catch (error) {
      console.error("ไม่สามารถสร้างห้องประมูลได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ server ได้ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const  handleEnd = async () => {
    try {
        const data = {
          "show_Id":selectedId
        }

      // console.log(data)
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/clear`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
          data
        }
      );
      // console.log(response.data)
      setSelectedOption("");
      setIsSelectDisabled(false);  //  ยกเลิก  disable
      setIsOpen(false);
      // console.log(listDataTitle)
      setFilteredOptions(listDataTitle);
      setSaveSelectedOption1([])  
      setSaveSelectedOption2([])  
      setSaveSelectedOption3([])  
      setSaveSelectedOption4([])  
      setSaveSelectedOption5([]) 
      setSelectedGovernmentBonds(0)
      setSelectedSavingsBond(0)
      setSelectedPrice('')  
      setValue3('')
      setValueEdit3('')
      setMessage('')
      setShowSendName1('')
      setShowSendName2('')
      setShowSendName3('')
      setShowSendName4('')
      setShowSendName5('')
      setShowName('')
      setProduct([])
      document.getElementById("savingsBond").value = "";
      document.getElementById("governmentBonds").value = "";
      document.getElementById("search6").value = "";
      localStorage.removeItem("id_auctionstarted")
      setListShowTop([])
      setSearchText6('')
      setCustomerId('')
      setSendData('')
      setValue('')
      setActiveButton(0)
      // setValue2('')
      setSearchText('')
      fetchDataChooseTitle()

      // Socket
      socket.emit('number_5')
   

      
       

    } catch (error) {
      console.error("ไม่สามารถลบห้องประมูลได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ server ได้ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
      
    }

  }

  // สถานะเก็บข้อมูลการค้นหาและตัวเลือกที่ถูกกรอง วัตถุมงคล

  const [isOpen1, setIsOpen1] = useState(false);
  const [listDataTitle1, setListDataTitle1] = useState([]);
  const [showSendName1, setShowSendName1] = useState("");
  const [selectedOptionName1, setSelectedOptionName1] = useState("");
  const [saveSelectedOption1, setSaveSelectedOption1] = useState("");
  const [selectedOptionId1, setSelectedOptionId1] = useState("");
  const [selectedOptionAmount1, setSelectedOptionAmount1] = useState("");
  const [selectedOptionCount1, setSelectedOptionCount1] = useState("");
  const [searchText1, setSearchText1] = useState("");
  const [filteredOptions1, setFilteredOptions1] = useState([]);


  const fatchDataAmulet = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/Search-Product/?search=วัตถุมงคล`
       ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data)
      setListDataTitle1(response.data);
    } catch (error) {
      console.error("ไม่สามารถดูข้อมูลวัตถุมงคลได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ server ได้ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  useEffect(() => {
    fatchDataAmulet();
  }, []);

  useEffect(() => {
    setFilteredOptions1(listDataTitle1);
  }, [listDataTitle1]);

  useEffect(()=>{
    console.log(saveSelectedOption1)
  },[saveSelectedOption1])


  const handleSearch1 = (inputText) => {
    // console.log(inputText);

    setSearchText1(inputText);
    if (!inputText) {
      setSelectedOptionName1("");
      setSelectedOptionId1("");
      setSelectedOptionAmount1("");
      setSelectedOptionCount1("");
      setSearchText1(""); // ล้างค่าข้อความใน input ค้นหา

      // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
      document.getElementById("amountInput").value = "";
      setSelectedOptionCount1("");
      document.getElementById("categoryInput").value = "";
    }

    // กรองรายการที่ตรงกับข้อความที่ผู้ใช้ป้อน
    const filteredOptionsAmulet = listDataTitle1.filter((option) =>
      option.product_name.toLowerCase().includes(inputText.toLowerCase())
    );

    setFilteredOptions1(filteredOptionsAmulet);
  };

  // ฟังก์ชันเลือกตัวเลือก
  const handleSelect1 = (value) => {
    setSearchText1(value.product_name);
    setSelectedOptionName1(value.product_name);
    setSelectedOptionId1(value.id);
    setSelectedOptionCount1(value.product_count);
    setSearchText1(value.product_name);
    setIsOpen1(false);
    setFilteredOptions1(listDataTitle1);
  };

  const handleSaveSelectOption1 = async () => {

    const productData = [
      ...saveSelectedOption1,
      ...saveSelectedOption2,
      ...saveSelectedOption3,
      ...saveSelectedOption4,
      ...saveSelectedOption5,
    ];

    const totalProducts = productData.length;

    if (totalProducts > 8) {
      Swal.fire({
        icon: "error",
        title: "เกินจำนวนรายการ",
        text: "รายการที่เลือกเกิน 9 รายการ",
        confirmButtonText: "ตกลง",
      });
      // ล้างค่าหลังการบันทึก
    setSelectedOptionName1("");
    setSelectedOptionId1("");
    setSelectedOptionAmount1("");
    setSelectedOptionCount1("");
    setSearchText1(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput").value = "";
    setSelectedOptionCount1("");
    document.getElementById("categoryInput").value = "";
      return;
    }



    const savedOption = {
      product_name: searchText1,
      id: selectedOptionId1,
      amount: selectedOptionAmount1,
      count: selectedOptionCount1,
    };

    


    // ทำการเพิ่มข้อมูลใหม่เข้าไปใน array เดิม
    setSaveSelectedOption1((prevOptions) => [...prevOptions, savedOption]);
    setShowSendName1(searchText1)

  

    if (selectedOptionId1 == "") {
      try {
        const data = {
          product_name: searchText1,
          product_count: selectedOptionCount1,
          product_category: "วัตถุมงคล",
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/Product`,
          
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        console.log(response.data.Data.id);
        const newId = response.data.Data.id
        savedOption.id = newId;
        setShowSendName1(searchText1)
        await fatchDataAmulet();
      } catch (error) {
        console.error("ไม่สามารถเพิ่มวัตถุมงคลได้", error);
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถติดต่อ Server ได้ ",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    }
    // ล้างค่าหลังการบันทึก
    setSelectedOptionName1("");
    setSelectedOptionId1("");
    setSelectedOptionAmount1("");
    setSelectedOptionCount1("");
    setSearchText1(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput").value = "";
    setSelectedOptionCount1("");
    document.getElementById("categoryInput").value = "";
  };




  //----------- ลบข้อมูล วัตถุมงคลที่เลือก ---------//

  const handleDeleteRow = (index) => {

    // console.log(index)
    handleCloseViewLuckyDialog()
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'การลบข้อมูลจะไม่สามารถเรียกคืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ
        const newData = selectedViewLuckyData.filter((_, i) => i !== index);
        setSaveSelectedOption1(newData);
        Swal.fire(
          'Deleted!',
          'ข้อมูลถูกลบเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  };

  //---------- Dialog  ดูข้อมูลวัตถุมงคล -------------- //
  const [selectedViewLuckyData, setSelectedViewLuckyData] = useState([]);
  const [openViewLuckyDialog, setOpenViewLuckyDialog] = useState(false);
  const [dialogSizeViewLucky, setDialogSizeViewLucky] = useState("xl");

  const handleViewLuckyClick = () => {
    setSelectedViewLuckyData(saveSelectedOption1); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewLuckyDialog(true);
  };

  const handleCloseViewLuckyDialog = () => {
    setSelectedViewLuckyData([]);
    setOpenViewLuckyDialog(false);
  };
  // ------------------------------------------------ //

  

  //--------- สถานะเก็บข้อมูลการค้นหาและตัวเลือกที่ถูกกรอง โทรศัพท์ -------- //
  const [isOpen2, setIsOpen2] = useState(false);
  const [listDataTitle2, setListDataTitle2] = useState([]);
  const [showSendName2, setShowSendName2] = useState("");
  const [selectedOptionName2, setSelectedOptionName2] = useState("");
  const [saveSelectedOption2, setSaveSelectedOption2] = useState("");
  const [selectedOptionId2, setSelectedOptionId2] = useState("");
  const [selectedOptionAmount2, setSelectedOptionAmount2] = useState("");
  const [selectedOptionCount2, setSelectedOptionCount2] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [filteredOptions2, setFilteredOptions2] = useState([]);
  
  const fatchDataTel = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/Search-Product/?search=โทรศัพท์`
        ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data)
      setListDataTitle2(response.data);
    } catch (error) {
      console.error("ไม่สามารถดูข้อมูลโทรศัพท์ได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ Server ได้ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  useEffect(() => {
    fatchDataTel();
  }, []);

  useEffect(() => {
    setFilteredOptions2(listDataTitle2);
  }, [listDataTitle2]);


  const handleSearch2 = (inputText) => {
    // console.log(inputText);

    setSearchText2(inputText);
    if (!inputText) {
      setSelectedOptionName2("");
      setSelectedOptionId2("");
      setSelectedOptionAmount2("");
      setSelectedOptionCount2("");
      setSearchText2(""); // ล้างค่าข้อความใน input ค้นหา

      // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
      document.getElementById("amountInput2").value = "";
      setSelectedOptionCount2("");
      document.getElementById("categoryInput2").value = "";
    }

    // กรองรายการที่ตรงกับข้อความที่ผู้ใช้ป้อน
    const filteredOptionsTel = listDataTitle2.filter((option) =>
      option.product_name.toLowerCase().includes(inputText.toLowerCase())
    );

    setFilteredOptions2(filteredOptionsTel);
  };

  // ฟังก์ชันเลือกตัวเลือก
  const handleSelect2 = (value) => {
    setSearchText2(value.product_name);
    setSelectedOptionName2(value.product_name);
    setSelectedOptionId2(value.id);
    setSelectedOptionCount2(value.product_count);
    setSearchText2(value.product_name);
    setIsOpen2(false);
    setFilteredOptions2(listDataTitle2);
  };

  const handleSaveSelectOption2 = async () => {
    const productData = [
      ...saveSelectedOption1,
      ...saveSelectedOption2,
      ...saveSelectedOption3,
      ...saveSelectedOption4,
      ...saveSelectedOption5,
    ];

    const totalProducts = productData.length;

    if (totalProducts > 8) {
      Swal.fire({
        icon: "error",
        title: "เกินจำนวนรายการ",
        text: "รายการที่เลือกเกิน 9 รายการ",
        confirmButtonText: "ตกลง",
      });
       // ล้างค่าหลังการบันทึก
    setSelectedOptionName2("");
    setSelectedOptionId2("");
    setSelectedOptionAmount2("");
    setSelectedOptionCount2("");
    setSearchText2(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput2").value = "";
    setSelectedOptionCount2("");
    document.getElementById("categoryInput2").value = "";
      return;
    }
    const savedOption = {
      product_name: searchText2,
      id: selectedOptionId2,
      amount: selectedOptionAmount2,
      count: selectedOptionCount2,
    };

    setSaveSelectedOption2((prevOptions) => [...prevOptions, savedOption]);
    setShowSendName2(searchText2)

    if (selectedOptionId2 == "") {
      try {
        const data = {
          product_name: searchText2,
          product_count: selectedOptionCount2,
          product_category: "โทรศัพท์",
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/Product`
         ,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        // console.log(response);
        const newId = response.data.Data.id
        savedOption.id = newId;
        setShowSendName2(searchText2)
        await fatchDataTel();
      } catch (error) {
        console.error("ไม่สามารถเพิ่มเครื่องโทรศัพท์ได้", error);
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถติดต่อ Server ได้ ",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    }
    // ล้างค่าหลังการบันทึก
    setSelectedOptionName2("");
    setSelectedOptionId2("");
    setSelectedOptionAmount2("");
    setSelectedOptionCount2("");
    setSearchText2(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput2").value = "";
    setSelectedOptionCount2("");
    document.getElementById("categoryInput2").value = "";
  };

  //----------- ลบข้อมูล โทรศัพท์ที่เลือก ---------//

  const handleDeleteRowTel = (index) => {

    // console.log(index)
    handleCloseViewTelDialog()
    // ใช้ SweetAlert2 เพื่อแสดงข้อความแจ้งเตือน
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'การลบข้อมูลจะไม่สามารถเรียกคืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ
        const newData = selectedViewTelData.filter((_, i) => i !== index);
        setSaveSelectedOption2(newData);
        // console.log(saveSelectedOption2)
        
        // แสดง SweetAlert2 เมื่อลบข้อมูลเสร็จสิ้น
        Swal.fire(
          'Deleted!',
          'ข้อมูลถูกลบเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  };
  //---------- Dialog  ดูข้อมูลโทรศัพท์ -------------- //

  const [selectedViewTelData, setSelectedViewTelData] = useState([]);
  const [openViewTelDialog, setOpenViewTelDialog] = useState(false);
  const [dialogSizeViewTel, setDialogSizeViewTel] = useState("xl");

  const handleViewTelClick = () => {
    setSelectedViewTelData(saveSelectedOption2); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewTelDialog(true);
  };

  const handleCloseViewTelDialog = () => {
    setSelectedViewTelData([]);
    setOpenViewTelDialog(false);
  };
  // ------------------------------------------------ //


  //----- สถานะเก็บข้อมูลการค้นหาและตัวเลือกที่ถูกกรอง เครื่องใช้สำนักงาน ----- //

  const [isOpen3, setIsOpen3] = useState(false);
  const [listDataTitle3, setListDataTitle3] = useState([]);
  const [showSendName3, setShowSendName3] = useState("");
  const [selectedOptionName3, setSelectedOptionName3] = useState("");
  const [saveSelectedOption3, setSaveSelectedOption3] = useState("");
  const [selectedOptionId3, setSelectedOptionId3] = useState("");
  const [selectedOptionAmount3, setSelectedOptionAmount3] = useState("");
  const [selectedOptionCount3, setSelectedOptionCount3] = useState("");
  const [searchText3, setSearchText3] = useState("");
  const [filteredOptions3, setFilteredOptions3] = useState([]);
  
  const fatchDataOffice = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/Search-Product/?search=เครื่องใช้สำนักงาน`
        ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data)
      setListDataTitle3(response.data);
    } catch (error) {
      console.error("ไม่สามารถดูข้อมูลเครื่องใช้สำนักงานได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ Server ได้ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  useEffect(() => {
    fatchDataOffice();
  }, []);

  useEffect(() => {
    setFilteredOptions3(listDataTitle3);
  }, [listDataTitle3]);


  const handleSearch3 = (inputText) => {
    // console.log(inputText);

    setSearchText3(inputText);
    if (!inputText) {
      setSelectedOptionName3("");
      setSelectedOptionId3("");
      setSelectedOptionAmount3("");
      setSelectedOptionCount3("");
      setSearchText3(""); // ล้างค่าข้อความใน input ค้นหา

      // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
      document.getElementById("amountInput3").value = "";
      setSelectedOptionCount3("");
      document.getElementById("categoryInput3").value = "";
    }

    // กรองรายการที่ตรงกับข้อความที่ผู้ใช้ป้อน
    const filteredOptionsOffice = listDataTitle3.filter((option) =>
      option.product_name.toLowerCase().includes(inputText.toLowerCase())
    );

    setFilteredOptions3(filteredOptionsOffice);
  };

  // ฟังก์ชันเลือกตัวเลือก
  const handleSelect3 = (value) => {
    setSearchText3(value.product_name);
    setSelectedOptionName3(value.product_name);
    setSelectedOptionId3(value.id);
    setSelectedOptionCount3(value.product_count);
    setSearchText3(value.product_name);
    setIsOpen3(false);
    setFilteredOptions3(listDataTitle3);
  };

  const handleSaveSelectOption3 = async () => {
    const productData = [
      ...saveSelectedOption1,
      ...saveSelectedOption2,
      ...saveSelectedOption3,
      ...saveSelectedOption4,
      ...saveSelectedOption5,
    ];

    const totalProducts = productData.length;

    if (totalProducts > 8) {
      Swal.fire({
        icon: "error",
        title: "เกินจำนวนรายการ",
        text: "รายการที่เลือกเกิน 9 รายการ",
        confirmButtonText: "ตกลง",
      });
      // ล้างค่าหลังการบันทึก
    setSelectedOptionName3("");
    setSelectedOptionId3("");
    setSelectedOptionAmount3("");
    setSelectedOptionCount3("");
    setSearchText3(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput3").value = "";
    setSelectedOptionCount3("");
    document.getElementById("categoryInput3").value = "";
      return;
    }
    const savedOption = {
      product_name: searchText3,
      id: selectedOptionId3,
      amount: selectedOptionAmount3,
      count: selectedOptionCount3,
    };

    // ทำการเพิ่มข้อมูลใหม่เข้าไปใน array เดิม
    setSaveSelectedOption3((prevOptions) => [...prevOptions, savedOption]);
    setShowSendName3(searchText3)

    if (selectedOptionId3 == "") {
      try {
        const data = {
          product_name: searchText3,
          product_count: selectedOptionCount3,
          product_category: "เครื่องใช้สำนักงาน",
        };

        const response = await axios.post(
         `${import.meta.env.VITE_APP_API}/Product`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        // console.log(response);
        const newId = response.data.Data.id
        savedOption.id = newId;
        setShowSendName3(searchText3)
        await fatchDataOffice();
      } catch (error) {
        console.error("ไม่สามารถเพิ่มเครื่องใช้สำนักงานได้", error);
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถติดต่อ Server ได้ ",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    }
    // ล้างค่าหลังการบันทึก
    setSelectedOptionName3("");
    setSelectedOptionId3("");
    setSelectedOptionAmount3("");
    setSelectedOptionCount3("");
    setSearchText3(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput3").value = "";
    setSelectedOptionCount3("");
    document.getElementById("categoryInput3").value = "";
  };

  //----------- ลบข้อมูล เครื่องสำนักงานที่เลือก ---------//

  const handleDeleteRowOffice = (index) => {

    // console.log(index)
    handleCloseViewOfficeDialog()
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'การลบข้อมูลจะไม่สามารถเรียกคืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ
        const newData = selectedViewOfficeData.filter((_, i) => i !== index);
        setSaveSelectedOption3(newData);
        // console.log(saveSelectedOption3)
        
        // แสดง SweetAlert2 เมื่อลบข้อมูลเสร็จสิ้น
        Swal.fire(
          'Deleted!',
          'ข้อมูลถูกลบเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  };
  //---------- Dialog  ดูข้อมูลเครื่องสำนักงาน -------------- //

  const [selectedViewOfficeData, setSelectedViewOfficeData] = useState([]);
  const [openViewOfficeDialog, setOpenViewOfficeDialog] = useState(false);
  const [dialogSizeViewOffice, setDialogSizeViewOffice] = useState("xl");

  const handleViewOfficeClick = () => {
    setSelectedViewOfficeData(saveSelectedOption3); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewOfficeDialog(true);
  };

  const handleCloseViewOfficeDialog = () => {
    setSelectedViewOfficeData([]);
    setOpenViewOfficeDialog(false);
  };
  // ------------------------------------------------ //



  //-------- สถานะเก็บข้อมูลการค้นหาและตัวเลือกที่ถูกกรอง เครื่องใช้ไฟฟ้า----------//

  const [isOpen4, setIsOpen4] = useState(false);
  const [listDataTitle4, setListDataTitle4] = useState([]);
  const [showSendName4, setShowSendName4] = useState("");
  const [selectedOptionName4, setSelectedOptionName4] = useState("");
  const [saveSelectedOption4, setSaveSelectedOption4] = useState("");
  const [selectedOptionId4, setSelectedOptionId4] = useState("");
  const [selectedOptionAmount4, setSelectedOptionAmount4] = useState("");
  const [selectedOptionCount4, setSelectedOptionCount4] = useState("");
  const [searchText4, setSearchText4] = useState("");
  const [filteredOptions4, setFilteredOptions4] = useState([]);
  
  const fatchDataPower = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/Search-Product/?search=เครื่องใช้ไฟฟ้า`
      ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data)
      setListDataTitle4(response.data);
    } catch (error) {
      console.error("ไม่สามารถดูข้อมูลเครื่องใช้ไฟฟ้าได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ Server ได้",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  useEffect(() => {
    fatchDataPower();
  }, []);

  useEffect(() => {
    setFilteredOptions4(listDataTitle4);
  }, [listDataTitle4]);


  const handleSearch4 = (inputText) => {
    // console.log(inputText);

    setSearchText4(inputText);
    if (!inputText) {
      setSelectedOptionName4("");
      setSelectedOptionId4("");
      setSelectedOptionAmount4("");
      setSelectedOptionCount4("");
      setSearchText4(""); // ล้างค่าข้อความใน input ค้นหา

      // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
      document.getElementById("amountInput4").value = "";
      setSelectedOptionCount4("");
      document.getElementById("categoryInput4").value = "";
    }

    // กรองรายการวัตถุมงคลที่ตรงกับข้อความที่ผู้ใช้ป้อน
    const filteredOptionsPower = listDataTitle4.filter((option) =>
      option.product_name.toLowerCase().includes(inputText.toLowerCase())
    );

    setFilteredOptions4(filteredOptionsPower);
  };

  // ฟังก์ชันเลือกตัวเลือก
  const handleSelect4 = (value) => {
    setSearchText4(value.product_name);
    setSelectedOptionName4(value.product_name);
    setSelectedOptionId4(value.id);
    setSelectedOptionCount4(value.product_count);
    setSearchText4(value.product_name);
    setIsOpen4(false);
    setFilteredOptions4(listDataTitle4);
  };

  const handleSaveSelectOption4 = async () => {
    const productData = [
      ...saveSelectedOption1,
      ...saveSelectedOption2,
      ...saveSelectedOption3,
      ...saveSelectedOption4,
      ...saveSelectedOption5,
    ];

    const totalProducts = productData.length;

    if (totalProducts > 8) {
      Swal.fire({
        icon: "error",
        title: "เกินจำนวนรายการ",
        text: "รายการที่เลือกเกิน 9 รายการ",
        confirmButtonText: "ตกลง",
      });
      // ล้างค่าหลังการบันทึก
    setSelectedOptionName4("");
    setSelectedOptionId4("");
    setSelectedOptionAmount4("");
    setSelectedOptionCount4("");
    setSearchText4(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput4").value = "";
    setSelectedOptionCount4("");
    document.getElementById("categoryInput4").value = "";
      return;
    }
    const savedOption = {
      product_name: searchText4,
      id: selectedOptionId4,
      amount: selectedOptionAmount4,
      count: selectedOptionCount4,
    };


    // ทำการเพิ่มข้อมูลใหม่เข้าไปใน array เดิม
    setSaveSelectedOption4((prevOptions) => [...prevOptions, savedOption]);
    setShowSendName4(searchText4)

    if (selectedOptionId4 == "") {
      try {
        const data = {
          product_name: searchText4,
          product_count: selectedOptionCount4,
          product_category: "เครื่องใช้ไฟฟ้า",
        };

        const response = await axios.post(
         `${import.meta.env.VITE_APP_API}/Product`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        // console.log(response);
        const newId = response.data.Data.id
        savedOption.id = newId;
        setShowSendName4(searchText4)
        await fatchDataPower();
      } catch (error) {
        console.error("ไม่สามารถเพิ่มเครื่องใช้ไฟฟ้าได้", error);
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถติดต่อ Server ได้",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    }
    // ล้างค่าหลังการบันทึก
    setSelectedOptionName4("");
    setSelectedOptionId4("");
    setSelectedOptionAmount4("");
    setSelectedOptionCount4("");
    setSearchText4(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput4").value = "";
    setSelectedOptionCount4("");
    document.getElementById("categoryInput4").value = "";
  };

  //----------- ลบข้อมูล เครื่องใช้ไฟฟ้าที่เลือก ---------//

  const handleDeleteRowPower = (index) => {

    // console.log(index)
    handleCloseViewPowerDialog()
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'การลบข้อมูลจะไม่สามารถเรียกคืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ
        const newData = selectedViewPowerData.filter((_, i) => i !== index);
        setSaveSelectedOption4(newData);
        // console.log(saveSelectedOption4)
        
        // แสดง SweetAlert2 เมื่อลบข้อมูลเสร็จสิ้น
        Swal.fire(
          'Deleted!',
          'ข้อมูลถูกลบเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  };
  //---------- Dialog  ดูข้อมูลเครื่องใช้ไฟฟ้า -------------- //

  const [selectedViewPowerData, setSelectedViewPowerData] = useState([]);
  const [openViewPowerDialog, setOpenViewPowerDialog] = useState(false);
  const [dialogSizeViewPower, setDialogSizeViewPower] = useState("xl");

  const handleViewPowerClick = () => {
    setSelectedViewPowerData(saveSelectedOption4); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewPowerDialog(true);
  };

  const handleCloseViewPowerDialog = () => {
    setSelectedViewPowerData([]);
    setOpenViewPowerDialog(false);
  };
  // ------------------------------------------------ //

  //--------- สถานะเก็บข้อมูลการค้นหาและตัวเลือกที่ถูกกรอง อื่น ๆ----------//
  
  const [isOpen5, setIsOpen5] = useState(false);
  const [listDataTitle5, setListDataTitle5] = useState([]);
  const [showSendName5, setShowSendName5] = useState("");
  const [selectedOptionName5, setSelectedOptionName5] = useState("");
  const [saveSelectedOption5, setSaveSelectedOption5] = useState("");
  const [selectedOptionId5, setSelectedOptionId5] = useState("");
  const [selectedOptionAmount5, setSelectedOptionAmount5] = useState("");
  const [selectedOptionCount5, setSelectedOptionCount5] = useState("");
  const [searchText5, setSearchText5] = useState("");
  const [filteredOptions5, setFilteredOptions5] = useState([]);
  
  const fatchDataEtc = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/Search-Product/?search=อื่นๆ`
       ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data)
      setListDataTitle5(response.data);
    } catch (error) {
      console.error("ไม่สามารถดูข้อมูลอื่นๆได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ Server ได้",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  useEffect(() => {
    fatchDataEtc();
  }, []);

  useEffect(() => {
    setFilteredOptions5(listDataTitle5);
  }, [listDataTitle5]);


  const handleSearch5 = (inputText) => {
    // console.log(inputText);

    setSearchText5(inputText);
    if (!inputText) {
      setSelectedOptionName5("");
      setSelectedOptionId5("");
      setSelectedOptionAmount5("");
      setSelectedOptionCount5("");
      setSearchText5(""); // ล้างค่าข้อความใน input ค้นหา

      // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
      document.getElementById("amountInput5").value = "";
      setSelectedOptionCount5("");
      document.getElementById("categoryInput5").value = "";
    }

    // กรองรายการวัตถุมงคลที่ตรงกับข้อความที่ผู้ใช้ป้อน
    const filteredOptionsEtc = listDataTitle5.filter((option) =>
      option.product_name.toLowerCase().includes(inputText.toLowerCase())
    );

    setFilteredOptions5(filteredOptionsEtc);
  };

  // ฟังก์ชันเลือกตัวเลือก
  const handleSelect5 = (value) => {
    setSearchText5(value.product_name);
    setSelectedOptionName5(value.product_name);
    setSelectedOptionId5(value.id);
    setSelectedOptionCount5(value.product_count);
    setSearchText5(value.product_name);
    setIsOpen5(false);
    setFilteredOptions5(listDataTitle5);
  };

  const handleSaveSelectOption5 = async () => {
    const productData = [
      ...saveSelectedOption1,
      ...saveSelectedOption2,
      ...saveSelectedOption3,
      ...saveSelectedOption4,
      ...saveSelectedOption5,
    ];

    const totalProducts = productData.length;

    if (totalProducts > 8) {
      Swal.fire({
        icon: "error",
        title: "เกินจำนวนรายการ",
        text: "รายการที่เลือกเกิน 9 รายการ",
        confirmButtonText: "ตกลง",
      });
      // ล้างค่าหลังการบันทึก
    setSelectedOptionName5("");
    setSelectedOptionId5("");
    setSelectedOptionAmount5("");
    setSelectedOptionCount5("");
    setSearchText5(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput5").value = "";
    setSelectedOptionCount5("");
    document.getElementById("categoryInput5").value = "";
      return;
    }
    const savedOption = {
      product_name: searchText5,
      id: selectedOptionId5,
      amount: selectedOptionAmount5,
      count: selectedOptionCount5,
    };

    // ทำการเพิ่มข้อมูลใหม่เข้าไปใน array เดิม
    setSaveSelectedOption5((prevOptions) => [...prevOptions, savedOption]);
    setShowSendName5(searchText5)

    if (selectedOptionId5 == "") {
      try {
        const data = {
          product_name: searchText5,
          product_count: selectedOptionCount5,
          product_category: "อื่นๆ",
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/Product`
          ,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        )
        // console.log(response);
        const newId = response.data.Data.id
        savedOption.id = newId;
        setShowSendName5(searchText5)
        await fatchDataEtc();
      } catch (error) {
        console.error("ไม่สามารถเพิ่มอื่นๆได้", error);
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถติดต่อ Server ได้",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });
      }
    }
    // ล้างค่าหลังการบันทึก
    setSelectedOptionName5("");
    setSelectedOptionId5("");
    setSelectedOptionAmount5("");
    setSelectedOptionCount5("");
    setSearchText5(""); // ล้างค่าข้อความใน input ค้นหา

    // เคลียร์ค่าของ input จำนวนที่ผู้ใช้พิมพ์
    document.getElementById("amountInput5").value = "";
    setSelectedOptionCount5("");
    document.getElementById("categoryInput5").value = "";
  };

  //----------- ลบข้อมูล เครื่องใช้ไฟฟ้าที่เลือก ---------//

  const handleDeleteRowEtc = (index) => {

    // console.log(index)
    handleCloseViewEtcDialog()
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'การลบข้อมูลจะไม่สามารถเรียกคืนได้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ!',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result)=> {
      if (result.isConfirmed) {
        // ลบข้อมูลเมื่อผู้ใช้ยืนยันการลบ
        const newData = selectedViewEtcData.filter((_, i) => i !== index);
        setSaveSelectedOption5(newData);
        // console.log(saveSelectedOption5)
        
        // แสดง SweetAlert2 เมื่อลบข้อมูลเสร็จสิ้น
        Swal.fire(
          'Deleted!',
          'ข้อมูลถูกลบเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  };
  //---------- Dialog  ดูข้อมูลเครื่องใช้ไฟฟ้า -------------- //

  const [selectedViewEtcData, setSelectedViewEtcData] = useState([]);
  const [openViewEtcDialog, setOpenViewEtcDialog] = useState(false);
  const [dialogSizeViewEtc, setDialogSizeViewEtc] = useState("xl");

  const handleViewEtcClick = () => {
    setSelectedViewEtcData(saveSelectedOption5); // นำข้อมูลไปใช้งานภายใน modal / dialog
    setOpenViewEtcDialog(true);
  };

  const handleCloseViewEtcDialog = () => {
    setSelectedViewEtcData([]);
    setOpenViewEtcDialog(false);
  };

  // สถานะเก็บข้อมูลการค้นหาและตัวเลือกที่ถูกกรอง ผู้บริจาค ------------ //

  const [listDataCustomer, setListDataCustomer] = useState([]);
  const [listShowTop, setListShowTop] = useState([]);
  const [senddata, setSendData] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isOpen6, setIsOpen6] = useState(false);
  const [selectedOption6, setSelectedOption6] = useState("");
  const [searchText6, setSearchText6] = useState("");
  const [showName, setShowName] = useState("");
  const [filteredOptions6, setFilteredOptions6] = useState(listDataCustomer);

  const fetchDataChooseCustomer = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/Customer`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response.data);
      // แยกข้อมูลส่วน title เก็บลง state ------- //
      // const titlesArray = response.data.map((item) => item.customer_name);
      // console.log(titlesArray)
      // setListDataCustomer(titlesArray);
      setListDataCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataChooseCustomer();
  }, []);

  useEffect(() => {
    setFilteredOptions6(listDataCustomer);
  }, [listDataCustomer]);


  const handleSearch6 = (text) => {
    if (text !== "") {
      setSearchText6(null);
      setSendData(text);
    }
    setSearchText6(text); // Update the searchText state
    const filtered6 = listDataCustomer.filter((option) =>
      option.customer_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions6(filtered6);
  };
  

  // ฟังก์ชันเลือกตัวเลือก
  const handleSelect6 = (value) => {
    // console.log(value)
    setSelectedOption6(value.customer_name);
    setSearchText6(value.customer_name);
    setShowName(value.customer_name);
    setCustomerId(value.id)
    setIsOpen6(false);
    // clear input value
    const search6 = document.getElementById("search6");
    if (search6.value !== "") {
      search6.value = "";
    }
    const search6Price = document.getElementById("search6Price");
      if (search6Price.value !== "") {
        search6Price.value = "";
      }
  };
  // console.log(selectedOption6)

  const handleClear6 = () => {
    setSelectedOption6("");
    setSearchText6("");
    setIsOpen6(false);
    setFilteredOptions6(listDataCustomer);
  };

  //-------------- เพิ่ม ผู้บริจาค ------------------- //

  // const createNewCustomer = async (customerName) => {
  const createNewCustomer = async () => {
    try {
      const data = {
        customer_name: senddata,
        // customer_name: customerName,
      };

      // console.log(data)
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/Customer`
        ,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response);
      await fetchDataChooseCustomer();
      // console.log(response.data)
      setCustomerId(response.data.id);
      setShowName(response.data.customer_name);
      // console.log(response.data.id)
      // clear input value
      const search6 = document.getElementById("search6");
      if (search6.value !== "") {
        search6.value = "";
      }
      const search6Price = document.getElementById("search6Price");
      if (search6Price.value !== "") {
        search6Price.value = "";
      }
    } catch (error) {
      console.error("ไม่สามารถเพิ่มผู้บริจาคได้", error);
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถติดต่อ Server ได้",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  // console.log(customerId)

  //------------- ส่งข้อมูลผู้ประมูล -------------------------- //


  const handleSendDataAuction = async () => {
    try {
      // console.log(selectedPrice)
      setValue3(selectedPrice)
      const data ={
              auction_result_price: selectedPrice ,
              user_auction: customerId,
              auction_result_auctionstarted: selectedId
            }
      // console.log(data)
      const response = await axios.post(
              `${import.meta.env.VITE_APP_API}/Show/List`,data,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${Token}`,
                },
              }
            );
            // console.log(response.data)
            document.getElementById("search6Price").value = "";
            setSearchText6('')
            document.getElementById("search6").value = "";
            setValue('')
            await showAuction()

            // Socket
            socket.emit('display_3')

            
      
    } catch (error) {
      
    }
  }


  //----- จัดการแสดงข้อมูล / หน้า ตารางประมูล  -------------- //

  const showAuction = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/Show/List/Top`
        ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
        );
        setListShowTop(response.data)
        // console.log(response.data)
        setValueEdit3(response.data[1].auction_result_price)
        
    } catch (error) {
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listDataTitle.slice(startIndex, endIndex); // เปลี่ยน listData = ส่งผลต่อข้อมูลในตาราง

  const totalPages = Math.ceil(listDataTitle.length / itemsPerPage);
  //  --------------------------------------- //


  //-------------- ตรวจสอบจำนวนเงิน ผู้ประมูล --------------//

  const [value, setValue] = useState('');
  const [value3, setValue3] = useState(''); // ค่า max
  const [message, setMessage] = useState('');

  const max = Number(value3);
  
  const handleChange = (event) => {
    const value2 = event.target.value;
    setValue(value2);


    if (Number(value2) < max+1) {

      if (value2 !== "") {
        setMessage(`ต้องมากกว่า ${listShowTop?.[0].auction_result_price} กรุณากรอกใหม่ !`);
      }
    } else {
      setValue(value2);
      // setValue3(value2)
      setValue(value2)
      setMessage('');
    }
  };

  

  //---------- Dialog  แก้ไขราคาผู้บริจาค อันดับ 1 -------------- //
  const [dataViewEditPrice, setDataViewEditPrice] = useState([]);
  const [selectedEditPrice, setSelectedEditPrice] = useState("");
  const [selectedEditPrice2, setSelectedEditPrice2] = useState("");
  const [openViewEditPriceDialog, setOpenViewEditPriceDialog] = useState(false);
  const [dialogSizeViewEditPrice, setDialogSizeViewEditPrice] = useState("md");


  const handleEditPrice = (data) => {
    console.log(data)
 
    setDataViewEditPrice(data || [])
    // setCustomerId(data.id_auction_result)
    setOpenViewEditPriceDialog(true);
  };


  const handleCloseViewEditPriceDialog = () => {
    setOpenViewEditPriceDialog(false);
  };

  //---------- Dialog  แก้ไขราคาผู้บริจาค อันดับ 2 และ 3  -------------- //

  const [openViewEditPriceDialog2, setOpenViewEditPriceDialog2] = useState(false);
  const [dialogSizeViewEditPrice2, setDialogSizeViewEditPrice2] = useState("md");
  const [dataEditName, setDataEditName] = useState([]);



  const handleEditPrice2 = (data) => {
    console.log(data)
 
    setDataEditName(data || [])
    // setCustomerId(data.id_auction_result)
    setOpenViewEditPriceDialog2(true);
  };

  const handleCloseViewEditPriceDialog2 = () => {
    setOpenViewEditPriceDialog2(false);
  };

  const [editValue, setEditValue] = useState('');
  const [valueEdit3, setValueEdit3] = useState(''); // ค่า max
  const [messageEdit, setMessageEdit] = useState('');

  const maxEdit = Number(valueEdit3);

console.log(dataEditName)

const handleEditChange = (event) => {
  const valueEdit2 = event.target.value;
  setEditValue(valueEdit2);

  // console.log(maxEdit)

  if (Number(valueEdit2) < maxEdit+1) {
    if (valueEdit2 !== "") {
      setMessageEdit(`ต้องมากกว่าอันดับ 2 คือ > ${maxEdit} กรุณากรอกใหม่ !`);
    }
  } else {
    setEditValue(valueEdit2);

    setEditValue(valueEdit2)
    setMessageEdit('');
  }
};


// ------  แก้ไขผู้บริจาค อันดับ 1 2 3 ------------- //
const editCustomer = async () => {
  try {
    if (!dataEditName) {
      console.error("No data selected for editing.");
      return;
    }

    const data = {
    customer_name:dataEditName?.user_auction,
    customer_address:"aaa",
    customer_delivery:"bbb",
    customer_contract:"ccc",
    customer_tel:"ddd",
    customer_noun:"eee",
    customer_number:"fff",
    customer_line:"aaaa"
    };

    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/Customer/${dataEditName?.user_auction_id}/edit`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      }
    );

    // console.log(response);
    await showAuction()
    handleCloseViewEditPriceDialog2()
    Swal.fire({
      icon: 'success',
      title: 'แก้ไขผู้บริจาคเรียบร้อย',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {
    console.error("ไม่สามารถแก้ไขผู้บริจาคได้", error);
    Swal.fire({
      icon: 'error',
      title: 'แก้ไขผู้บริจาคไม่สำเร็จ ',
      text: 'กรุณาลองใหม่อีกครั้ง',
      confirmButtonText: 'ตกลง',
    });
  }
};



//------------- ส่งข้อมูลผู้ประมูล -------------------------- //


const handleSendDataEDitAuction = async () => {
  try {
    console.log(dataViewEditPrice)
    // setValueEdit3(selectedEditPrice)
    const data ={
            auction_result_price: selectedEditPrice2 ,
            user_auction: dataViewEditPrice?.user_auction_id,
            auction_result_auctionstarted: selectedId
          }
          // console.log(data)
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/Change-Price`
           ,data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${Token}`,
              },
            }
          );
          setEditValue('')
          await showAuction()
          // console.log(response.data.Data.auction_result_price)
          setValue3(response.data.Data.auction_result_price)
          document.getElementById("search6Price").value = "";
          handleCloseViewEditPriceDialog()
          handleCloseViewEditPriceDialog2()
          document.getElementById("search6Price").value = "";
          setSearchText6('')
          document.getElementById("search6").value = "";
          setValue('')
          setShowName('')
          setMessage('')
          setMessageEdit('')

          // Socket
          socket.emit('display_3')

          
    
  } catch (error) {
    
  }
}


  // -----------  เปลี่ยน Icons ปุ่มเมื่อ Active  ประมูล -------- //
  const [activeButton, setActiveButton] = useState(null);
 

  const handleButtonClick = async (buttonNumber) => {
    setActiveButton(buttonNumber);
    // console.log(buttonNumber)

    if (buttonNumber == 0) return socket.emit('number_0')
    if (buttonNumber == 1) {
      socket.emit('number_1') 
      socket.emit('get_data')
    }
    if (buttonNumber == 2) return socket.emit('number_2')
    if (buttonNumber == 3) return socket.emit('number_3')
    if (buttonNumber == 4) return (socket.emit('number_4') , setShowBottonWin(true))

  };


  //---------- Dialog  ดูข้อมูลทั้งหมดก่อนส่งบันทึก -------------- //
  const [dataPreviewAmulet, setDataPreviewAmulet] = useState([]);
  const [dataPreviewTel, setDataPreviewTel] = useState([]);
  const [dataPreviewOffice, setDataPreviewOffice] = useState([]);
  const [dataPreviewPower, setDataPreviewPower] = useState([]);
  const [dataPreviewEtc, setDataPreviewEtc] = useState([]);
  const [openPreViewDialog, setOpenPreViewDialog] = useState(false);
  const [dialogSizePreView, setDialogSizePreView] = useState("md");


  const handleViewClick = () => {
    console.log(saveSelectedOption1)
    setDataPreviewAmulet(saveSelectedOption1 || [])
    setDataPreviewTel(saveSelectedOption2 || [])
    setDataPreviewOffice(saveSelectedOption3 || [])
    setDataPreviewPower(saveSelectedOption4 || [])
    setDataPreviewEtc(saveSelectedOption5 || [])
    setOpenPreViewDialog(true);
  };

  const handleClosePreViewDialog = () => {
    setOpenPreViewDialog(false);
  };

  const handleSendGift = async () => {
    try {
      const productData = [
        ...saveSelectedOption1,
        ...saveSelectedOption2,
        ...saveSelectedOption3,
        ...saveSelectedOption4,
        ...saveSelectedOption5,
      ]
      console.log(productData)
      console.log(dataPreviewAmulet)
      const productToSend = productData.map(item => ({
        auction_product_start_count_2: item.id,
        auction_product_start_event_count: item.amount
      }));

      const aomsinData =[
        {
          auction_auction_start_count_1: 1,
          auction_auction_start_event_count:selectedSavingsBond || 0,
          
        },
        {
          auction_auction_start_count_1: 2,
          auction_auction_start_event_count:selectedGovernmentBonds || 0
        },
      ]
      // console.log(aomsinData)

      const data = {
        "status_Id":selectedId,
        "products": productToSend,
        "aomsin":aomsinData
      }
      console.log(data)
      const response = await axios.put(
       `${import.meta.env.VITE_APP_API}/Show`,data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      console.log(response.data);
      fetchDataGift()
      handleClosePreViewDialog()

      // Socket
      socket.emit('display_1')

      
    } catch (error) {
      
    }
  }
  // ------------------------------------------------ //


  // ---------  ปรับแต่งขนาด  Dialog ------------ //

  const checkScreenSize = () => {
    if (window.innerWidth < 540) {
      setDialogSizePreView("xl"); // หรือเปลี่ยนเป็น "lg" หรือ "md" ตามความต้องการ
    } else if (window.innerWidth < 730) {
      setDialogSizePreView("xl");
    } else if (window.innerWidth < 960) {
      setDialogSizePreView("xl");
    } else if (window.innerWidth < 1140) {
      setDialogSizePreView("lg");
    } else if (window.innerWidth < 1320) {
      setDialogSizePreView("lg");
    } else {
      setDialogSizePreView("md");
    }
  };

  useEffect(() => {
    // เรียกฟังก์ชันเมื่อ Component โหลดหรือขนาดหน้าจอเปลี่ยน
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // คืนค่าเมื่อ Component ถูก Unmount เพื่อเลิกติดตามการเปลี่ยนขนาดหน้าจอ
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //----------------- show Gift ----------------------//

  const [product, setProduct] = useState([]);

  console.log(product)

  const fetchDataGift = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/Show`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });

      setProduct(response.data?.[0].product);

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
      fetchDataGift();
  }, []);
  
  const filteredProducts = product.filter(
    (product) => product.auction_product_start_event_count > 0
  );

  const concatenatedProducts = filteredProducts
    .map(
      (product) =>
        `${product.product_name} ${product.auction_product_start_event_count} ${product.product_count}`
    )
    .join(" / ");


 
  return (
    <div>
      {/* <p>เริ่มการประมูล</p> */}
     
      <div className="flex flex-col justify-center gap-3 align-middle md:flex-col lg:flex-row">
        {/* content left  หัวข้อประมูล / รายการประมูล */}
        {/* หัวข้อประมูล / รายการประมูล */}
        <div className="flex h-[690px] w-full  lg:w-[60%] ">
          <Card className=" h-auto  w-full overflow-scroll px-5  ">
            <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row ">
              <div>
                <Typography className="flex w-[90px] text-sm">
                  หัวข้อประมูล:
                </Typography>
              </div>
              <div className="flex items-center justify-center align-middle">
                <div className="relative flex w-[200px] justify-center">
                  <input
                    type="text"
                    id="inputTitle"
                    placeholder="ค้นหาหัวข้อประมูล"
                    autoComplete="off"
                    value={searchText || ''}
                    list="option"
                    disabled={isSelectDisabled}
                    onChange={(e) => handleSearch(e.target.value)}
                    className=" w-full rounded border border-gray-400 p-1  py-2 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                    onFocus={() => setIsOpen(true)} // แสดงเมื่อ Input ค้นหา active
                    onBlur={() => setTimeout(() => setIsOpen(false), 500)}
                  />
                  {isOpen && (
                    <div
                      className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                      style={{ backgroundColor: "#fff" }}
                    >
                      {filteredOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect(option)}
                          className="cursor-pointer p-2 hover:bg-blue-200 "
                        >
                          {option.title_auction_topic}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex w-full items-center justify-center align-middle md:justify-start">
                {/* <Button size="sm" onClick={() => handleClear()}>
                  <span className="flex justify-center  text-sm ">
                    ล้างข้อมูล
                  </span>
                </Button> */}
                <Button
                  size="sm"
                  variant="gradient"
                  color="red"
                  className=" bg-p  flex items-center align-middle text-sm"
                  onClick={() => handleEnd()}
                >
                  <span className="mr-2 flex text-base">
                    <PiBroomFill />
                  </span>
                  เคลียร์ห้องประมูล
                </Button>
              </div>
            </div>
            <div className="mt-5 flex  flex-col items-center gap-3 sm:flex-row ">
              <div className="flex w-full justify-center text-center">
                <Typography className="text-sm font-bold">
                  ฉลากออมสิน
                  <span className="ms-3">
                    {" "}
                    {selectedSavingsBond || 0}{" "}
                  </span> ใบ <span>|</span> ล็อตเตอรี่{" "}
                  <span> {selectedGovernmentBonds || 0} </span> ใบ
                </Typography>
              </div>
            </div>
            <div className="mt-5 flex  flex-col items-center gap-3 sm:flex-row ">
              <div className="flex w-full justify-center text-center">
                <Typography id="showgift" className="text-sm ">
                  {concatenatedProducts || ''}
                </Typography>
              </div>
            </div>
            <hr className=" mt-3 h-[3px] bg-gray-500" />
            <div className="mt-2 flex  flex-col  items-center gap-3 sm:flex-row ">
            </div>
            <div className="mt-5 flex flex-col  items-center   justify-center  gap-3  sm:flex-row sm:justify-start">
              <div className="flex items-center gap-3">
                <div className="flex w-auto justify-center text-center sm:justify-start">
                  <Typography className="text-sm ">สลากออมสิน</Typography>
                </div>
                <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                  <input
                    type="number"
                    autoComplete="off"
                    min="0"
                    id="savingsBond"
                    onChange={(e) => setSelectedSavingsBond(e.target.value)}
                    className=" focus:shadow-outline   w-[70px] appearance-none rounded  border border-gray-400  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                  />
                  <Typography className="flex  items-center  ">ใบ</Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex w-auto justify-center text-center sm:justify-start">
                  <Typography className="text-sm ">/ ล็อตเตอรี่</Typography>
                </div>
                <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                  <input
                    type="number"
                    autoComplete="off"
                    min="0"
                    id="governmentBonds"
                    onChange={(e) => setSelectedGovernmentBonds(e.target.value)}
                    className=" focus:shadow-outline  w-[70px] appearance-none rounded  border border-gray-400 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                  />
                  <Typography className="flex  items-center  ">ใบ</Typography>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row ">
              <div>
                <Typography className="flex w-[120px] text-sm">
                  วัตถุมงคล:
                </Typography>
              </div>
              <div className="relative flex w-[200px] justify-center">
                <input
                  type="text"
                  placeholder="เลือกวัตถุมงคล"
                  autoComplete="off"
                  value={searchText1 || ''}
                  list="option"
                  onChange={(e) => handleSearch1(e.target.value)}
                  className="w-full rounded  border border-gray-400 p-1 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                  onFocus={() => setIsOpen1(true)} // แสดงเมื่อ Input ค้นหา active
                  onBlur={() => setTimeout(() => setIsOpen1(false), 1000)}
                />
                {isOpen1 && (
                  <div
                    className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                    style={{ backgroundColor: "#fff" }}
                  >
                    {filteredOptions1.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelect1(option)}
                        className="cursor-pointer p-2 hover:bg-blue-200 "
                      >
                        {option.product_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center justify-center  gap-3  sm:flex-row  sm:justify-start ">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="number"
                      autoComplete="off"
                      min="1"
                      size="sm"
                      placeholder="จำนวน"
                      id="amountInput"
                      className=" focus:shadow-outline w-[90px]  appearance-none rounded border  border-gray-400 p-1  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setSelectedOptionAmount1(e.target.value)}
                    />
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="text"
                      autoComplete="off"
                      id="categoryInput"
                      placeholder="หน่วยนับ"
                      className=" focus:shadow-outline w-[90px]   appearance-none rounded border  border-gray-400 p-1 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      value={selectedOptionCount1 || ''}
                      disabled={selectedOptionName1 && searchText1 !== ""}
                      onChange={(e) => setSelectedOptionCount1(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                    <IconButton
                      color="green"
                      size="sm"
                      className=" rounded-full border-4  border-green-500 "
                      // disabled={isButtonDisabled()}
                      disabled = { searchText1 == '' || !selectedOptionAmount1 || !selectedOptionCount1}
                      onClick={handleSaveSelectOption1}
                    >
                      <AiOutlinePlus className="text-2xl" />
                    </IconButton>
                  </div>
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <IconButton
                      size="sm"
                      onClick={handleViewLuckyClick}
                      className=" rounded-full "
                    >
                      <i className="fa-solid fa-magnifying-glass  fa-xl"></i>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-3 ">
              <div className="flex w-full items-center justify-center">
                <Typography className="w-full  text-center text-md text-red-600 ">
                  {showSendName1 || '' }
                </Typography>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-2 ">
              <div>
                <Typography className="flex w-[120px] text-sm">
                  โทรศัพท์:
                </Typography>
              </div>
              <div className="relative flex w-[200px] justify-center">
                <input
                  type="text"
                  placeholder="เลือกโทรศัพท์"
                  autoComplete="off"
                  value={searchText2 || ''}
                  list="option"
                  onChange={(e) => handleSearch2(e.target.value)}
                  className="w-full rounded  border border-gray-400 p-1 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                  onFocus={() => setIsOpen2(true)} // แสดงเมื่อ Input ค้นหา active
                  onBlur={() => setTimeout(() => setIsOpen2(false), 1000)}
                />
                {isOpen2 && (
                  <div
                    className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                    style={{ backgroundColor: "#fff" }}
                  >
                    {filteredOptions2.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelect2(option)}
                        className="cursor-pointer p-2 hover:bg-blue-200 "
                      >
                        {option.product_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-2 flex flex-col items-center  justify-center  gap-3  sm:flex-row sm:justify-start ">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="number"
                      autoComplete="off"
                      min="1"
                      size="sm"
                      placeholder="จำนวน"
                      id="amountInput2"
                      className=" focus:shadow-outline w-[90px]  appearance-none rounded border  border-gray-400 p-1  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setSelectedOptionAmount2(e.target.value)}
                    />
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="text"
                      autoComplete="off"
                      id="categoryInput2"
                      placeholder="หน่วยนับ"
                      className=" focus:shadow-outline w-[90px]   appearance-none rounded border  border-gray-400 p-1 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      value={selectedOptionCount2 || ''}
                      disabled={selectedOptionName2 && searchText2 !== ""}
                      onChange={(e) => setSelectedOptionCount2(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                    <IconButton
                      color="green"
                      size="sm"
                      className=" rounded-full border-4  border-green-500 "
                      disabled = { searchText2 == '' || !selectedOptionAmount2 || !selectedOptionCount2}
                      onClick={handleSaveSelectOption2}
                    >
                      <AiOutlinePlus className="text-2xl" />
                    </IconButton>
                  </div>
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <IconButton
                      size="sm"
                      onClick={handleViewTelClick}
                      className=" rounded-full "
                    >
                      <i className="fa-solid fa-magnifying-glass  fa-xl"></i>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-3 ">
              <div className="flex w-full items-center justify-center">
                <Typography className="w-full  text-center  text-md text-red-600 ">
                {showSendName2 || ''}
                </Typography>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-2 ">
              <div>
                <Typography className="flex w-[120px] text-sm">
                  เครื่องใช้สำนักงาน:
                </Typography>
              </div>
              <div className="relative flex w-[200px] justify-center">
              <input
                  type="text"
                  placeholder="เลือกเครื่องใช้สำนักงาน"
                  autoComplete="off"
                  value={searchText3 || ''}
                  list="option"
                  onChange={(e) => handleSearch3(e.target.value)}
                  className="w-full rounded  border border-gray-400 p-1 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                  onFocus={() => setIsOpen3(true)} // แสดงเมื่อ Input ค้นหา active
                  onBlur={() => setTimeout(() => setIsOpen3(false), 1000)}
                />
                {isOpen3 && (
                      <div
                      className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                      style={{ backgroundColor: "#fff" }}
                    >
                      {filteredOptions3.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect3(option)}
                          className="cursor-pointer p-2 hover:bg-blue-200 "
                        >
                          {option.product_name}
                        </div>
                      ))}
                    </div>
                )}
              </div>
              <div className="mt-2 flex flex-col items-center  justify-center  gap-3  sm:flex-row sm:justify-start ">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="number"
                      autoComplete="off"
                      min="1"
                      size="sm"
                      placeholder="จำนวน"
                      id="amountInput3"
                      className=" focus:shadow-outline w-[90px]  appearance-none rounded border  border-gray-400 p-1  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setSelectedOptionAmount3(e.target.value)}
                    />
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="text"
                      autoComplete="off"
                      id="categoryInput3"
                      className=" focus:shadow-outline w-[90px]   appearance-none rounded border  border-gray-400 p-1 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      value={selectedOptionCount3 || ''}
                      placeholder="หน่วยนับ"
                      disabled={selectedOptionName3 && searchText3 !== ""}
                      onChange={(e) => setSelectedOptionCount3(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                    <IconButton
                      color="green"
                      size="sm"
                      className=" rounded-full border-4  border-green-500 "
                      disabled = { searchText3 == '' || !selectedOptionAmount3 || !selectedOptionCount3}
                      onClick={handleSaveSelectOption3}
                    >
                      <AiOutlinePlus className="text-2xl" />
                    </IconButton>
                  </div>
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <IconButton
                      size="sm"
                      onClick={handleViewOfficeClick}
                      className=" rounded-full "
                      
                    >
                      <i className="fa-solid fa-magnifying-glass  fa-xl"></i>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-3 ">
              <div className="flex w-full items-center justify-center">
              <Typography className="w-full  text-center  text-md text-red-600 ">
                {showSendName3 || ''}
                </Typography>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-2 ">
              <div>
                <Typography className="flex w-[120px] text-sm">
                  เครื่องใช้ไฟฟ้า:
                </Typography>
              </div>
              <div className="relative flex w-[200px] justify-center">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="เลือกเครื่องใช้ไฟฟ้า"
                  value={searchText4 || ''}
                  list="option"
                  onChange={(e) => handleSearch4(e.target.value)}
                  className="w-full rounded  border border-gray-400 p-1 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                  onFocus={() => setIsOpen4(true)} // แสดงเมื่อ Input ค้นหา active
                  onBlur={() => setTimeout(() => setIsOpen4(false), 1000)}
                />
                {isOpen4 && (
                      <div
                      className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                      style={{ backgroundColor: "#fff" }}
                    >
                      {filteredOptions4.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect4(option)}
                          className="cursor-pointer p-2 hover:bg-blue-200 "
                        >
                          {option.product_name}
                        </div>
                      ))}
                    </div>
                )}
              </div>
              <div className="mt-2 flex flex-col items-center  justify-center  gap-3  sm:flex-row sm:justify-start ">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="number"
                      autoComplete="off"
                      min="1"
                      size="sm"
                      id="amountInput4"
                      placeholder="จำนวน"
                      className=" focus:shadow-outline w-[90px]   appearance-none rounded border  border-gray-400 p-1  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setSelectedOptionAmount4(e.target.value)}
                    />
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="text"
                      autoComplete="off"
                      id="categoryInput4"
                      placeholder="หน่วยนับ"
                      className=" focus:shadow-outline w-[90px]   appearance-none rounded border  border-gray-400 p-1 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      value={selectedOptionCount4 || ''}
                      disabled={selectedOptionName4 && searchText4 !== ""}
                      onChange={(e) => setSelectedOptionCount4(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                    <IconButton
                      color="green"
                      size="sm"
                      className=" rounded-full border-4  border-green-500 "
                      disabled = { searchText4 == '' || !selectedOptionAmount4 || !selectedOptionCount4}
                      onClick={handleSaveSelectOption4}
                    >
                      <AiOutlinePlus className="text-2xl" />
                    </IconButton>
                  </div>
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <IconButton
                      size="sm"
                      onClick={handleViewPowerClick}
                      className=" rounded-full "
                    >
                      <i className="fa-solid fa-magnifying-glass  fa-xl"></i>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-3 ">
              <div className="flex w-full items-center justify-center">
              <Typography className="w-full  text-center  text-md text-red-600 ">
                {showSendName4 || ''}
                </Typography>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-2 ">
              <div>
                <Typography className="flex w-[120px] text-sm">
                  อื่นๆ:
                </Typography>
              </div>
              <div className="relative flex w-[200px] justify-center">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="เลือกอื่นๆ"
                  value={searchText5 || ''}
                  list="option"
                  onChange={(e) => handleSearch5(e.target.value)}
                  className="w-full rounded  border border-gray-400 p-1 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                  onFocus={() => setIsOpen5(true)} // แสดงเมื่อ Input ค้นหา active
                  onBlur={() => setTimeout(() => setIsOpen5(false), 1000)}
                />
                {isOpen5 && (
                      <div
                      className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                      style={{ backgroundColor: "#fff" }}
                    >
                      {filteredOptions5.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect5(option)}
                          className="cursor-pointer p-2 hover:bg-blue-200 "
                        >
                          {option.product_name}
                        </div>
                      ))}
                    </div>
                )}
              </div>
              <div className="mt-2 flex flex-col items-center  justify-center  gap-3  sm:flex-row sm:justify-start ">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="number"
                      autoComplete="off"
                      min="1"
                      size="sm"
                      id="amountInput5"
                      placeholder="จำนวน"
                      className=" focus:shadow-outline w-[90px]   appearance-none rounded border  border-gray-400 p-1  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      onChange={(e) => setSelectedOptionAmount5(e.target.value)}
                    />
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="text"
                      autoComplete="off"
                      id="categoryInput5"
                      placeholder="หน่วยนับ"
                      className=" focus:shadow-outline w-[90px]   appearance-none rounded border  border-gray-400 p-1 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      value={selectedOptionCount5 || ''}
                      disabled={selectedOptionName5 && searchText5 !== ""}
                      onChange={(e) => setSelectedOptionCount5(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                    <IconButton
                      color="green"
                      size="sm"
                      className=" rounded-full border-4  border-green-500 "
                      disabled = { searchText5 == '' || !selectedOptionAmount5 || !selectedOptionCount5}
                      onClick={handleSaveSelectOption5}
                    >
                      <AiOutlinePlus className="text-2xl" />
                    </IconButton>
                  </div>
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <IconButton
                      size="sm"
                      onClick={handleViewEtcClick}
                      className=" rounded-full "
                    >
                      <i className="fa-solid fa-magnifying-glass  fa-xl"></i>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row md:mt-3 ">
              <div className="flex w-full items-center justify-center">
              <Typography className="w-full  text-center  text-md text-red-600 ">
                {showSendName5 || ''}
                </Typography>
              </div>
            </div>
            <div className="my-5  flex flex-col items-center justify-center gap-5 sm:flex-row md:justify-end ">
              <div className="flex  justify-center gap-5 ">
                <div className="flex w-full items-center justify-center align-middle md:justify-start">
                  <Button
                    size="sm"
                    color="blue"
                    // onClick={handleCombineData}
                    onClick={handleViewClick}
                  >
                    <span className="flex justify-center  text-sm ">
                      ดูตัวอย่าง
                    </span>
                  </Button>
                </div>
                <div className="flex w-full items-center justify-center align-middle md:justify-start">
                  <Button
                    size="sm"
                    variant="gradient"
                    color="green"
                    className=" flex items-center align-middle text-sm"
                    onClick={()=> handleSendGift()}
                  >
                    <span className="mr-2 flex text-base">
                      <IoIosSave />
                    </span>
                    บันทึก
                  </Button>
                </div>
              </div>
            </div>

            {/* ----  View  ดูภาพรวมก่อนส่งบันทึก -------------- */}

            <Dialog
              open={openPreViewDialog}
              size={dialogSizePreView}
              handler={handleClosePreViewDialog}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-[650px] "
            >
              <DialogHeader className=" text-center text-base  text-white  bg-blue-700 opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">ดูตัวอย่าง</Typography>
                </div>
              </DialogHeader>
              <DialogBody
                divider
                className="px-5 sm:px-[30px] md:px-[60px] lg:px-[60px] xl:px-[60px]"
              >
                <div className="flex w-full flex-col gap-3">
                  <div className="flex flex-row gap-3">
                    <div>
                      <Typography className="text-center font-bold sm:w-[110px] sm:text-left">
                        หัวข้อประมูล:
                      </Typography>
                    </div>
                    <div>
                      <Typography className="text-center font-bold   sm:text-left">
                        {selectedOption || ""}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 sm:gap-5 md:flex-row">
                    <div className="flex  gap-5">
                      <div className="flex justify-center  sm:justify-center">
                        <Typography className=" text-center font-bold sm:text-left">
                          ฉลากออมสิน:
                        </Typography>
                      </div>
                      <div className="flex justify-center  sm:justify-center">
                        <Typography className=" text-center font-bold sm:text-left">
                          {selectedSavingsBond || ""}
                        </Typography>
                      </div>
                      <div className="flex justify-center  sm:justify-center">
                        <Typography className=" text-center font-bold sm:text-left">
                          ใบ
                        </Typography>
                      </div>
                    </div>
                    <div className="flex  gap-3">
                      <div className="flex justify-center  sm:justify-center">
                        <Typography className=" text-center font-bold sm:text-left">
                          ฉลากกินแบ่งรัฐบาล:
                        </Typography>
                      </div>
                      <div className="flex justify-center  sm:justify-center">
                        <Typography className=" text-center font-bold sm:text-left">
                          {selectedGovernmentBonds || ""}
                        </Typography>
                      </div>
                      <div className="flex justify-center  sm:justify-center">
                        <Typography className=" text-center font-bold sm:text-left">
                          ใบ
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* วัตถุมงคล */}
                  <div className="flex flex-col  gap-3 sm:gap-3">
                    <div className="flex ">
                      <Typography className=" text-center font-bold sm:text-left">
                        วัตถุมงคล:
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                      {dataPreviewAmulet?.map((data, index) => (
                        <div key={index} className="flex px-7">
                          <Typography className="text-center  ">
                            {data?.product_name || ''}  | จำนวน {data?.amount || ''}     {data?.count || ''}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* โทรศัพท์ */}
                  <div className="flex flex-col  gap-3 sm:gap-3">
                    <div className="flex ">
                      <Typography className=" text-center font-bold sm:text-left">
                        โทรศัพท์:
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                      {dataPreviewTel?.map((data, index) => (
                        <div key={index} className="flex px-7">
                          <Typography className="text-center  ">
                            {data?.product_name || ''} | จำนวน {data?.amount || ''}     {data?.count || ''}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* เครื่องใช้สำนักงาน */}
                  <div className="flex flex-col  gap-3 sm:gap-3">
                    <div className="flex ">
                      <Typography className=" text-center font-bold sm:text-left">
                        เครื่องใช้สำนักงาน:
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                      {dataPreviewOffice?.map((data, index) => (
                        <div key={index} className="flex px-7">
                          <Typography className="text-center  ">
                            {data?.product_name || ''} | จำนวน {data?.amount || ''}     {data?.count || ''}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* เครื่องใช้ไฟฟ้า */}
                  <div className="flex flex-col  gap-3 sm:gap-3">
                    <div className="flex ">
                      <Typography className=" text-center font-bold sm:text-left">
                        เครื่องใช้ไฟฟ้า:
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                      {dataPreviewPower?.map((data, index) => (
                        <div key={index} className="flex px-7">
                          <Typography className="text-center  ">
                            {data?.product_name || ''} | จำนวน {data?.amount || ''}     {data?.count || ''}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* อื่นๆ */}
                  <div className="flex flex-col  gap-3 sm:gap-3">
                    <div className="flex ">
                      <Typography className=" text-center font-bold sm:text-left">
                        อื่นๆ:
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-3">
                      {dataPreviewEtc?.map((data, index) => (
                        <div key={index} className="flex px-7">
                          <Typography className="text-center  ">
                            {data?.product_name || ''} | จำนวน {data?.amount || ''}     {data?.count || ''}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end gap-5">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleClosePreViewDialog}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                  onClick={()=> handleSendGift()}
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button>
              </DialogFooter>
            </Dialog>

            {/* ----  View วัตถุมงคล -------------- */}

            <Dialog
              open={openViewLuckyDialog}
              size={dialogSizeViewLucky}
              handler={handleCloseViewLuckyDialog}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-auto lg:h-auto"
            >
              <DialogHeader className="bg-blue-700  text-center text-base  text-white opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">
                    หมวดหมู่: วัตถุมงคล
                  </Typography>
                </div>
              </DialogHeader>
              <DialogBody>
                {selectedViewLuckyData.length > 0 ? (
                  <Card className="mt-5 h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 py-4 px-2"
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
                        {selectedViewLuckyData?.map((data, index) => {
                          const isLast = index === displayedData.length - 1;
                          const pageIndex = startIndex + index;
                          const classes = isLast
                            ? "p-2"
                            : "p-2 border-b border-blue-gray-50";
                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {pageIndex + 1 || ''}
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
                                  className="font-normal"
                                >
                                  {data.amount || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.count || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <IconButton 
                                variant="text"
                                color="red"
                                onClick={() => handleDeleteRow(index)}
                                >
                                  <AiFillDelete className="h-4 w-4" />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                      <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        ก่อนหน้า
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <IconButton
                            key={i}
                            variant="outlined"
                            size="sm"
                            onClick={() => setCurrentPage(i + 1)}
                            className={
                              currentPage === i + 1
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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        ถัดไป
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="mt-3 flex w-full justify-center">
                    <p>ยังไม่มีข้อมูลการเลือกวัตถุมงคล</p>
                  </div>
                )}
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleCloseViewLuckyDialog}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                {/* <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button> */}
              </DialogFooter>
            </Dialog>

            {/* ----  View โทรศัพท์ -------------- */}

            <Dialog
              open={openViewTelDialog}
              size={dialogSizeViewTel}
              handler={handleCloseViewTelDialog}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-auto lg:h-auto"
            >
              <DialogHeader className="bg-blue-700  text-center text-base  text-white opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">
                    หมวดหมู่: โทรศัพท์
                  </Typography>
                </div>
              </DialogHeader>
              <DialogBody>
                {selectedViewTelData.length > 0 ? (
                  <Card className="mt-5 h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 py-4 px-2"
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
                        {selectedViewTelData?.map((data, index) => {
                          const isLast = index === displayedData.length - 1;
                          const pageIndex = startIndex + index;
                          const classes = isLast
                            ? "p-2"
                            : "p-2 border-b border-blue-gray-50";
                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {pageIndex + 1 || ''}
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
                                  className="font-normal"
                                >
                                  {data.amount || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.count || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <IconButton 
                                variant="text"
                                color="red"
                                onClick={() => handleDeleteRowTel(index)}
                                className=""
                                >
                                  <AiFillDelete className="h-4 w-4 " />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                      <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        ก่อนหน้า
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <IconButton
                            key={i}
                            variant="outlined"
                            size="sm"
                            onClick={() => setCurrentPage(i + 1)}
                            className={
                              currentPage === i + 1
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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        ถัดไป
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="mt-3 flex w-full justify-center">
                    <p>ยังไม่มีข้อมูลการเลือกวัตถุมงคล</p>
                  </div>
                )}
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleCloseViewTelDialog}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                {/* <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button> */}
              </DialogFooter>
            </Dialog>

            {/* ----  View เครื่องใช้สำนักงาน -------------- */}

            <Dialog
              open={openViewOfficeDialog}
              size={dialogSizeViewOffice}
              handler={handleCloseViewOfficeDialog}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-auto lg:h-auto"
            >
              <DialogHeader className="bg-blue-700  text-center text-base  text-white opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">
                    หมวดหมู่: เครื่องใช้สำนักงาน
                  </Typography>
                </div>
              </DialogHeader>
              <DialogBody>
                {selectedViewOfficeData.length > 0 ? (
                  <Card className="mt-5 h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 py-4 px-2"
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
                        {selectedViewOfficeData?.map((data, index) => {
                          const isLast = index === displayedData.length - 1;
                          const pageIndex = startIndex + index;
                          const classes = isLast
                            ? "p-2"
                            : "p-2 border-b border-blue-gray-50";
                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {pageIndex + 1 || ''}
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
                                  className="font-normal"
                                >
                                  {data.amount || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.count || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <IconButton 
                                variant="text"
                                color="red"
                                onClick={() => handleDeleteRowOffice(index)}
                                className=""
                                >
                                  <AiFillDelete className="h-4 w-4 " />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                      <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        ก่อนหน้า
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <IconButton
                            key={i}
                            variant="outlined"
                            size="sm"
                            onClick={() => setCurrentPage(i + 1)}
                            className={
                              currentPage === i + 1
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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        ถัดไป
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="mt-3 flex w-full justify-center">
                    <p>ยังไม่มีข้อมูลการเลือกวัตถุมงคล</p>
                  </div>
                )}
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleCloseViewOfficeDialog}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                {/* <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button> */}
              </DialogFooter>
            </Dialog>

            {/* ----  View เครื่องใช้ไฟฟ้า -------------- */}

            <Dialog
              open={openViewPowerDialog}
              size={dialogSizeViewPower}
              handler={handleCloseViewPowerDialog}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-auto lg:h-auto"
            >
              <DialogHeader className="bg-blue-700  text-center text-base  text-white opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">
                    หมวดหมู่: เครื่องใช้ไฟฟ้า
                  </Typography>
                </div>
              </DialogHeader>
              <DialogBody>
                {selectedViewPowerData.length > 0 ? (
                  <Card className="mt-5 h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 py-4 px-2"
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
                        {selectedViewPowerData?.map((data, index) => {
                          const isLast = index === displayedData.length - 1;
                          const pageIndex = startIndex + index;
                          const classes = isLast
                            ? "p-2"
                            : "p-2 border-b border-blue-gray-50";
                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {pageIndex + 1 || ''}
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
                                  className="font-normal"
                                >
                                  {data.amount || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.count || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <IconButton 
                                variant="text"
                                color="red"
                                onClick={() => handleDeleteRowPower(index)}
                                className=""
                                >
                                  <AiFillDelete className="h-4 w-4 " />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                      <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        ก่อนหน้า
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <IconButton
                            key={i}
                            variant="outlined"
                            size="sm"
                            onClick={() => setCurrentPage(i + 1)}
                            className={
                              currentPage === i + 1
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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        ถัดไป
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="mt-3 flex w-full justify-center">
                    <p>ยังไม่มีข้อมูลการเลือกวัตถุมงคล</p>
                  </div>
                )}
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleCloseViewPowerDialog}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                {/* <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button> */}
              </DialogFooter>
            </Dialog>

            {/* ----  View อื่น ๆ -------------- */}

            <Dialog
              open={openViewEtcDialog}
              size={dialogSizeViewEtc}
              handler={handleCloseViewEtcDialog}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-auto lg:h-auto"
            >
              <DialogHeader className="bg-blue-700  text-center text-base  text-white opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">หมวดหมู่: อื่นๆ</Typography>
                </div>
              </DialogHeader>
              <DialogBody>
                {selectedViewEtcData.length > 0 ? (
                  <Card className="mt-5 h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 py-4 px-2"
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
                        {selectedViewEtcData?.map((data, index) => {
                          const isLast = index === displayedData.length - 1;
                          const pageIndex = startIndex + index;
                          const classes = isLast
                            ? "p-2"
                            : "p-2 border-b border-blue-gray-50";
                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                  >
                                    {pageIndex + 1 || ''}
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
                                  className="font-normal"
                                >
                                  {data.amount || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data.count || ""}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <IconButton 
                                variant="text"
                                color="red"
                                onClick={() => handleDeleteRowEtc(index)}
                                className=""
                                >
                                  <AiFillDelete className="h-4 w-4 " />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                      <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        ก่อนหน้า
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <IconButton
                            key={i}
                            variant="outlined"
                            size="sm"
                            onClick={() => setCurrentPage(i + 1)}
                            className={
                              currentPage === i + 1
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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        ถัดไป
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="mt-3 flex w-full justify-center">
                    <p>ยังไม่มีข้อมูลการเลือกวัตถุมงคล</p>
                  </div>
                )}
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleCloseViewEtcDialog}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                {/* <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button> */}
              </DialogFooter>
            </Dialog>


            {/* ----  View EditPrice อันดับ 1 -------------- */}

            <Dialog
              open={openViewEditPriceDialog}
              size={dialogSizeViewEditPrice}
              handler={handleCloseViewEditPriceDialog}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-auto lg:h-auto"
            >
              <DialogHeader className="bg-blue-700  text-center text-base  text-white opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">แก้ไขราคา</Typography>
                </div>
              </DialogHeader>
              <DialogBody>
                  <div className="flex flex-col w-full justify-center mt-5 items-center gap-5">
                  <div className="flex w-full  justify-center gap-3   items-center ">
                    <Typography>แก้ไขผู้บริจาค:</Typography>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="แก้ไขผู้บริจาค"
                      className=" focus:shadow-outline    appearance-none rounded border  border-gray-400 p-1  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                      value={dataViewEditPrice? dataViewEditPrice?.user_auction : ''}
                      id="search6"
                      list="option"
                      onChange={(e) => setDataViewEditPrice({
                        ...dataViewEditPrice,
                        user_auction:e.target.value
                      })}
                      
                    />
                  </div>
                  <div className="flex w-full  justify-center gap-3   items-center ">
                    <Typography>แก้ไขราคา:</Typography>
                    <input
                      type="number"
                      autoComplete="off"
                      min="0"
                      size="sm"
                      id="editPrice"
                      placeholder="ใส่ราคาที่ต้องการแก้ไข"
                       className=" focus:shadow-outline    appearance-none rounded border  border-gray-400 p-1  px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                       value={editValue || ''}
                       onChange={(e)=> {
                         handleEditChange(e);
                         setSelectedEditPrice2(e.target.value)
                       }}
                    />
                  </div>
                  {messageEdit && <div className=" flex w-full justify-center mt-5   text-red-500">{messageEdit}</div>}
                  </div>
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleCloseViewEditPriceDialog}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  disabled={messageEdit}
                  className=" flex items-center align-middle text-base"
                  onClick={()=> (
                    handleSendDataEDitAuction() , 
                    editCustomer()
                    )}
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  อัพเดท
                </Button>
                {/* <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button> */}
              </DialogFooter>
            </Dialog>


            {/* ----  View Edit ชื่อ อันดับ 2 และ 3 -------------- */}

            <Dialog
              open={openViewEditPriceDialog2}
              size={dialogSizeViewEditPrice2}
              handler={handleCloseViewEditPriceDialog2}
              className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-auto lg:h-auto"
            >
              <DialogHeader className="bg-blue-700  text-center text-base  text-white opacity-80">
                <div className="flex gap-3">
                  <Typography className="text-xl">แก้ไขชื่อผู้บริจาค</Typography>
                </div>
              </DialogHeader>
              <DialogBody>
                  <div className="flex flex-col w-full justify-center mt-5 items-center">
                  <div className="mt-3 flex flex-col items-center  gap-3 sm:flex-row ">
                <div>
                  <Typography className="flex w-[60px] text-sm">
                    ผู้บริจาค:
                  </Typography>
                </div>
                <div className="flex items-center justify-center align-middle">
                  <div className="relative flex w-[200px] justify-center">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="แก้ไขผู้บริจาค"
                      value={dataEditName? dataEditName?.user_auction : ''}
                      // value={searchText6? searchText6 : ''}
                      id="search6"
                      list="option"
                      onChange={(e) => setDataEditName({
                        ...dataEditName,
                        user_auction:e.target.value
                      })}
                      
                    />
                    
                  </div>
                </div>
                {/* <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                  <IconButton
                    color="green"
                    // variant="outlined"
                    size="md"
                    className=" rounded-full border-4 "
                    onClick={createNewCustomer}
                    disabled={customerId && senddata.length < 2 }
                    // onClick={() => createNewCustomer(senddata)}
                  >
                    <AiOutlinePlus className="text-2xl" />
                  </IconButton>
                </div> */}
              </div>
                  {/* {messageEdit && <div className=" flex w-full justify-center mt-5   text-red-500">{messageEdit}</div>} */}
                  </div>
              </DialogBody>
              <DialogFooter className="  mt-[10px] flex justify-center sm:mt-[20px] md:mt-[20px] md:justify-end">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleCloseViewEditPriceDialog2}
                  className="mr-1  flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <GiCancel />
                  </span>
                  ยกเลิก
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                  onClick={editCustomer}
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  อัพเดท
                </Button>
                {/* <Button
                  variant="gradient"
                  color="green"
                  className=" flex items-center align-middle text-base"
                >
                  <span className="mr-2 flex text-xl">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button> */}
              </DialogFooter>
            </Dialog>
          </Card>
        </div>
        {/* content right  */}
        <div className="flex w-full flex-col  lg:w-[40%] ">
          {/* content  ประมูล  */}
          <div>
            <Card className=" h-[500px]   w-full overflow-scroll px-5">
              <div className="mt-5 flex flex-col items-center gap-5  ">
                <table className="w-full min-w-max table-auto text-center">
                  <thead>
                    <tr>
                      <th className=" w-[20px] border-y border-blue-gray-100 bg-blue-gray-50/50 ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-baseleading-none opacity-70"
                        >
                          ลำดับ
                        </Typography>
                      </th>
                      <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          ผู้บริจาค
                        </Typography>
                      </th>
                      <th className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          จำนวนเงิน
                        </Typography>
                      </th>
                      <th className="w-[20px] border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          แก้ไข
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listShowTop.map((data, index) => {
                      const isFirst = index === 0;
                      const isLast = index === displayedData.length - 1;
                      const pageIndex = startIndex + index;
                      const classes = isLast
                        ? "ps-1"
                        : "p-1 border-b border-blue-gray-50";
                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center justify-center">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {pageIndex + 1 || ''}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data.user_auction || ''}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.auction_result_price.toLocaleString() || ''}
                            </Typography>
                          </td>
                          {isFirst ? (
                          <td className={classes}>
                            <IconButton
                            onClick={()=>handleEditPrice(data)} 
                            variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </td>
                          )
                          :
                          (
                            <td className={classes}>
                            <IconButton
                            onClick={()=>handleEditPrice2(data)} 
                            variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </td>
                          )
                        }    

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-col items-center  gap-3 sm:flex-row ">
                <div>
                  <Typography className="flex w-[60px] text-sm">
                    ผู้บริจาค:
                  </Typography>
                </div>
                <div className="flex items-center justify-center align-middle">
                  <div className="relative flex w-[200px] justify-center">
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="เลือกผู้บริจาค"
                      value={searchText6? searchText6 : ''}
                      // value={searchText6? searchText6 : ''}
                      id="search6"
                      list="option"
                      onChange={(e) => handleSearch6(e.target.value)}
                      className=" w-full rounded border border-gray-400  p-1 text-sm text-gray-600 focus:border-blue-500 focus:outline-none"
                      onFocus={() => setIsOpen6(true)} // แสดงเมื่อ Input ค้นหา active
                      onBlur={() => setTimeout(() => setIsOpen6(false), 300)}
                    />
                    {isOpen6 && (
                      <div
                        className="border-1 absolute top-full left-0 z-20 mt-2 w-[200px] overflow-scroll border-gray-300"
                        style={{ backgroundColor: "#fff" }}
                      >
                        {filteredOptions6.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleSelect6(option)}
                            className="cursor-pointer p-2 text-sm hover:bg-blue-200 "
                          >
                            {option.customer_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-auto justify-center border-green-500 text-center sm:justify-start">
                  <IconButton
                    color="green"
                    // variant="outlined"
                    size="md"
                    className=" rounded-full border-4 "
                    onClick={createNewCustomer}
                    disabled={customerId && senddata.length < 2 }
                    // onClick={() => createNewCustomer(senddata)}
                  >
                    <AiOutlinePlus className="text-2xl" />
                  </IconButton>
                </div>
              </div>
              <div className="mt-2 flex flex-col  items-center   justify-center  gap-3  sm:flex-row sm:justify-start">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <Typography className="text-sm ">ที่เลือก:</Typography>
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <Typography className="font-bold text-blue-500">
                      {/* {searchText6 || ''} */}
                      {showName || ''}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-col  items-center   justify-center  gap-3  sm:flex-row sm:justify-start">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <Typography className="text-sm ">จำนวนเงิน:</Typography>
                  </div>
                  <div className="flex w-auto justify-center gap-3 text-center sm:justify-start">
                    <input
                      type="number"
                      min="0"
                      id="search6Price"
                      autoComplete="off"
                      value={value || ''}
                      onChange={(e)=> {
                        handleChange(e);
                        setSelectedPrice(e.target.value)
                      }}
                      className=" focus:shadow-outline  w-[100px] appearance-none rounded  border border-gray-400 px-3 leading-tight text-gray-700 shadow focus:border-blue-500 focus:outline-none"
                    />
                    <Typography className="flex  items-center  ">
                      บาท
                    </Typography>
                  </div>
                </div>
              </div>
                  {message && <div className=" flex justify-center text-red-500">{message}</div>}
              <div className="mt-2 flex flex-col  items-center   justify-center    sm:flex-row sm:justify-end">
                <Button
                  size="sm"
                  variant="gradient"
                  color="green"
                  disabled={message}
                  className=" flex items-center align-middle text-sm"
                  onClick={()=>handleSendDataAuction()}
                >
                  <span className="mr-2 flex text-base">
                    <IoIosSave />
                  </span>
                  บันทึก
                </Button>
              </div>
            </Card>
          </div>
          {/* content จบการประมูล */}
          <div>
            <Card className="mt-5 h-[170px] flex justify-center  w-full overflow-scroll px-5">
              <div className="mt-2 flex flex-col  items-center   justify-center  gap-3  sm:flex-row sm:justify-start">
                <div className="flex items-center gap-3">
                  <div className="flex w-auto justify-center text-center sm:justify-start">
                    <Typography className="text-sm ">จบการประมูล:</Typography>
                  </div>
                </div>
              </div>
                 <div className="mt-5 flex flex-col  items-center   justify-center  gap-3  ">
                 <div className="flex items-center gap-3">
                   <IconButton
                   disabled={activeButton == 4}
                     className={`h-12 w-12 rounded-full ${
                       activeButton === 1 ? "bg-red-600" : "bg-black"
                     }`}
                     onClick={() => handleButtonClick(1)}
                   >
                     {activeButton === 1 ? (
                       <i className="fa-regular fa-bell fa-shake fa-2xl"></i>
                     ) : (
                       <i className="fa-solid fa-circle-1  fa-2xl">1</i>
                     )}
                   </IconButton>
                   <IconButton
                   disabled={activeButton == 4}
                     className={`h-12 w-12 rounded-full ${
                       activeButton === 2 ? "bg-red-600" : "bg-black"
                     }`}
                     onClick={() => handleButtonClick(2)}
                   >
                     {activeButton === 2 ? (
                       <i className="fa-regular fa-bell fa-shake fa-2xl"></i>
                     ) : (
                       <i className="fa-solid fa-circle-1  fa-2xl">2</i>
                     )}
                   </IconButton>
                   <IconButton
                   disabled={activeButton == 4}
                     className={`h-12 w-12 rounded-full ${
                       activeButton === 3 ? "bg-red-600" : "bg-black"
                     }`}
                     onClick={() => handleButtonClick(3)}
                   >
                     {activeButton === 3 ? (
                       <i className="fa-regular fa-bell fa-shake fa-2xl"></i>
                     ) : (
                       <i className="fa-solid fa-circle-1 fa-2xl">3</i>
                     )}
                   </IconButton>
                 </div>
               </div>
     
              <div className="mt-5 flex w-full  flex-col mb-5   justify-center sm:flex-row gap-3 ">
                 <Button
                 size="sm"
                 color="red"
                 className="flex w-[130px] text-sm  "
                 onClick={() => handleButtonClick(0)}
                 disabled={activeButton == 4}
               >
                 <span className=" flex w-full text-sm justify-center ">
                   รีเซ็ท 1-2-3
                 </span>
               </Button>
           
                    <Button
                      size="sm"
                      variant="gradient"
                      color="blue"
                      disabled={activeButton == 4}
                      className="flex w-[130px] text-sm "
                      onClick={() => handleButtonClick(4)}
                    >
                      <span className="mr-2 flex text-base">
                        <IoIosSave />
                      </span>
                      โชวคนชนะ
                    </Button>
            
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auctions;
