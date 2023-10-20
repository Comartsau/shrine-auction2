// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import "react-datepicker/dist/react-datepicker.css";
// import { SiMicrosoftexcel } from "react-icons/si";
// import { GiCancel } from "react-icons/gi";
// import DatePicker from "react-datepicker";
// import {
//   Card,
//   Typography,
//   Button,
//   CardFooter,
//   IconButton,
//   Input,
//   Select,
//   Option,
//   Dialog,
//   Radio,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import axios from "axios";

// import { PDFViewer } from "@react-pdf/renderer";
// import THBText from "thai-baht-text";
// import { Receipt1 } from "./Receipt1";
// import { Receipt2 } from "./Receipt2";
// import { Receipt3 } from "./Receipt3";

// export function Account() {
//   const [listData, setListData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchQueryPayment, setSearchQueryPayment] = useState("");
//   const [selectTypeBill, setSelectTypeBill] = useState("");
//   const [noData, setNoData] = useState(true);
//   const [sumTotal,setSumTotal] =useState('')
//   const [thbText, setThbText] = useState('');

//   const [startDateExcel, setStartDateExcel] = useState(new Date());
//   const [endDateExcel, setEndDateExcel] = useState(new Date());



//   // ----------------------------------------- //

//   // ---------  Token ------------------------ //
//   const Token = localStorage.getItem("token");

//   //----- จัดการแสดงข้อมูล / หน้า -------------- //
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const displayedData = listData.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(listData.length / itemsPerPage);

//   //---------- แสดงข้อมูลในตาราง --------------- //

//   const fetchData = async () => {
//     try {
//       let url = "";
//       if (selectTypeBill == "ประมูล") {
//         url = `${import.meta.env.VITE_APP_API}/Debtor?type_Data=1`;
//         if (
//           (startDateExcel && endDateExcel) ||
//           searchQuery ||
//           searchQueryPayment
//         ) {
//           console.log(startDateExcel);
//           const formattedStartDate = formatDate1(startDateExcel, "YYYY-MM-DD");
//           const formattedEndDate = formatDate1(endDateExcel, "YYYY-MM-DD");
//           console.log(formattedStartDate);
//           console.log(formattedEndDate);

//           url = `${
//             import.meta.env.VITE_APP_API
//           }/Debtor?type_Data=1&receipt_number=${searchQuery}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&paid=${searchQueryPayment}`;
//         }
//       } else if (selectTypeBill == "ขายสินค้า") {
//         url = `${import.meta.env.VITE_APP_API}/Debtor?type_Data=2`;
//         if (
//           (startDateExcel && endDateExcel) ||
//           searchQuery ||
//           searchQueryPayment
//         ) {
//           console.log(startDateExcel);
//           const formattedStartDate = formatDate1(startDateExcel, "YYYY-MM-DD");
//           const formattedEndDate = formatDate1(endDateExcel, "YYYY-MM-DD");
//           console.log(formattedStartDate);
//           console.log(formattedEndDate);

//           url = `${
//             import.meta.env.VITE_APP_API
//           }/Debtor?type_Data=2&receipt_number=${searchQuery}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&paid=${searchQueryPayment}`;
//         }
//       }
//       const response = await axios.get(url, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Token}`,
//         },
//       });
//       // console.log(response.data);
//       setListData(response.data);
//       setNoData(false);
//     } catch (error) {
//       console.error(error);
//       setNoData(true);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [
//     searchQuery,
//     selectTypeBill,
//     startDateExcel,
//     endDateExcel,
//     searchQueryPayment,
//   ]);

//   //------------- แปลง วันที่ ------------------------------------- //

//   function formatDate(dateString, format) {
//     const date = new Date(dateString);

//     if (isNaN(date)) {
//       return ""; // หรือค่า default ที่คุณต้องการ
//     }

//     if (format === "DD/MM/YYYY") {
//       const day = date.getDate().toString().padStart(2, "0");
//       const month = (date.getMonth() + 1).toString().padStart(2, "0");
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     }

//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     // return `${year}-${month}-${day}`;
//     return `${day}-${month}-${year}`;
//   }
//   function formatDate1(dateString, format) {
//     const date = new Date(dateString);

//     if (isNaN(date)) {
//       return ""; // หรือค่า default ที่คุณต้องการ
//     }

//     if (format === "DD/MM/YYYY") {
//       const day = date.getDate().toString().padStart(2, "0");
//       const month = (date.getMonth() + 1).toString().padStart(2, "0");
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     }

//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     // return `${year}-${month}-${day}`;
//     return `${year}-${month}-${day}`;
//   }

//   // ----  ออก excel ----------------------------------- //

//   const exportToExcel = async () => {
//     try {
//       // console.log(searchData)
//       // console.log(searchQuery)

//       const url = `${
//         import.meta.env.VITE_APP_API
//       }/Customer-Excel/?search=${searchQuery}`;

//       // ตรวจสอบว่ามี Token หรือไม่
//       const Token = localStorage.getItem("token");
//       if (!Token) {
//         throw new Error("Token not found.");
//       }

//       // ส่งคำขอไปยัง API โดยใส่ Token ใน Header
//       const response = await axios.get(url, {
//         responseType: "blob", // ระบุ responseType เป็น 'blob'
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${Token}`,
//         },
//       });
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const downloadUrl = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.download = "Reports_Auction_Title.xlsx"; // ตั้งชื่อไฟล์ที่จะดาวน์โหลด
//       link.click();
//       URL.revokeObjectURL(downloadUrl);
//     } catch (error) {
//       console.error("Error exporting to Excel:", error);
//       Swal.fire({
//         icon: "error",
//         title: "ออก Excel ไม่สำเร็จ ",
//         text: "กรุณาลองใหม่อีกครั้ง",
//         confirmButtonText: "ตกลง",
//       });
//     }
//   };

//   //---------- Dialog  ดูข้อมูลทั้งหมดก่อนส่งบันทึก -------------- //
//   const [dataViewDetail, setDataViewDetail] = useState([]);
//   const [dataPay, setDataPay] = useState([]);
//   const [openViewDialog, setOpenViewDialog] = useState(false);
//   const [dialogSizeView, setDialogSizeView] = useState("xl");

//   const handleViewClick = async (data) => {
//     setDataViewDetail(data || []);
//     if(data.id) {
//       const response = await axios.get(`${import.meta.env.VITE_APP_API}/Debtor-Sale/${data.id}/detail`, 
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Token ${Token}`,
//             },
//           });
//           console.log(response.data)
//           setDataPay(response.data[0])
//           setReceiptData(response.data[0])
//     }


//     setOpenViewDialog(true);
//   };

//   const handleCloseViewDialog = () => {
//     setOpenViewDialog(false);
//   };

//   //---------- Dialog  ชำระเงิน -------------- //

//   const [reportData, setReportData] = useState([]);

//   const fetchUpdatedData = async (billDataId) => {
//     console.log(billDataId)
//     try {
//       // console.log(billDataId)
//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_API}/Sale/${billDataId}/detail`,
//         {
//           headers: {
//             Authorization: `Token ${Token}`,
//           },
//         }
//       );
//       console.log(response.data)
//       setReportData(response.data);
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
//     }
//   };

//   const [activePayMenu, setActivePayMenu] = useState("menu1");
//   const [selectedViewPayData, setSelectedViewPayData] = useState(null);
//   const [openViewPayDialog, setOpenViewPayDialog] = useState(false);
//   const [dialogSizeViewPay, setDialogSizeViewPay] = useState("lg");

//   const [payCustomerPayee, setPayCustomerPayee] = useState("");
//   const [payDate, setPayDate] = useState("");
//   const [payRef, setPayRef] = useState("");
//   const [payStatus, setPayStatus] = useState("1");
//   const [payAcc, setPayAcc] = useState("");
//   const [payBank, setPayBank] = useState("");
//   const [payCheck, setPayCheck] = useState("");
//   const [receiptId, setReceiptId] = useState("");
//   const [receiptStatusId, setReceiptStatusId] = useState("");

//   const handleViewPayClick = (data) => {
//     console.log(data)
//     setActivePayMenu("menu1");
//     setReportData(data)
//     setSelectedViewPayData(); // นำข้อมูลไปใช้งานภายใน modal / dialog
//     setOpenViewPayDialog(true);
//   };

//   const handleCloseViewPayDialog = () => {
//     setSelectedViewPayData(null);
//     setOpenViewPayDialog(false);
//   };

//   const dateObject = new Date(reportData.sale_auction_date);

//   // รับค่าวันที่, เดือน, และปี
//   const day = dateObject.getDate();
//   const month = dateObject.getMonth() + 1; // เดือนจะนับเริ่มต้นที่ 0, เพิ่ม 1 เพื่อเป็นเดือนที่ถูกต้อง
//   const year = dateObject.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.

//   // สร้างรูปแบบวันที่ใหม่ "dd/mm/yyyy"
//   const formattedDate1 = `${day.toString().padStart(2, "0")}/${month
//     .toString()
//     .padStart(2, "0")}/${year}`;

//   console.log(formatDate(payDate))

//   const [selectedFile, setSelectedFile] = useState(null);
//   const sendPay = async () => {
//     try {
//       setSumTotal(dataViewDetail.sale_auction_price)
//       setThbText(THBText(dataViewDetail.sale_auction_price))
//       // สร้าง FormData เพื่อแนบไฟล์
//       // console.log(payStatus)
//       const formData = new FormData();
//       formData.append("sale_auction", reportData.id);
//       formData.append("sale_receipt_name", payCustomerPayee);
//       formData.append("sale_receipt_date_pay", formatDate1(payDate));
//       formData.append("sale_receipt_number", payRef);
//       formData.append("sale_receipt_bank", payBank);
//       formData.append("sale_receipt_acc", payAcc);
//       formData.append("sale_receipt_check", payCheck);
//       formData.append("sale_receipt_status", Number(payStatus));
//       formData.append("sale_receipt_image", selectedFile || "");

//       // console.log("FormData:", JSON.stringify([...formData.entries()]));

//       const response = await axios.post(
//         `${import.meta.env.VITE_APP_API}/Receipt`,
//         formData,
//         {
//           headers: {
//             Authorization: `Token ${Token}`,
//             "Content-Type": "multipart/form-data", // ระบุ Content-Type เป็น multipart/form-data
//           },
//         }
//       );
//       // console.log(response.data)
//       setReceiptId(response.data.id);
//       setReceiptStatusId(response.data.sale_receipt_status);
//       setOpenViewPayDialog(false);
//       await fetchUpdatedData(billDataId);
//       await fetchReceiptData(response.data.id);
//       setPayRef("");
//       setPayCustomerPayee("");
//       setPayDate("");
//       setPayAcc("");
//       setPayBank("");
//       setPayCheck("");
//       setSelectedFile(null); // เคลียร์ไฟล์ที่เลือก
//       fetchData()
//       Swal.fire({
//         icon: "success",
//         title: "บันทึกข้อมูลใบเสร็จเรียบร้อย",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } catch (error) {
//       setOpenViewPayDialog(false);
//       Swal.fire({
//         icon: "error",
//         title: "บันทึกข้อมูลใบเสร็จไม่สำเร็จ",
//         text: "กรุณาลองใหม่อีกครั้ง (กรุณาใส่ข้อมูลให้ครบถ้วน)",
//         confirmButtonText: "ตกลง",
//       });
//     }
//   };

//   //---------- Dialog  ใบรับเสร็จรับเงิน -------------- //
//   const [selectedViewReceiptData1, setSelectedViewReceiptData1] =
//     useState(null);
//   const [openViewReceiptDialog1, setOpenViewReceiptDialog1] = useState(false);
//   const [dialogSizeViewReceipt1, setDialogSizeViewReceipt1] = useState("xl");
//   const [billData, setBillData] = useState([]);
//   const [billDataId, setBillDataId] = useState("");

//   const handleViewReceiptClick1 = (data) => {
//     console.log(data)
//     setOpenViewReceiptDialog1(true);
//     setSelectedViewReceiptData1(billData); // นำข้อมูลไปใช้งานภายใน modal / dialog
//   };

//   const handleCloseViewReceiptDialog1 = () => {
//     setSelectedViewReceiptData1(null);
//     setOpenViewReceiptDialog1(false);
//   };

//   const [receiptData, setReceiptData] = useState([]);

//   const fetchReceiptData = async (receiptId) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_API}/Receipt/${receiptId}/detail`,
//         {
//           headers: {
//             Authorization: `Token ${Token}`,
//           },
//         }
//       );

//       console.log(response.data)
//       setReceiptData(response.data);
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
//     }
//   };

//   return (
//     <div>
//       {/* <p>ข้อมูลผู้บริจาค</p> */}
//       <div className="mx-3 mt-3 flex w-full  flex-col justify-center  gap-5 xl:justify-start xl:gap-3 2xl:flex-row  ">
//         <div className="flex  flex-col items-center justify-center  gap-5 sm:justify-start md:flex-row ">
//           <div className="flex flex-col justify-center  gap-5  md:flex-row xl:justify-start xl:gap-2 ">
//             <div className="flex items-center justify-center  ">
//               <Select
//                 label="ประเภทบิล"
//                 onChange={(e) => {
//                   // console.log(e)
//                   setSelectTypeBill(e);
//                 }}
//               >
//                 <Option value="ประมูล">ประมูล</Option>
//                 <Option value="ขายสินค้า">ขายสินค้า</Option>
//               </Select>
//             </div>
//             <div className="flex  justify-center  ">
//               <div className="flex w-[80%] sm:w-[430px] md:w-[300px] lg:w-[350px] 2xl:w-[210px] ">
//                 <Input
//                   type="text"
//                   disabled={!selectTypeBill}
//                   label="ค้นหาผู้บริจาค / เลขใบรับของ"
//                   value={searchQuery}
//                   className="flex justify-center "
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex  justify-center gap-5 md:justify-start xl:gap-2">
//               <div className="flex justify-center ">
//                 <DatePicker
//                   selected={startDateExcel}
//                   disabled={!selectTypeBill}
//                   // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
//                   // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
//                   // showYearDropdown
//                   // showMonthDropdown
//                   // scrollableYearDropdown
//                   // scrollableMonthDropdown
//                   locale="th"
//                   dateFormat=" วันเริ่มต้น dd/MM/yyyy"
//                   // label="วันสิ้นสุด"
//                   onChange={(date) => setStartDateExcel(date)}
//                   className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
//                 />
//               </div>
//               <div className="flex justify-center ">
//                 <DatePicker
//                   selected={endDateExcel}
//                   disabled={!selectTypeBill}
//                   dateFormat="วันสิ้นสุด dd/MM/yyyy"
//                   onChange={(date) => setEndDateExcel(date)}
//                   className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center md:justify-start">
//           <div className="flex flex-col gap-5 md:flex-row xl:gap-2">
//             <div className="flex flex-col gap-5 sm:flex-row xl:gap-2 ">
//               <div className="flex items-center justify-center  ">
//                 <Select
//                   label="ค้นหาด้วยหมวดหมู่"
//                   disabled={!selectTypeBill}
//                   onChange={(e) => {
//                     // console.log(e)
//                     setSearchQueryPayment(e);
//                   }}
//                 >
//                   <Option value="">ทั้งหมด</Option>
//                   <Option value="2">ชำระแล้ว</Option>
//                   <Option value="1">ยังไม่ชำระ</Option>
//                 </Select>
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <Button
//                 fullWidth
//                 className="flex w-[200px] items-center justify-center bg-green-500 align-middle text-base md:w-[120px]     lg:w-[150px]"
//                 onClick={exportToExcel}
//                 disabled={!selectTypeBill}
//               >
//                 <span className="mr-2 text-xl">
//                   <SiMicrosoftexcel />
//                 </span>
//                 Excel
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ------------ table  ----------------------------------------- */}

//       <Card className="mt-5 h-full w-full overflow-scroll">
//         <table className="w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               <th
//                 // key={head}
//                 className="flex justify-center border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   #
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   ผู้บริจาค
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   เลขที่ใบรับของ
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   หัวข้อประมูล
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="flex  font-normal leading-none opacity-70"
//                 >
//                   วันที่บิล
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="flex font-normal leading-none opacity-70"
//                 >
//                   วันที่ชำระเงิน
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="flex font-normal leading-none opacity-70"
//                 >
//                   สถานะ
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="flex font-normal leading-none opacity-70"
//                 >
//                   จำนวนเงิน
//                 </Typography>
//               </th>
//               <th
//                 // key={head}
//                 className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="text-center font-normal leading-none opacity-70"
//                 >
//                   ชำระเงิน/ใบเสร็จ
//                 </Typography>
//               </th>
//             </tr>
//           </thead>
//           {noData ? (
//             <tbody>
//               <tr>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>
//                   <Typography>...ไม่พบข้อมูล...</Typography>
//                 </td>
//               </tr>
//             </tbody>
//           ) : (
//             <tbody>
//               {displayedData.map((data, index) => {
//                 const isLast = index === displayedData.length - 1;
//                 const pageIndex = startIndex + index;
//                 const classes = isLast
//                   ? "p-4"
//                   : "p-4 border-b   border-blue-gray-50";

//                 return (
//                   <tr key={index}>
//                     <td className={classes}>
//                       <div className="flex items-center justify-center">
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-bold "
//                         >
//                           {pageIndex + 1 || ""}
//                         </Typography>
//                       </div>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal "
//                       >
//                         {selectTypeBill == "ประมูล"
//                           ? data.auction_report_user_auction || ""
//                           : data.sale_code_customer_name || ""}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <button
//                         className=" hover:text-green-800  hover:outline-green-300  "
//                         onClick={() => handleViewClick(data)}
//                       >
//                         <Typography
//                           variant="small"
//                           className=" hover:underline"
//                         >
//                           {selectTypeBill == "ประมูล"
//                             ? data.number || ""
//                             : data.sale_code || ""}
//                         </Typography>
//                       </button>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal "
//                       >
//                         {data.auction_report_auctionstarted || ""}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal "
//                       >
//                         {selectTypeBill == "ประมูล"
//                           ? formatDate(data.auction_report_date) || ""
//                           : formatDate(data.sale_auction_date) || ""}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal "
//                       >
//                         {selectTypeBill === "ประมูล"
//                           ? formatDate(data.auction_report_date_Pay_Date || "")
//                           : data.sale_auction_date_pay_Bill &&
//                             data.sale_auction_date_pay_Bill !== ""
//                           ? formatDate(data.sale_auction_date_pay_Bill)
//                           : ""}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className={
//                           selectTypeBill == "ประมูล"
//                             ? data.auction_report_Pay_status == 1
//                               ? "font-bold text-red-500"
//                               : "font-bold text-green-700"
//                             : data.status_sale == 1
//                             ? "font-bold text-red-500"
//                             : "font-bold text-green-700"
//                         }
//                       >
//                         {selectTypeBill == "ประมูล"
//                           ? data.auction_report_Pay_status == 1
//                             ? "ยังไม่ชำระ"
//                             : "ชำระแล้ว"
//                           : data.status_sale == 1
//                           ? "ยังไม่ชำระ"
//                           : "ชำระแล้ว"}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal "
//                       >
//                         {selectTypeBill == "ประมูล"
//                           ? Number(
//                               data.auction_report_price
//                             ).toLocaleString() || ""
//                           : Number(data.sale_auction_price).toLocaleString() ||
//                             ""}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       {data.auction_report_Pay_status == 1 ||
//                       data.status_sale == 1 ? (
//                         <div className="flex justify-center">
//                           <Button
//                             className="flex justify-center bg-purple-700 px-2 "
//                             size="sm"
//                             onClick={()=> handleViewPayClick(data)}
//                           >
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className=" flex font-normal text-white "
//                             >
//                               ชำระเงิน
//                             </Typography>
//                           </Button>
//                         </div>
//                       ) : (
//                         <div className="flex justify-center">
//                           <Button
//                             className="flex justify-center bg-green-700 px-2 "
//                             size="sm"
//                             onClick={()=>handleViewReceiptClick1(data)}
//                           >
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className=" flex font-normal text-white "
//                             >
//                               ใบเสร็จ
//                             </Typography>
//                           </Button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           )}
//         </table>
//         <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//           <Button
//             variant="outlined"
//             size="sm"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             ก่อนหน้า
//           </Button>
//           <div className="flex items-center gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <IconButton
//                 key={i}
//                 variant="outlined"
//                 size="sm"
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={
//                   currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//                 }
//               >
//                 {i + 1}
//               </IconButton>
//             ))}
//           </div>
//           <Button
//             variant="outlined"
//             size="sm"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             ถัดไป
//           </Button>
//         </CardFooter>

//         {/* ----  View ดูข้อมูลรายการ -------------- */}
//         <Dialog
//           open={openViewDialog}
//           size={dialogSizeView}
//           handler={handleCloseViewDialog}
//           className="custom-dialog h-[520px] overflow-scroll sm:h-[450px]  md:h-[650px] "
//         >
//           <DialogHeader className=" bg-blue-700 text-center  text-base  text-white opacity-80">
//             <div className="flex gap-3">
//               <Typography className="text-xl">รายละเอียด</Typography>
//             </div>
//           </DialogHeader>
//           <DialogBody  className="px-5 ">
//             <div className="flex w-full flex-col gap-5 xl:flex-row">
//               <div className="flex w-full flex-col  gap-3 xl:w-1/2">
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
//                   <div className="flex font-bold">รายการบิลที่:</div>
//                   <div className="flex">
//                     {selectTypeBill == "ประมูล"
//                       ? dataViewDetail.number || ""
//                       : dataViewDetail.sale_code || ""}
//                   </div>
//                 </div>
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
//                   <div className="flex font-bold">หัวข้อประมูล:</div>
//                   <div className="flex">
//                     {selectTypeBill == "ประมูล"
//                       ? dataViewDetail.auction_report_auctionstarted || ""
//                       : ""}
//                   </div>
//                 </div>
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
//                   <div className="flex font-bold">เลขที่ใบรับของ:</div>
//                   <div className="flex">
//                     {selectTypeBill == "ประมูล"
//                       ? dataViewDetail.number || ""
//                       : dataViewDetail.sale_code || ""}
//                   </div>
//                 </div>
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
//                   <div className="flex font-bold">ผู้บริจาค:</div>
//                   <div className="flex">
//                     {selectTypeBill == "ประมูล"
//                       ? dataViewDetail.auction_report_user_auction || ""
//                       : dataViewDetail.sale_code_customer_name || ""}
//                   </div>
//                 </div>
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
//                   <div className="flex font-bold">ราคารวม:</div>
//                   <div className="flex">
//                     {selectTypeBill == "ประมูล"
//                       ? Number(
//                           dataViewDetail.auction_report_price
//                         ).toLocaleString() || ""
//                       : Number(
//                           dataViewDetail.sale_auction_price
//                         ).toLocaleString() || ""}
//                   </div>
//                   <div className="flex">บาท</div>
//                 </div>
//                 <div className="flex flex-col justify-start gap-3 md:flex-row">
//                   <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:w-[240px] md:justify-start lg:w-[180px] xl:w-[290px] 2xl:w-[180px]">
//                     <div className="flex font-bold">สลากออมสิน:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? Number(
//                             dataViewDetail.aomsin1?.[0]?.auction_auction_start_event_count
//                           ).toLocaleString() || ""
//                         : Number(
//                             dataViewDetail.aomsin?.[0]?.sale_auction_start_event_count
//                           ).toLocaleString() || ""}
//                     </div>
//                     <div className="flex">ใบ</div>
//                   </div>
//                   <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start lg:w-[500px] xl:w-[400px] 2xl:w-[350px]">
//                     <div className="flex font-bold">สลากกินแบ่งรัฐบาล:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? Number(
//                             dataViewDetail.aomsin1?.[1]?.auction_auction_start_event_count
//                           ).toLocaleString() || ""
//                         : Number(
//                             dataViewDetail.aomsin?.[0]?.sale_auction_start_event_count
//                           ).toLocaleString() || ""}
//                     </div>
//                     <div className="flex">ใบ</div>
//                   </div>
//                 </div>
//                 <div  className="flex flex-col sm:flex-row w-full  ">
//                   <table className="w-full min-w-max table-auto overflow-y-scroll text-left">
//                     <thead>
//                       <tr>
//                         <th
//                           // key={head}
//                           className="flex border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
//                         >
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal leading-none opacity-70"
//                           >
//                             ชื่อ
//                           </Typography>
//                         </th>
//                         <th
//                           // key={head}
//                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
//                         >
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal leading-none opacity-70"
//                           >
//                             จำนวน
//                           </Typography>
//                         </th>
//                         <th
//                           // key={head}
//                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
//                         >
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal leading-none opacity-70"
//                           >
//                             หน่วยนับ
//                           </Typography>
//                         </th>
//                         <th
//                           // key={head}
//                           className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2"
//                         >
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal leading-none opacity-70"
//                           >
//                             ราคา
//                           </Typography>
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectTypeBill == "ประมูล"
//                         ? dataViewDetail?.product1?.map((data, index) => (
//                             <tr key={index}>
//                               <td className="p-2">
//                                 {data.auction_product_start_event}
//                               </td>
//                               <td className="p-2">
//                                 {data.auction_product_start_event_count}
//                               </td>
//                               <td className="p-2">
//                                 {data.auction_product_start_event_cat_count}
//                               </td>
//                             </tr>
//                           ))
//                         : dataViewDetail?.product?.map((data, index) => (
//                             <tr key={index}>
//                               <td className="p-2">
//                                 {data.sale_auction_start_event}
//                               </td>
//                               <td className="p-2">
//                                 {data.sale_auction_start_event_count_price}
//                               </td>
//                               <td className="p-2">
//                                 {data.sale_auction_start_event_count_unit}
//                               </td>
//                               <td className="p-2">
//                                 {!isNaN(data.sale_auction_start_event_count)
//                                   ? Number(
//                                       data.sale_auction_start_event_count
//                                     ).toLocaleString()
//                                   : ""}
//                               </td>
//                             </tr>
//                           ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <hr className="border-b-2"/>
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:w-[240px] md:justify-start lg:w-[180px] xl:w-[290px] 2xl:w-[180px]">
//                     <div className="flex font-bold">หมายเหตุ:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_q || ""
//                         : 
//                         dataViewDetail?.sale_auction_q  || ""
//                       }
//                     </div>
//                 </div>
//               </div>
//               <div className="flex w-full flex-col  gap-3 xl:w-1/2">
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
//                   <div className="flex font-bold">ข้อมูลการชำระเงิน:</div>
//                 </div>
//                 <div className="flex w-full flex-col md:flex-row  lg:flex-col 2xl:flex-row gap-3">
//                 <div className="flex w-1/2 flex-col items-center justify-center gap-2 sm:flex-row md:justify-start ">
//                     <div className="flex font-bold">ชำระเงินโดย:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_Pay_status == 1 ? "เงินสด" 
//                         : dataViewDetail?.auction_report_Pay_status == 2 ? "เงินโอน"
//                         : dataViewDetail?.auction_report_Pay_status == 3 ? "เช็ค"
//                         : ''
//                         : 
//                         dataPay?.sale_receipt_status == 1 ? "เงินสด"
//                         : dataPay?.sale_receipt_status == 2 ? "เงินโอน"
//                         : dataPay?.sale_receipt_status == 3 ? "เช็ค"
//                         :'' 
//                       }
//                     </div>
//                 </div>
//                 <div className="flex w-1/2 flex-col items-center justify-center gap-2 sm:flex-row md:w-[220px] md:justify-start lg:w-[220px] xl:w-[220px]">
//                     <div className="flex font-bold">วันที่ออกใบเสร็จ:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_q || ""
//                         : 
//                         formatDate(dataPay?.sale_receipt_date)  || ""

//                       }
//                     </div>
//                 </div>
//                 </div>
//                 <div className="flex w-full flex-col md:flex-row  lg:flex-col 2xl:flex-row gap-3">
//                 <div className="flex w-1/2 flex-col items-center justify-center gap-2 sm:flex-row md:justify-start ">
//                     <div className="flex font-bold">ผู้รับชำระ:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_Pay_status || ''
//                         : 
//                         dataPay?.sale_receipt_name || ''
                  
//                       }
//                     </div>
//                 </div>
//                 <div className="flex w-1/2 flex-col items-center justify-center gap-2 sm:flex-row md:w-[220px] md:justify-start lg:w-[220px] xl:w-[220px]">
//                     <div className="flex font-bold">วันที่รับชำระ:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_q || ""
//                         : 
//                         formatDate(dataPay?.sale_receipt_date_pay)  || ""

//                       }
//                     </div>
//                 </div>
//                 </div>
//                 <div className="flex w-full flex-col md:flex-row  lg:flex-col 2xl:flex-row gap-3">
//                 <div className="flex w-1/2 flex-col items-center justify-center gap-2 sm:flex-row  md:justify-start ">
//                     <div className="flex font-bold">เลขที่อ้างอิง:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_Pay_status 
//                         :
//                         dataPay?.sale_receipt_number || ''
//                       }
//                     </div>
//                 </div>
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:w-[220px] md:justify-start lg:w-[220px] xl:w-[220px]">
//                     <div className="flex font-bold">โอนเข้าธนาคาร:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataPay?.sale_receipt_bank || ""
//                         : 
//                         dataPay?.sale_receipt_acc  || ""

//                       }
//                     </div>
//                 </div>
//                 </div>
//                 <div className="flex w-full flex-col md:flex-row  lg:flex-col 2xl:flex-row gap-3">
//                 <div className="flex w-1/2 flex-col items-center justify-center gap-2 sm:flex-row md:justify-start ">
//                     <div className="flex font-bold">หมายเลขเช็ค:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_Pay_status 
//                         :
//                         dataPay?.sale_receipt_check || ''
//                       }
//                     </div>
//                 </div>
//                 <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:w-[220px] md:justify-start lg:w-[220px] xl:w-[220px] ">
//                     <div className="flex font-bold">เช็คธนาคาร:</div>
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? 
//                         dataViewDetail?.auction_report_Pay_status 
//                         :
//                         dataPay?.sale_receipt_bank || ''
//                       }
//                     </div>
//                 </div>
//                 </div>
//                 <div className="flex items-center justify-center  ">
//                     <div className="flex">
//                       {selectTypeBill == "ประมูล"
//                         ? (
//                            ""
//                           )
//                         : (
//                           dataPay?.sale_receipt_image ? (
//                             <Card className=" flex w-[250px] h-auto items-center mt-5">
//                               <img
//                               className=" object-contain object-center" 
//                               src={`${import.meta.env.VITE_APP_API}${dataPay.sale_receipt_image}`} 
//                               />
//                             </Card>
//                           )
//                             :
//                             ''
//                         )

//                       }
//                     </div>
//                 </div>
//               </div>
//             </div>
//           </DialogBody>
//           <DialogFooter className="  mt-[10px] flex justify-center gap-5 sm:mt-[20px] md:mt-[20px] md:justify-end">
//             <Button
//               variant="gradient"
//               color="red"
//               onClick={handleCloseViewDialog}
//               className="mr-1  flex items-center align-middle text-base"
//             >
//               <span className="mr-2 flex text-xl">
//                 <GiCancel />
//               </span>
//               ออก
//             </Button>
//           </DialogFooter>
//         </Dialog>

//         {/* ----  View ชำระเงิน -------------- */}
//         <Dialog
//           open={openViewPayDialog}
//           size={dialogSizeViewPay}
//           handler={handleCloseViewPayDialog}
//           className="custom-dialog h-[580px] overflow-scroll "
//         >
//           <DialogHeader className="bg-blue-700 py-3  px-2 text-center  text-base text-white opacity-80  ">
//             <div className="flex gap-3 ">
//               <Typography className="text-xl">ชำระเงิน</Typography>
//             </div>
//           </DialogHeader>
//           <DialogBody>
//             <Card className=" h-full w-full px-3  ">
//               <div className="flex w-full flex-col  items-center justify-between md:flex-row">
//                 <div className="flex w-full flex-col md:flex-row">
//                   <div className="flex w-full  items-center justify-center md:justify-start">
//                     <Typography className="text-lg font-bold ">
//                       {" "}
//                       ใบเสร็จ
//                     </Typography>
//                   </div>
//                   <div className="mt-3 flex w-full flex-col justify-center gap-5 sm:flex-row   md:mt-0 md:justify-end">
//                     <div>
//                       <Typography className="text-center text-lg font-bold ">
//                         บิลที่
//                       </Typography>
//                     </div>
//                     <div>
//                       <Typography className="text-center text-lg font-bold ">
//                         {reportData.sale_code || ""}
//                       </Typography>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex w-full flex-col  items-center  md:flex-row">
//                 <div className="mt-3 flex w-full flex-col justify-center gap-5 sm:flex-row md:justify-start">
//                   <div className="flex justify-center">
//                     <Typography className="text-lg font-bold ">
//                       วันที่:
//                     </Typography>
//                   </div>
//                   <div className="flex justify-center">
//                     <Typography className="text-lg font-bold ">
//                       {/* {formattedDate1 == NaN ? formattedDate1 : "0/0/0"} */}
//                       {formattedDate1 || '' }
//                     </Typography>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex w-full flex-col  items-center  md:flex-row">
//                 <div className="flex w-full flex-col gap-5 md:flex-row">
//                   <div className="mt-3 flex justify-center sm:justify-start">
//                     <Typography className="text-lg font-bold ">
//                       ชำระโดย:
//                     </Typography>
//                   </div>
//                 </div>
//               </div>

//               {/* menu bar */}
//               <div className=" item-center mt-5 flex w-full flex-col gap-2 md:justify-around lg:flex-row">
//                 <div className="flex  flex-col gap-5  sm:flex-row lg:gap-10 xl:gap-20 ">
//                   <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
//                     <div className="flex  justify-center">
//                       <Radio
//                         id="menu1"
//                         name="payMenu"
//                         value="menu1"
//                         checked={activePayMenu === "menu1"}
//                         onChange={() => {
//                           setActivePayMenu("menu1");
//                           setPayStatus(1);
//                         }}
//                         label="เงินสด"
//                         // color="light-green"
//                         className="h-7 w-7"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
//                     <div className="flex  justify-center">
//                       <Radio
//                         id="menu2"
//                         name="payMenu"
//                         value="menu2"
//                         checked={activePayMenu === "menu2"}
//                         onChange={() => {
//                           setActivePayMenu("menu2");
//                           setPayStatus(2);
//                         }}
//                         label="เงินโอน"
//                         // color="lightBlue"
//                         className="h-7 w-7"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex  flex-col justify-center gap-5 sm:flex-row lg:gap-20  ">
//                     <div className="flex  justify-center">
//                       <Radio
//                         id="menu3"
//                         name="payMenu"
//                         value="menu3"
//                         checked={activePayMenu === "menu3"}
//                         onChange={() => {
//                           setActivePayMenu("menu3");
//                           setPayStatus(3);
//                         }}
//                         label="เช็ค"
//                         // color="lightBlue"
//                         className="h-7 w-7"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <hr className=" mt-5 border border-gray-500" />

//               {/* content */}
//               {activePayMenu === "menu1" && (
//                 <div className="my-4 mt-5 flex w-full flex-col gap-4">
//                   <div className="flex flex-col gap-4 xl:flex-row xl:gap-10 ">
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
//                           ผู้รับเงิน:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
//                         <Input
//                           type="text"
//                           label="ผู้รับเงิน"
//                           maxLength="20"
//                           value={payCustomerPayee}
//                           onChange={(e) => setPayCustomerPayee(e.target.value)}
//                           className="w-full  "
//                         />
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0 xl:w-[100px]">
//                           วันที่ชำระ:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
//                         <DatePicker
//                           selected={payDate}
//                           dateFormat="dd/MM/yyyy"
//                           onChange={(date) => setPayDate(date)}
//                           className="w-full rounded-md border-2 border-gray-300 p-2   shadow-sm focus:border-blue-500 focus:outline-none"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center sm:flex-row ">
//                     <div className="">
//                       <Typography className="xl:w-25 sm:mr-5 sm:w-[88px] md:w-[170px] xl:mr-0">
//                         เลขที่อ้างอิงใบรับของ:
//                       </Typography>
//                     </div>
//                     <div className="mt-3 sm:mt-0 md:w-[210px] ">
//                       <Input
//                         type="text"
//                         label="เลขที่อ้างอิงใบรับของ"
//                         maxLength="15"
//                         value={payRef}
//                         onChange={(e) => setPayRef(e.target.value)}
//                         className="w-full "
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activePayMenu === "menu2" && (
//                   <div className="mt-5 flex w-full flex-col gap-4 my-4">
//                   <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
//                           ผู้รับเงิน:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
//                         <Input
//                           type="text"
//                           label="ผู้รับเงิน"
//                           maxLength="20"
//                           value={payCustomerPayee || ''}
//                           onChange={(e) =>
//                             setPayCustomerPayee(e.target.value)
//                           }
//                           className="w-full  "
//                         />
//                       </div>
//                     </div> 
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
//                           วันที่ชำระ:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[200px]">
//                         <DatePicker
//                         selected={payDate}
//                         dateFormat="dd/MM/yyyy"
//                          onChange={(date) => setPayDate(date)}
//                          className="w-full border-2 border-gray-300 rounded-md p-2   shadow-sm focus:outline-none focus:border-blue-500"
//                          />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-4 xl:gap-10 xl:flex-row ">
//                     {/* <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
//                           ธนาคาร:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
//                         <Input
//                           type="text"
//                           label="ธนาคาร"
//                           maxLength="20"
//                           value={payBank}
//                           onChange={(e) =>
//                             setPayBank(e.target.value)
//                           }
//                           className="w-full  "
//                         />
//                       </div>
//                     </div>  */}
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="sm:mr-5 sm:w-[120px] md:w-[120px] xl:mr-0 xl:w-[120px]">
//                           โอนเข้าธนาคาร:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px]  2xl:w-[210px]">
//                         <Input
//                           type="text"
//                           label="โอนเข้าธนาคาร"
//                           maxLength="15"
//                           value={payAcc || ''}
//                           onChange={(e) =>
//                             setPayAcc(e.target.value)
//                           }
//                           className="w-full "
//                         />
//                       </div>
//                     </div>
//                     <div className="flex flex-col justify-start items-center sm:flex-row mt-1  ">
//                     <div className="">
//                       <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
//                         Upload สลิป:
//                       </Typography>
//                     </div>
//                     <div className="mt-3 sm:mt-0 md:w-[250px] ">
//                       <Input
//                         type="file"
//                         label="สลิป"
//                         onChange={(e) => {
//                           const file = e.target.files[0];
//                           setSelectedFile(file);
//                         }}
//                         className="w-full "
//                       />
//                     </div>
//                   </div>
//                   </div>
//                   <div className="flex flex-col items-center sm:flex-row  ">
//                     <div className="">
//                       <Typography className="xl:w-25 sm:mr-5 sm:w-[88px] md:w-[170px] xl:mr-0">
//                       เลขที่อ้างอิงใบรับของ:
//                       </Typography>
//                     </div>
//                     <div className="mt-3 sm:mt-0 md:w-[300px]   ">
//                       <Input
//                         type="text"
//                         label="เลขที่อ้างอิงใบรับของ"
//                         maxLength="15"
//                         value={payRef || ''}
//                         onChange={(e) =>
//                           setPayRef(e.target.value)
//                         }
//                         className="w-full "
//                       />
//                     </div>
   
//                   </div>
//                 </div>
//               )}
//               {activePayMenu === "menu3" && (
//                 <div className="my-4 mt-5 flex w-full flex-col gap-4">
//                   <div className="flex flex-col gap-4 xl:flex-row xl:gap-10 ">
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
//                           ผู้รับเงิน:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
//                         <Input
//                           type="text"
//                           label="ผู้รับเงิน"
//                           maxLength="20"
//                           value={payCustomerPayee}
//                           onChange={(e) => setPayCustomerPayee(e.target.value)}
//                           className="w-full  "
//                         />
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
//                           วันที่ชำระ:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[300px] lg:w-[300px] xl:w-[200px]  2xl:w-[250px]">
//                         <DatePicker
//                           selected={payDate}
//                           dateFormat="dd/MM/yyyy"
//                           onChange={(date) => setPayDate(date)}
//                           className="w-full rounded-md border-2 border-gray-300 p-2   shadow-sm focus:border-blue-500 focus:outline-none"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-4 xl:flex-row xl:gap-10 ">
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="xl:w-25 sm:mr-5 sm:w-[80px] md:w-[120px] xl:mr-0">
//                           ธนาคาร:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px] 2xl:w-[210px]">
//                         <Input
//                           type="text"
//                           label="ธนาคาร"
//                           maxLength="20"
//                           value={payBank}
//                           onChange={(e) => setPayBank(e.target.value)}
//                           className="w-full  "
//                         />
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center sm:flex-row">
//                       <div>
//                         <Typography className="sm:mr-5 sm:w-[80px] md:w-[100px] xl:mr-0 xl:w-[100px]">
//                           เลขที่เช็ค:
//                         </Typography>
//                       </div>
//                       <div className="mt-3 sm:mt-0 md:w-[210px] lg:w-[210px] xl:w-[210px]  2xl:w-[210px]">
//                         <Input
//                           type="text"
//                           label="เลขที่เช็ค"
//                           maxLength="15"
//                           value={payCheck}
//                           onChange={(e) => setPayCheck(e.target.value)}
//                           className="w-full "
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center sm:flex-row ">
//                     <div className="">
//                       <Typography className="xl:w-25 sm:mr-5 sm:w-[88px] md:w-[170px] xl:mr-0">
//                         เลขที่อ้างอิงใบรับของ:
//                       </Typography>
//                     </div>
//                     <div className="mt-3 sm:mt-0 md:w-[300px] ">
//                       <Input
//                         type="text"
//                         label="เลขที่อ้างอิงใบรับของ"
//                         maxLength="15"
//                         value={payRef}
//                         onChange={(e) => setPayRef(e.target.value)}
//                         className="w-full "
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </Card>
//           </DialogBody>
//           <DialogFooter className=" flex justify-center py-3 ">
//             <div className="flex w-full flex-col justify-center gap-3 sm:justify-end md:flex-row">
//               <div className="flex justify-center">
//                 <Button
//                   variant="gradient"
//                   color="red"
//                   onClick={handleCloseViewPayDialog}
//                   className=" flex items-center align-middle text-base"
//                 >
//                   <span className="mr-2 flex text-xl">
//                     <GiCancel />
//                   </span>
//                   ออก
//                 </Button>
//               </div>
//               <div className="flex justify-center">
//                 <Button
//                   variant="gradient"
//                   color="purple"
//                   onClick={sendPay}
//                   className=" flex items-center align-middle text-base"
//                 >
//                   <span className="mr-2 flex text-xl">
//                     <GiCancel />
//                   </span>
//                   ใบเสร็จ
//                 </Button>
//               </div>
//             </div>
//           </DialogFooter>
//         </Dialog>

//         {/* ----  View ใบเสร็จ -------------- */}
//         <Dialog
//           open={openViewReceiptDialog1}
//           size={dialogSizeViewReceipt1}
//           handler={handleCloseViewReceiptDialog1}
//           // className="custom-dialog  h-[520px] overflow-scroll sm:h-[450px]  md:h-[500px] xl:h-auto"
//           className="custom-dialog h-full  "
//         >
//           <DialogBody>
//             <Card className=" h-full w-full ">
//               {receiptStatusId == 1 && (
//                 <div className="h-full w-full">
//                   <PDFViewer width="100%" height="600px">
//                     {reportData && (
//                       <Receipt1
//                         key={JSON.stringify(reportData)}
//                         reportData={reportData}
//                         sumTotal={sumTotal}
//                         thbText={thbText}
//                         receiptData={receiptData}
//                       />
//                     )}
//                   </PDFViewer>
//                 </div>
//               )}

//               {receiptStatusId == 2 && (
//                 <div className="h-full w-full">
//                   <PDFViewer width="100%" height="600px">
//                     {reportData && (
//                       <Receipt2
//                         key={JSON.stringify(reportData)}
//                         reportData={reportData}
//                         sumTotal={sumTotal}
//                         thbText={thbText}
//                         receiptData={receiptData}
//                       />
//                     )}
//                   </PDFViewer>
//                 </div>
//               )}

//               {receiptStatusId == 3 && (
//                 <div className="h-full w-full">
//                   <PDFViewer width="100%" height="600px">
//                     {reportData && (
//                       <Receipt3
//                         key={JSON.stringify(reportData)}
//                         reportData={reportData}
//                         sumTotal={sumTotal}
//                         thbText={thbText}
//                         receiptData={receiptData}
//                       />
//                     )}
//                   </PDFViewer>
//                 </div>
//               )}
//             </Card>
//           </DialogBody>
//           <DialogFooter className=" flex justify-center py-0  md:justify-end">
//             <Button
//               variant="text"
//               color="red"
//               onClick={handleCloseViewReceiptDialog1}
//               className=" flex items-center align-middle text-base"
//             >
//               <span className="mr-2 flex text-xl">
//                 <GiCancel />
//               </span>
//               ยกเลิก
//             </Button>
//           </DialogFooter>
//         </Dialog>
//       </Card>
//     </div>
//   );
// }
// export default Account;
