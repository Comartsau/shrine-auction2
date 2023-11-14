import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsPersonCircle } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { FaSearchPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Card,
  Typography,
  Button,
  CardFooter,
  IconButton,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";


export function Auctioneer() {
  const [listData,setListData] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [noData,setNoData] = useState(true)
  
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerAddress, setNewCustomerAddress] = useState("");
  const [newCustomerDelivery, setNewCustomerDelivery] = useState("");
  const [newCustomerContract, setNewCustomerContract] = useState("");
  const [newCustomerTel, setNewCustomerTel] = useState("");
  const [newCustomerNoun, setNewCustomerNoun] = useState("");
  const [newCustomerNumber, setNewCustomerNumber] = useState("");
  const [newCustomerLine, setNewCustomerLine] = useState("");


  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  
  const handleOpenCreate = () => setOpen(!open);
  const handleOpenEdit = () => setOpen1(!open1);


  // ---------  ดูข้อมูลข้อมูล -------------- //
  const [selectedViewData, setSelectedViewData] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  // ----------------------------------------- //
  // ---------  แก้ไขข้อมูล -------------- //
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // ----------------------------------------- //


  //  ----  control size Dialog ----------------------- // 
  const [dialogSizeCreate, setDialogSizeCreate] = useState("xl");
  const [dialogSizeView, setDialogSizeView] = useState("xl");
  const [dialogSizeEdit, setDialogSizeEdit] = useState("xl");

  // ---------  Token ------------------------ //
  const Token = localStorage.getItem("token");


  // --------- เก็บข้อมูล / เปิด Dialog ------------- //

  const handleViewClick = (data) => {
    setSelectedViewData(data);
    setOpenViewDialog(true);
  };

  const handleEditClick = (data) => {
    setSelectedEditData(data);
    setOpenEditDialog(true);
  };


   // --------- clear ข้อมูล / ปิด Dialog ------------- //
   const handleCloseViewDialog = () => {
    setSelectedViewData(null);
    setOpenViewDialog(false);
  };

  const handleCloseEditDialog = () => {
    setSelectedEditData(null);
    setOpenEditDialog(false);
  };

    // ---------  ปรับแต่งขนาด  Dialog ------------ //

    const checkScreenSize = () => {
      if (window.innerWidth < 540) {
        setDialogSizeCreate("xl"); // หรือเปลี่ยนเป็น "lg" หรือ "md" ตามความต้องการ
        setDialogSizeView("xl"); // หรือเปลี่ยนเป็น "lg" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("xl"); // หรือเปลี่ยนเป็น "lg" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 720) {
        setDialogSizeCreate("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeView("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 960) {
        setDialogSizeCreate("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeView("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 1140) {
        setDialogSizeCreate("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeView("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 1320) {
        setDialogSizeCreate("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeView("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else {
        setDialogSizeCreate("lg"); // หรือเปลี่ยนเป็น "lg" หรือ "xl" ตามความต้องการ
        setDialogSizeView("lg"); // หรือเปลี่ยนเป็น "lg" หรือ "xl" ตามความต้องการ
        setDialogSizeEdit("lg"); // หรือเปลี่ยนเป็น "lg" หรือ "xl" ตามความต้องการ
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
  


  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

 
//---------- แสดงข้อมูลในตาราง --------------- // 
  const fetchData = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/Customer`;
  
      if (searchQuery) {
        url = `${import.meta.env.VITE_APP_API}/Customer/?search=${searchQuery}`;
      }
  
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response.data)
      setListData(response.data);
      setNoData(false)
    } catch (error) {
      console.error(error);
      setNoData(true)
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [searchQuery]);
  
  // ------------------------------------------------------------------------- //


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
  

  //-------------- เพิ่ม ผู้บริจาค ------------------- //
  
  const  createNewCustomer = async () => {
    handleOpenCreate()
    try {
      const data = {
        customer_name: newCustomerName,
        customer_address: newCustomerAddress,
        customer_delivery: newCustomerDelivery,
        customer_contract: newCustomerContract,
        customer_tel: newCustomerTel,
        customer_noun: newCustomerNoun,
        customer_number: newCustomerNumber,
      }

      // console.log(data)
      const response = await axios.post(`${import.meta.env.VITE_APP_API}/Customer`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response)
      setNewCustomerName(""); 
      setNewCustomerAddress(""); 
      setNewCustomerDelivery(""); 
      setNewCustomerContract(""); 
      setNewCustomerTel(""); 
      setNewCustomerNoun(""); 
      setNewCustomerNumber(""); 
      checkScreenSize();
      await fetchData()
      Swal.fire({
        icon: 'success',
        title: 'เพิ่มผู้บริจาคเรียบร้อย',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      checkScreenSize();
      console.error("ไม่สามารถเพิ่มหัวข้อประมูลได้", error);
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มผู้บริจาคไม่สำเร็จ ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
    }
  }

  //  ------ ดูรายละเอียดผู้บริจาค ----------- //

  const viewCustomer = async () => {
    
    if (!selectedEditData) {
      console.error("No data selected for editing.");
      return;
    }

    // console.log(data)

  }


  // ------  แก้ไขผู้บริจาค ------------- //
  const editCustomer = async () => {
    handleCloseEditDialog();
    try {
      if (!selectedEditData) {
        console.error("No data selected for editing.");
        return;
      }

      // console.log(selectedEditData)
      const data = {
      customer_name:selectedEditData.customer_name,
      customer_address:selectedEditData.customer_address,
      customer_delivery:selectedEditData.customer_delivery,
      customer_contract:selectedEditData.customer_contract,
      customer_tel:selectedEditData.customer_tel,
      customer_noun:selectedEditData.customer_noun,
      customer_number:selectedEditData.customer_number,
      customer_line:"aaaa"
      };
      // console.log(data)
      // console.log(selectedEditData.id)
      // console.log(Token)
  
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API}/Customer/${selectedEditData.id}/edit`,
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
  

  // -------------------------------------------------- //
  // -----  ลบ ผู้บริจาค  ------------------------//

  const  deleteCustomer = async  (data) => {

    const id = data.id

    // console.log(data)
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_APP_API}/Customer/${id}/delete`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${Token}`,
              },
            }
          );
          // console.log(response)
          await fetchData();
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'ลบผู้บริจาคเรียบร้อย',
            showConfirmButton: false,
            timer: 1500
          })
          
        } catch (error) {
          console.error("ไม่สามารถลบผู้บริจาคได้", error);
          Swal.fire({
            icon: 'error',
            title: 'ลบผู้บริจาคไม่สำเร็จ ',
            text: 'กรุณาลองใหม่อีกครั้ง',
            confirmButtonText: 'ตกลง',
          });
        }
  }

  // ----  ออก excel ----------------------------------- //

  const exportToExcel = async () => {
    try {
      // console.log(searchData)
      // console.log(searchQuery)

      const url = `${import.meta.env.VITE_APP_API}/Customer-Excel/?search=${searchQuery}`;
  
      // ตรวจสอบว่ามี Token หรือไม่
      const Token = localStorage.getItem("token");
      if (!Token) {
        throw new Error("Token not found.");
      }
  
      // ส่งคำขอไปยัง API โดยใส่ Token ใน Header
      const response = await axios.get(url, {
        responseType: 'blob', // ระบุ responseType เป็น 'blob'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Reports.xlsx'; // ตั้งชื่อไฟล์ที่จะดาวน์โหลด
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      Swal.fire({
        icon: 'error',
        title: 'ออก Excel ไม่สำเร็จ ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
    }
  };

  return (
    <div>
      {/* <p>ข้อมูลผู้บริจาค</p> */}
      <div className="flex flex-col md:flex-row justify-between gap-9 mt-3 mx-3  ">
      <div className="flex justify-center w-full">
      <Input
        type="text"
        label="ค้นหาด้วยชื่อหรือรหัสผู้บริจาค"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
      <div className="flex justify-center  ">
        <Button
        fullWidth
        className="text-base flex justify-center align-middle items-center w-[200px] md:w-[200px] lg:ml-[100px]"
        onClick={handleOpenCreate}
        >
        <span className="mr-2 text-xl"><BsPersonCircle /></span>
          เพิ่มผู้บริจาค
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
        fullWidth
        className="text-base flex justify-center align-middle items-center w-[200px] md:w-[120px] lg:w-[180px]     bg-green-500"
        onClick={exportToExcel}
        >
          <span className="mr-2 text-xl"><SiMicrosoftexcel/></span>
          Excel
        </Button>
      </div>
      </div>
  
      </div>

      {/* ---------------- Modal Create ----------------------------------- */}
      <Dialog open={open}
      size={dialogSizeCreate}
       handler={handleOpenCreate}
       className="custom-dialog  h-[600px]  xl:h-[480px] overflow-scroll "
       >
        <DialogHeader className="text-base text-white  justify-center bg-blue-600 opacity-80">
          <div>
          เพิ่มผู้บริจาค
          </div>
        </DialogHeader>
        <div>
        <DialogBody divider className="px-5 sm:px-12 md:px-28 lg:px-15 xl:px-5  ">
          <div className="flex w-full flex-col gap-4 ">
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-[120px] md:w-[120px] xl:w-25 sm:mr-5 xl:mr-0">ชื่อผู้บริจาค:</Typography>
            </div>
            <div className="mt-3 sm:mt-0 md:w-[300px] " >
            <Input
              type="text"
              label="ชื่อผู้บริจาค"
              maxLength="45"
              value={newCustomerName}
              onChange={(e) => setNewCustomerName(e.target.value)}
              className="w-full "
            />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center ">
            <div>
            <Typography className="sm:w-[120px] md:w-[120px] xl:w-25 sm:mr-5 xl:mr-0">ที่อยู่ผู้บริจาค:</Typography>
            </div>
            <div className="mt-3 sm:mt-0 xl:w-full md:w-[300px] " >
            <Input
              type="text"
              label="ที่อยู่ผู้บริจาค"
              maxLength="60"
              value={newCustomerAddress}
              onChange={(e) => setNewCustomerAddress(e.target.value)}
              className="w-full  "
            />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div >
            <Typography className="sm:w-[120px] md:w-[120px] xl:w-25 sm:mr-5 xl:mr-0">สถานที่จัดส่ง:</Typography>
            </div>
            <div className="mt-3 sm:mt-0 xl:w-full md:w-[300px] " >
            <Input
              type="text"
              label="สถานที่จัดส่ง"
              maxLength="60"
              value={newCustomerDelivery}
              onChange={(e) => setNewCustomerDelivery(e.target.value)}
              className="w-full "
            />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-4 xl:justify-between">
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-[120px] md:w-[120px] xl:w-25 sm:mr-5 xl:mr-0">ผู้ติดต่อ:</Typography>
            </div>
            <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]" >
            <Input
              type="text"
              label="ผู้ติดต่อ"
              maxLength="50"
              value={newCustomerContract}
              onChange={(e) => setNewCustomerContract(e.target.value)}
              className="w-full  "
            />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-[130px] md:w-[130px] xl:w-[130px] sm:mr-5 xl:mr-0">ออกฉลากในนาม:</Typography>
            </div>
            <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]" >
            <Input
              type="text"
              label="ออกฉลากในนาม"
              value={newCustomerNoun}
              maxLength="45"
              onChange={(e) => setNewCustomerNoun(e.target.value)}
              className="w-full "
            />
            </div>
          </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-4 xl:justify-between">
          <div className="flex flex-col sm:flex-row items-center ">
            <div>
            <Typography className="sm:w-[120px] md:w-[120px] xl:w-25 sm:mr-5 xl:mr-0">เบอร์โทรศัพท์:</Typography>
            </div>
            <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]" >
            <Input
              type="text"
              label="เบอร์โทรศัพท์"
              maxLength="20"
              value={newCustomerTel}
              onChange={(e) => setNewCustomerTel(e.target.value)}
              className="w-full "
            />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-[120px] md:w-[120px] xl:w-[100px] sm:mr-5">เลขอ้างอิง:</Typography>
            </div>
            <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px] 2xl:w-[250px]" >
            <Input
              type="text"
              label="เลขอ้างอิง"
              maxLength="20"
              value={newCustomerNumber}
              onChange={(e) => setNewCustomerNumber(e.target.value)}
              className="w-full "
            />
            </div>
          </div>
          </div>
          </div>
  </DialogBody>
  <DialogFooter className=" flex justify-center xl:justify-end mt-[10px] gap-5  ">
    <Button variant="gradient" color="red" onClick={handleOpenCreate} className=" flex  text-base align-middle items-center">
    <span className="flex text-xl mr-2"><GiCancel/></span>
      ยกเลิก
    </Button>
    <Button variant="gradient" color="green" onClick={createNewCustomer} className=" text-base flex align-middle items-center">
      <span className="flex text-xl mr-2"><IoIosSave/></span>
      บันทึก
    </Button>
  </DialogFooter>
        </div>
      </Dialog>


      {/* ---------------- Modal View ----------------------------------- */}
          <Dialog 
       open={openViewDialog}
       size={dialogSizeView}
       handler={handleCloseViewDialog}
       className="overflow-scroll h-[520px] sm:h-[450px] md:h-auto  lg:h-auto custom-dialog"
       >
        <DialogHeader className="text-base  text-white text-center  bg-blue-700 opacity-80">
          <div className="flex gap-3">
          <Typography className="text-xl">ข้อมูลผู้บริจาค</Typography>
           <Typography className="text-xl">{selectedViewData?.customer_name || ""}</Typography> 
          </div>
          
        </DialogHeader>
        <DialogBody divider className="px-5 sm:px-[30px] md:px-[60px] lg:px-[80px] xl:px-[40px]">
          <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-5">
            <div className="flex flex-col sm:flex-row">
            <div>
            <Typography className="sm:w-[110px] text-center sm:text-left font-bold">รหัสผู้บริจาค:</Typography>
            </div>
            <div>
            <Typography className="text-center  sm:text-left">{selectedViewData?.customer_code || ""}</Typography>
            </div>
            </div>
            <div className="flex flex-col sm:flex-row">
            <div>
            <Typography className="sm:w-[90px] text-center sm:text-left font-bold">ชื่อผู้บริจาค:</Typography>
            </div>
            <div>
            <Typography className=" text-center sm:text-left  px-3">{selectedViewData?.customer_name || ""}</Typography>
            </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-10">
            <div className="flex flex-col md:flex-row w-full  gap-2">
            <div className="flex justify-center md:justify-start">
            <Typography className="sm:w-[100px]  text-center  font-bold">ที่อยู่ผู้บริจาค:</Typography>
            </div>
            <div>
            <Typography className="text-center md:text-left  px-5">{selectedViewData?.customer_address || ""}</Typography>
            </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-10">
            <div className="flex flex-col md:flex-row w-full">
            <div className="flex justify-center  sm:justify-center">
            <Typography className="sm:w-[110px] text-center sm:text-left font-bold">สถานที่จัดส่ง:</Typography>
            </div>
            <div>
            <Typography className="text-center md:text-left  px-5">{selectedViewData?.customer_delivery || ""}</Typography>
            </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-5">
            <div className="flex flex-col md:flex-row">
            <div className="flex justify-center  sm:justify-center">
            <Typography className="sm:w-[70px] text-center sm:text-left font-bold">ผู้ติดต่อ:</Typography>
            </div>
            <div>
            <Typography className="text-center  sm:text-left  px-5">{selectedViewData?.customer_contract || ""}</Typography>
            </div>
            </div>
            <div className="flex flex-col md:flex-row">
            <div className="flex justify-center  sm:justify-center">
            <Typography className="sm:w-[135px] text-center sm:text-left font-bold">ออกฉลากในนาม:</Typography>
            </div>
            <div>
            <Typography className=" text-center md:text-left  px-5">{selectedViewData?.customer_noun || ""}</Typography>
            </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-5">
            <div className="flex flex-col md:flex-row">
            <div className="flex justify-center  sm:justify-center">
            <Typography className="sm:w-[80px] text-center md:text-left font-bold">โทรศัพท์:</Typography>
            </div>
            <div>
            <Typography className="text-center  md:text-left  px-5">{selectedViewData?.customer_tel || ""}</Typography>
            </div>
            </div>
            <div className="flex flex-col md:flex-row">
            <div className="flex justify-center  sm:justify-center">
            <Typography className="sm:w-[100px] text-center md:text-left font-bold">เลขที่อ้างอิง:</Typography>
            </div>
            <div>
            <Typography className=" text-center md:text-left px-5">{selectedViewData?.customer_number || ""}</Typography>
            </div>
            </div>
          </div>
          </div>
  </DialogBody>
  <DialogFooter className="  flex justify-center md:justify-end mt-[10px] sm:mt-[20px] md:mt-[20px]">
    <Button variant="gradient" color="red" onClick={handleCloseViewDialog} className="mr-1  text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><GiCancel/></span>
      ยกเลิก
    </Button>
    {/* <Button variant="gradient" color="green" onClick={viewCustomer} className=" text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><IoIosSave/></span>
      บันทึก
    </Button> */}
  </DialogFooter>
      </Dialog>
      {/* ---------------- Modal Edit ----------------------------------- */}
          <Dialog 
       open={openEditDialog}
       size={dialogSizeEdit}
       handler={handleCloseEditDialog}
       className="overflow-scroll h-[520px] sm:h-[600px] md:h-[600px] lg:h-[500px] custom-dialog"
       >
        <DialogHeader className="text-base  text-white text-center   bg-blue-700 opacity-80">
          <div className="flex gap-3 ">
            <Typography className="text-xl">แก้ไขผู้บริจาค</Typography>
            <Typography className="text-xl">{selectedEditData?.customer_name || ""}</Typography>
          </div>
        </DialogHeader>
        <DialogBody divider className="px-20 lg:px-[90px] xl:px-[40px] 2xl:px-[150px] sm:px-5">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col lg:flex-row mt-3 gap-3 md:gap-3">
            <div className="flex justify-center flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-[99px] font-bold">รหัสผู้บริจาค:</Typography>
            </div>
            <div>
            <Typography className="sm:w-[100px]">{selectedEditData?.customer_code || ""}</Typography>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="">
            <Typography className="sm:w-[95px] font-bold">ชื่อผู้บริจาค:</Typography>
            </div>
            <div className="flex justify-center mt-3 w-full md:w-[200px]">
            <Input
              type="text"
              label="ชื่อผู้บริจาค"
              maxLength="100"
              value={selectedEditData?.customer_name || ""}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  customer_name: e.target.value,
                })
              }
              className="flex"
            />
            </div>
          </div>
            </div>
            <div className="flex flex-col md:flex-row w-full items-center sm:mt-0">
            <div className="flex justify-center ">
            <Typography className=" flex md:w-[110px]  font-bold">ที่อยู่ผู้บริจาค:</Typography>
            </div>
            <div className="flex justify-center w-full md:w-[400px] lg:w-[450px]  mt-3 md:mt-0">
            <Input
              type="text"
              label="ที่อยู่ผู้บริจาค"
              maxLength="60"
              value={selectedEditData?.customer_address || ""}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  customer_address: e.target.value,
                })
              }
              className="flex  "
            />
            </div>
            </div>
            <div className="flex flex-col md:flex-row w-full items-center sm:mt-0">
            <div className="flex justify-center  ">
            <Typography className=" flex md:w-[110px]  font-bold">สถานที่จัดส่ง:</Typography>
            </div>
            <div className="flex justify-center w-full md:w-[400px] lg:w-[450px]  mt-3 md:mt-0">
            <Input
              type="text"
              label="สถานที่จัดส่ง"
              maxLength="60"
              value={selectedEditData?.customer_delivery || ""}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  customer_delivery: e.target.value,
                })
              }
              className="flex  "
            />
            </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 md:gap-3">
            <div className="flex justify-center md:justify-start flex-col md:flex-row  items-center">
            <div>
            <Typography className="sm:w-[70px] md:w-[110px] lg:w-[70px] font-bold">ผู้ติดต่อ:</Typography>
            </div>
            <div className="flex justify-center  mt-3 sm:mt-0 w-full md:w-[200px]">
            <Input
              type="text"
              label="ผู้ติดต่อ"
              maxLength="50"
              value={selectedEditData?.customer_contract || ""}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  customer_contract: e.target.value,
                })
              }
              className="flex"
            />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center ">
            <div className="">
            <Typography className="sm:w-[140px] font-bold">ออกฉลากในนาม:</Typography>
            </div>
            <div className="flex justify-center mt-3 sm:mt-0 w-full md:w-[200px]">
            <Input
              type="text"
              label="ออกฉลากในนาม"
              maxLength="45"
              value={selectedEditData?.customer_noun || ""}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  customer_noun: e.target.value,
                })
              }
              className="flex"
            />
            </div>
          </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 md:gap-3">
            <div className="flex justify-center md:justify-start flex-col md:flex-row  items-center">
            <div>
            <Typography className="sm:w-[70px] md:w-[110px] lg:w-[70px] font-bold">โทรศัพท์:</Typography>
            </div>
            <div className="flex justify-center  mt-3 sm:mt-0 w-full md:w-[200px]">
            <Input
              type="text"
              label="โทรศัพท์"
              maxLength="20"
              value={selectedEditData?.customer_tel || ""}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  customer_tel: e.target.value,
                })
              }
              className="flex"
            />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center ">
            <div className="">
            <Typography className="sm:w-[140px] font-bold">เลขที่อ้างอิง:</Typography>
            </div>
            <div className="flex justify-center mt-3 sm:mt-0 w-full md:w-[200px]">
            <Input
              type="text"
              label="เลขที่อ้างอิง"
              maxLength="10"
              value={selectedEditData?.customer_number || ""}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  customer_number: e.target.value,
                })
              }
              className="flex"
            />
            </div>
          </div>
            </div>
          </div>
  </DialogBody>
  <DialogFooter className=" flex justify-center  lg:justify-end mt-[10px] sm:mt-[10px]">
    <Button variant="gradient" color="red" onClick={handleCloseEditDialog} className="mr-1  text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><GiCancel/></span>
      ยกเลิก
    </Button>
    <Button variant="gradient" color="green" onClick={editCustomer} className=" text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><IoIosSave/></span>
      อัพเดท
    </Button>
  </DialogFooter>
      </Dialog>

      {/* ------------------------------------------------------------- */}


      {/* ------------ table  ----------------------------------------- */}

      <Card className="h-full w-full overflow-scroll mt-5">
        <table className="w-full min-w-max table-auto text-left">
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
                    รหัส
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
                    ผู้บริจาค
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
                    เบอร์โทรศัพท์
                  </Typography>
                </th>
                <th
                  // key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex font-normal leading-none opacity-70 justify-end"
                  >
                    รายละเอียด
                  </Typography>
                </th>
                <th
                  // key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 text-center"
                  >
                    แก้ไข
                  </Typography>
                </th>
            </tr>
          </thead>
          {noData ? (
            <tbody >
              <tr >
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Typography>...ไม่พบข้อมูล...</Typography>
                </td>
              </tr>
            </tbody>
          ) : (
          <tbody >
            {displayedData.map((data,index,) => {
                const isLast = index === displayedData.length - 1;
                const pageIndex = startIndex + index;
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
                        {data.customer_code || ''}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {data.customer_name || ''}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {data.customer_tel || ''}
                      </Typography>
                    </td>
                    <td className={classes} >
                      <div className="flex justify-end">
                        <IconButton 
                        variant="text"
                        onClick={() => handleViewClick(data)}
                        className="ml-3 "
                        >
                          <FaSearchPlus className="h-4 w-4 " />
                        </IconButton>
                      </div>
          
                    </td>
                    <td className={classes}>
                      <div className="flex justify-center  ">
                        <div >
                        <IconButton 
                        variant="text"
                        onClick={() => handleEditClick(data)}
                      
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>  
                        </div>
                        <div>
                        <IconButton 
                        variant="text"
                        onClick={() => deleteCustomer(data)}
                        >
                          <AiFillDelete className="h-4 w-4" />
                        </IconButton>
                        </div>
                      </div>
                  
                   
                 
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
          )}
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
                className={currentPage === i + 1 ? "bg-blue-500 text-white" : ""}
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
 
    </div>
  )
}
export  default Auctioneer