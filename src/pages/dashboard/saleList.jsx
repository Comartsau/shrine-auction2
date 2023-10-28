import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdSearch } from "react-icons/md";
import { TfiPrinter } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";

import THBText from 'thai-baht-text'
import { PDFViewer } from "@react-pdf/renderer";
import { ReceiveSale } from "./ReceiveSale";

import EditSale_Cart from "../dashboard/edit/EditSale_cart";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";
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
import { tr } from "date-fns/locale";

import Sale from './sale'
import { Link } from "react-router-dom";

export function SaleList() {
  const [listData, setListData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noData, setNoData] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);
  const [thbText, setThbText] = useState('');

  const [billData,setBillData] = useState([])


  const [startDateExcel, setStartDateExcel] = useState(new Date());
  const [endDateExcel, setEndDateExcel] = useState(new Date());

  const [openEditSale,setOpenEditSale] = useState(false)
  const [idAuctionReport,setIdAuctionReport] = useState('')


  // ---------  Token ------------------------ //
  const Token = localStorage.getItem("token");

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
      let url = ''
      if ( (startDateExcel && endDateExcel) || searchQuery ) {
        // console.log(startDateExcel);
        const formattedStartDate = formatDate1(startDateExcel, "YYYY-MM-DD");
        const formattedEndDate = formatDate1(endDateExcel, "YYYY-MM-DD");
        // console.log(formattedStartDate);
        // console.log(formattedEndDate);
         url = `${import.meta.env.VITE_APP_API}/Debtor?type_Data=2&receipt_number=${searchQuery}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
        
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      console.log(response.data)
      setListData(response.data);
      setNoData(false);

    } catch (error) {
      console.error(error);
      setNoData(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery,startDateExcel,
    endDateExcel,]);

  //------------- แปลง วันที่ ------------------------------------- //

  function formatDate(dateString, format) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      return ""; // หรือค่า default ที่คุณต้องการ
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  function formatDate1(dateString, format) {
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
    // return `${year}-${month}-${day}`;
    return `${year}-${month}-${day}`;
  }

  // ----  ออก excel ----------------------------------- //

  // const exportToExcel = async () => {
  //   try {
  //     // console.log(searchData)
  //     // console.log(searchQuery)

  //     const url = `${
  //       import.meta.env.VITE_APP_API
  //     }/Customer-Excel/?search=${searchQuery}`;

  //     // ตรวจสอบว่ามี Token หรือไม่
  //     const Token = localStorage.getItem("token");
  //     if (!Token) {
  //       throw new Error("Token not found.");
  //     }

  //     // ส่งคำขอไปยัง API โดยใส่ Token ใน Header
  //     const response = await axios.get(url, {
  //       responseType: "blob", // ระบุ responseType เป็น 'blob'
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${Token}`,
  //       },
  //     });
  //     const blob = new Blob([response.data], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     const downloadUrl = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = "Reports_Auction_Title.xlsx"; // ตั้งชื่อไฟล์ที่จะดาวน์โหลด
  //     link.click();
  //     URL.revokeObjectURL(downloadUrl);
  //   } catch (error) {
  //     console.error("Error exporting to Excel:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "ออก Excel ไม่สำเร็จ ",
  //       text: "กรุณาลองใหม่อีกครั้ง",
  //       confirmButtonText: "ตกลง",
  //     });
  //   }
  // }; 

   //---------- Dialog  ดูข้อมูลรายการ -------------- //
   const [openViewDialog, setOpenViewDialog] = useState(false);
   const [dataSale, setDataSale] = useState([])
   const [dialogSizeView, setDialogSizeView] = useState("lg");
 
   const handleViewClick = async (data) => {
    setDataSale(data)
     setOpenViewDialog(true);
   };
 
   const handleCloseViewDialog = () => {
     setOpenViewDialog(false);
   };

  //  console.log(dataSale)


  //------------  Print  Receive ---------------//
  const [openReceiveDialog, setOpenReceiveDialog] = useState(false);
  const [dialogSizeReceive, setDialogSizeReceive] = useState("lg");

  const handleReceiveClick = async (data) => {
    setReportData(data)
    setSumTotal(data.sale_auction_price)
    setThbText(THBText(data.sale_auction_price))
     setOpenReceiveDialog(true);
   };
 
   const handleCloseReceiveDialog = () => {
     setOpenReceiveDialog(false);
   };

  //  console.log(reportData)
  //  console.log(sumTotal)
  //  console.log(thbText)

  //---------- Edit  รายการ -------------- //
      const [editView,setEditView] = useState('false')
    
      const handleEditClick = async (data) => {
        setEditView('true')
      };


    //------------ ยกเลิก  bill ------------------//


    const endBill = async (data) => {
      try {
        const billDataId = data.id;
    
        // ถามครั้งที่ 1
        const result = await Swal.fire({
          title: 'กรอกหมายเหตุ',
          titleText: `ยกเลิกบิลเลขที่: ${data.sale_code}`,
          input: 'text',
          inputPlaceholder: 'กรอกหมายเหตุที่ยกเลิก',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'ยืนยัน',
          preConfirm: (note) => {
            if (note) {
              // ถามครั้งที่ 2 หลังจากผู้ใช้กดยืนยันครั้งแรก
              return Swal.fire({
                title: 'แน่ใจหรือไม่ที่จะยกเลิก',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ยืนยัน',
              }).then((result2) => {
                if (result2.isConfirmed) {
                  // ส่งข้อมูลไปยัง API
                  const data = {
                    show_Id: billDataId,
                    sale_auction_q: note, // ใช้ค่าปัจจุบันของ note
                  };
                  console.log(data);
    
                  axios
                    .put(`${import.meta.env.VITE_APP_API}/Cancel-Sale`, data, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${Token}`,
                      },
                    })
                    .then((response) => {
                      // แสดงข้อความหลังจากส่งข้อมูลสำเร็จ
                      Swal.fire({
                        title: 'สำเร็จ',
                        text: 'บิลถูกยกเลิกแล้ว',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                      });
    
                      fetchData();
                    })
                    .catch((error) => {
                      // กรณีเกิดข้อผิดพลาดในการส่งข้อมูล
                      Swal.fire(
                        'เกิดข้อผิดพลาด',
                        'ไม่สามารถยกเลิกบิลได้ในขณะนี้',
                        'error'
                      );
                    });
                } else if (result2.dismiss === Swal.DismissReason.cancel) {
                  // ผู้ใช้กดยกเลิกครั้งที่ 2
                }
              });
            } else {
              Swal.showValidationMessage('โปรดกรอกหมายเหตุ'); // แสดงข้อความแจ้งเตือน
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      } catch (error) {
        // กรณีเกิดข้อผิดพลาดในการส่งข้อมูล
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถยกเลิกบิลได้ในขณะนี้', 'error');
      }
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

  
    const handleEditSale = (data)=> {
      // console.log(data)
      setOpenEditSale(true)
      setIdAuctionReport(data.id)
      // console.log(data.id)

    }



  return (
    <div>
      {openEditSale == true ?
      <EditSale_Cart id={idAuctionReport}/>
      :
      <div >
       {/* <p>ข้อมูลผู้บริจาค</p> */}
       <div 
       className="mx-3 mt-3 flex w-full  flex-col justify-center  gap-5 xl:justify-start xl:gap-3 2xl:flex-row  ">
         <div className="flex  flex-col justify-center items-center  gap-5 sm:justify-start md:flex-row ">
           <div className="flex flex-col justify-center  gap-5  md:flex-row xl:justify-start xl:gap-2 ">
             <div className="flex    ">
               <div className="flex w-[80%] sm:w-[430px] md:w-[300px] lg:w-[350px] 2xl:w-[210px] ">
                 <Input
                   type="text"
                   label="ค้นหาผู้บริจาค / เลขใบรับของ"
                   value={searchQuery}
                   className="flex justify-center "
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
             </div>
             <div className="flex  justify-center gap-5 md:justify-start xl:gap-2">
               <div className="flex justify-center ">
                 <DatePicker
                   selected={startDateExcel}
                   // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
                   // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
                   // showYearDropdown
                   // showMonthDropdown
                   // scrollableYearDropdown
                   // scrollableMonthDropdown
                   locale={th}
                   dateFormat=" วันเริ่มต้น dd/MM/yyyy"
                   label="วันสิ้นสุด"
                   onChange={(date) => setStartDateExcel(date)}
                   className="w-full rounded-md border border-gray-400 p-2 shadow-sm  text-gray-600 focus:border-blue-500 focus:outline-none"
                 />
               </div>
               <div className="flex justify-center ">
                 <DatePicker
                   selected={endDateExcel}
                   locale={th}
                   dateFormat="วันสิ้นสุด dd/MM/yyyy"
                   onChange={(date) => setEndDateExcel(date)}
                   className="w-full rounded-md border border-gray-400 p-2 shadow-sm  text-gray-600 focus:border-blue-500 focus:outline-none"
                 />
               </div>
               {/* <div className="flex justify-center">
               <Button
                  size="sm"
                 className="flex w-[200px] items-center justify-center bg-green-500 align-middle text-base md:w-[120px]     lg:w-[150px]"
                 onClick={exportToExcel}
               >
                 <span className="mr-2 text-xl">
                   <SiMicrosoftexcel />
                 </span>
                 Excel
               </Button>
             </div> */}
             </div>
           </div>
         </div>
       </div>
 
       {/* ------------ table  ----------------------------------------- */}
 
       <Card className="mt-5 h-full w-full overflow-scroll">
         <table className="w-full min-w-max table-auto text-left">
           <thead>
             <tr>
               <th
                 // key={head}
                 className="flex justify-center border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
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
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="font-normal leading-none opacity-70"
                 >
                   เลขที่ใบรับของ
                 </Typography>
               </th>
               <th
                 // key={head}
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="flex font-normal leading-none opacity-70"
                 >
                   ผู้บริจาค
                 </Typography>
               </th>
               <th
                 // key={head}
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="flex font-normal leading-none opacity-70"
                 >
                   วันที่ขายสินค้า
                 </Typography>
               </th>
               <th
                 // key={head}
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="flex font-normal leading-none opacity-70"
                 >
                   จำนวนเงิน
                 </Typography>
               </th>
               <th
                 // key={head}
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="flex font-normal leading-none opacity-70"
                 >
                   รายละเอียด
                 </Typography>
               </th>
               <th
                 // key={head}
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="flex font-normal leading-none opacity-70"
                 >
                   ใบรับของ
                 </Typography>
               </th>
               <th
                 // key={head}
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="flex font-normal leading-none opacity-70"
                 >
                   แก้ไขบิล
                 </Typography>
               </th>
               <th
                 // key={head}
                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
               >
                 <Typography
                   variant="small"
                   color="blue-gray"
                   className="text-center font-normal leading-none opacity-70"
                 >
                   ยกเลิกบิล
                 </Typography>
               </th>
             </tr>
           </thead>
           {noData ? (
             <tbody>
               <tr>
                 <td></td>
                 <td></td>
                 <td></td>
                 <td>
                   <Typography>...ไม่พบข้อมูล...</Typography>
                 </td>
               </tr>
             </tbody>
           ) : (
             <tbody>
               {displayedData.map((data, index) => {
                 const isLast = index === displayedData.length - 1;
                 const pageIndex = startIndex + index;
                 const classes = isLast
                   ? "p-3"
                   : "p-3  border-b  border-blue-gray-50";
 
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
                         {data.sale_code || ''}
                       </Typography>
                     </td>
                     <td className={classes}>
                       <Typography
                         variant="small"
                         color="blue-gray"
                         className="font-normal "
                       >
                         {data.sale_code_customer_name || ''}
                       </Typography>
                     </td>
                     <td className={classes}>
                       <Typography
                         variant="small"
                         color="blue-gray"
                         className="font-normal "
                       >
                         {formatDate(data?.sale_auction_date) || ''}
                       </Typography>
                     </td>
                     <td className={classes}>
                       <Typography
                         variant="small"
                         color="blue-gray"
                         className="font-normal "
                       >
                         {Number(data?.sale_auction_price).toLocaleString() || ''}
                       </Typography>
                     </td>
                     <td className={classes} >
                       <div className="flex justify-center">
                       <IconButton 
                       variant="filled"
                         size="sm"
                         className=" rounded-full"
                         onClick={() => handleViewClick(data)}
                       >
                           <MdSearch className="text-xl"/>
                       </IconButton>
                       </div>
                     </td>
                     <td className={classes} >
                       <div className="flex justify-center">
                       <IconButton 
                         variant="text"
                         size="sm"
                         className=" rounded-full"
                         disabled={data?.status_sale === 0}
                         onClick={() => handleReceiveClick(data)}
                         
                       >
                           <TfiPrinter className="text-xl text-green-800 font-blod"/>
                       </IconButton>
                       </div>
                     </td>
                     <td className={classes} >
                       <div className="flex justify-center">
                       <IconButton 
                         variant="text"
                         size="sm"
                         className=" rounded-full"
                         disabled={data?.status_sale === 0}
                         onClick={() => handleEditSale(data)}
                       >
                        {/* <Link to={`/dashboard/edit-sale-cart/${data?.id}`}> */}
                        <FiEdit className="text-xl  text-lime-900 font-blod"/>

                        {/* </Link> */}
                       </IconButton>
                       </div>
                     </td>
                     <td className={classes} >
                       <div className="flex justify-center">
                       <IconButton 
                         variant="outline"
                         size="sm"
                         color="red"
                         className=" rounded-full"
                         disabled={data?.status_sale === 0 || data?.status_sale == 2}
                         onClick={()=>endBill(data)}
                       >
                           <RiDeleteBin5Line className="text-xl"/>
                       </IconButton>
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
                   currentPage === i + 1 ? "bg-blue-500 text-white" : ""
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
 
        {/* ----  View ดูข้อมูลรายการ -------------- */}
        <Dialog
           open={openViewDialog}
           size={dialogSizeView}
           handler={handleCloseViewDialog}
           className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-[650px] "
         >
           <DialogHeader className=" bg-blue-700 text-center  text-base  text-white opacity-80">
             <div className="flex gap-3">
               <Typography className="text-xl">รายละเอียด</Typography>
             </div>
           </DialogHeader>
           <DialogBody  className="px-5 ">
             <div className="flex w-full flex-col gap-5 xl:flex-row">
               <div className="flex w-full flex-col  gap-3 ">
                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
                   <div className="flex font-bold">เลขที่ใบส่งของ:</div>
                   <div className="flex">
                   {dataSale.sale_code || ''}
                   </div>
                 </div>
                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
                   <div className="flex font-bold">ผู้บริจาค:</div>
                   <div className="flex">
                   {dataSale.sale_code_customer_name || ''}
                   </div>
                 </div>
                 <div className="flex flex-col justify-start gap-3 md:flex-row">
                   <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:w-[260px] md:justify-start lg:w-[220px] xl:w-[200px] 2xl:w-[180px]">
                     <div className="flex font-bold">สลากออมสิน:</div>
                     <div className="flex">
                     {dataSale.aomsin?.[0]?.sale_auction_start_event_count || ''}
                     </div>
                     <div className="flex">ใบ</div>
                   </div>
                   <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start lg:w-[500px] xl:w-[400px] 2xl:w-[350px]">
                     <div className="flex font-bold">สลากกินแบ่งรัฐบาล:</div>
                     <div className="flex">
                     {dataSale.aomsin?.[1]?.sale_auction_start_event_count || ''}
                     </div>
                     <div className="flex">ใบ</div>
                   </div>
                 </div>
                 <div  className="flex flex-col sm:flex-row w-full  ">
                   <table className="w-full min-w-max table-auto overflow-y-scroll text-left">
                     <thead>
                       <tr>
                         <th
                           // key={head}
                           className="flex border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
                         >
                           <Typography
                             variant="small"
                             color="blue-gray"
                             className="font-normal leading-none opacity-70"
                           >
                             ชื่อ
                           </Typography>
                         </th>
                         <th
                           // key={head}
                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
                         >
                           <Typography
                             variant="small"
                             color="blue-gray"
                             className="font-normal leading-none opacity-70"
                           >
                             จำนวน
                           </Typography>
                         </th>
                         <th
                           // key={head}
                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
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
                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
                         >
                           <Typography
                             variant="small"
                             color="blue-gray"
                             className="font-normal leading-none opacity-70"
                           >
                             ราคา/หน่วย
                           </Typography>
                         </th>
                         <th
                           // key={head}
                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
                         >
                           <Typography
                             variant="small"
                             color="blue-gray"
                             className="font-normal leading-none opacity-70"
                           >
                             จำนวนเงิน
                           </Typography>
                         </th>
       
                       </tr>
                     </thead>
                     <tbody> 
                     {dataSale?.product?.map((data, index) => (
                             <tr key={index}>
                               <td className="p-2">
                                 {data.sale_auction_start_event}
                               </td>
                               <td className="p-2">
                                 {data.sale_auction_start_event_count}
                               </td>
                               <td className="p-2">
                                 {data.sale_auction_start_event_count_unit}
                               </td>
                               <td className="p-2">
                                 {Number(data.sale_auction_start_event_count_price).toLocaleString()}
                               </td>
                               <td className="p-2">
                                 {(Number(data.sale_auction_start_event_count) * Number(data.sale_auction_start_event_count_price)).toLocaleString()}
                               </td>
                             </tr>
                           ))}
                     </tbody>
                   </table>
                 </div>
                 <hr className="border-b-2"/>
                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
                   <div className="flex font-bold">รวมเป็นเงิน:</div>
                   <div className="flex">
                   {Number(dataSale.sale_auction_price).toLocaleString() || ''}
                   </div>
                   <div className="flex">บาท</div>
                 </div>
                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:w-[240px] md:justify-start lg:w-[180px] xl:w-[290px] 2xl:w-[180px]">
                     <div className="flex font-bold">หมายเหตุ:</div>
                     <div className="flex">
                       {dataSale.sale_auction_q || ''}
                     </div>
                 </div>
               </div>
             
             </div>
           </DialogBody>
           <DialogFooter className="  mt-[10px] flex justify-center gap-5 sm:mt-[20px] md:mt-[20px] md:justify-end">
             <Button
               variant="gradient"
               color="red"
               onClick={handleCloseViewDialog}
               className="mr-1  flex items-center align-middle text-base"
             >
               <span className="mr-2 flex text-xl">
                 <GiCancel />
               </span>
               ออก
             </Button>
           </DialogFooter>
        </Dialog>


            {/* ----  View ใบรับของ -------------- */}
            <Dialog
            open={openReceiveDialog}
            size={dialogSizeReceive}
            handler={handleCloseReceiveDialog}
            // className="custom-dialog  h-[520px] overflow-scroll sm:h-[450px]  md:h-[500px] xl:h-auto"
            className="custom-dialog h-full  "
          >
            <DialogBody>
              <Card className=" h-full w-full ">
                <div className="h-full w-full">
                  <PDFViewer width="100%" height="600px">
                    {reportData && <ReceiveSale key={JSON.stringify(reportData)}  reportData={reportData} sumTotal={sumTotal}  thbText={thbText} />}
                  </PDFViewer>
                </div>
              </Card>
            </DialogBody>
            <DialogFooter className=" flex justify-center py-0  md:justify-end">
              <Button
                variant="text"
                color="red"
                onClick={handleCloseReceiveDialog}
                className=" flex items-center align-middle text-base"
              >
                <span className="mr-2 flex text-xl">
                  <GiCancel />
                </span>
                ยกเลิก
              </Button>

            </DialogFooter>
          </Dialog>

       </div>
       }
    </div>
       
  );
}
export default SaleList;
