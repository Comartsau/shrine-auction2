import { useState, useEffect, useMemo } from "react";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsLayoutTextWindow } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";



export function AuctionTopic() {
  const [listData,setListData] = useState([])
  
  const [newAuctionTitle, setNewAuctionTitle] = useState("");
  const [newAuctionDate, setNewAuctionDate] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  
  const handleOpenCreate = () => setOpen(!open);
  const handleOpenEdit = () => setOpen1(!open1);

  const [selectDate, setSelectDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const [selectedDate, setSelectedDate] = useState(new Date());

  // const handleChange = (date) => {
  //   setSelectedDate(date);
  // };

  
  // -----------  ออก excel  ตาม date --------------  // 
  const [startDateExcel, setStartDateExcel] = useState(new Date());
  const [endDateExcel, setEndDateExcel] = useState(new Date());
  
  // ---------  แก้ไขข้อมูล -------------- //
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // ----------------------------------------- //
  const [dialogSize, setDialogSize] = useState("xl");


  const handleEditClick = (data) => {
    setSelectedEditData(data);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedEditData(null);
    setOpenEditDialog(false);
  };


  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);
  // --------------------------------------- //

  // --------  ListItem ---------------- //
  const [selected, setSelected] = useState(1);
  const setSelectedItem = (value) => setSelected(value);



  // ----------  หัวข้อตาราง -------------- //
  const TABLE_HEAD = ["#", "ชื่อหัวข้อประมูล", "สถานะ", "วันที่สร้าง", "แก้ไข", ];
  // -------------------------------------- //

  const Token = localStorage.getItem("token");



  //------ get  Title ------------------------ //

  const fetchData = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/Title`;
  
      if (startDateExcel && endDateExcel) {
        const formattedStartDate = formatDate(startDateExcel, "DD/MM/YYYY");
        const formattedEndDate = formatDate(endDateExcel, "DD/MM/YYYY");
        url = `${import.meta.env.VITE_APP_API}/Search-Title/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
      }
  
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
  
      // console.log(response.data);
      setListData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDateExcel, endDateExcel]);
  
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
  

  //-------------- เพิ่ม หัวข้อประมูล ------------------- //
  
  const  createAuction = async () => {

    if (window.innerWidth < 768) {
      setDialogSize("xl");
    } else if (window.innerWidth < 1024) {
      setDialogSize("lg");
    } else {
      setDialogSize("md");
    }
    handleOpenCreate()
    try {
      const formattedAuctionDate = formatDate(newAuctionDate, "YYYY-MM-DD");
      const data = {
        title_auction_topic: newAuctionTitle,
        create_date_auction_topic: formattedAuctionDate
      }

      // console.log(data)
      const response = await axios.post(`${import.meta.env.VITE_APP_API}/Title`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response)
      
      setNewAuctionTitle(""); 
      setNewAuctionDate(""); 
      await fetchData()
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'เพิ่มหัวข้อประมูลเรียบร้อย',
        showConfirmButton: false,
        timer: 1500
      })
      
    } catch (error) {
      console.error("ไม่สามารถเพิ่มหัวข้อประมูลได้", error);
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มหัวข้อประมูลไม่สำเร็จ ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
    }
  }

  // ------  แก้ไขหัวข้อประมูล ------------- //
  const editAuction = async () => {
    handleCloseEditDialog();
    try {
      if (!selectedEditData) {
        console.error("No data selected for editing.");
        return;
      }

      const formattedAuctionDate = formatDate(
        selectedEditData.create_date_auction_topic,
        "YYYY-MM-DD"
      );
  
      const data = {
        title_auction_topic: selectedEditData.title_auction_topic,
        create_date_auction_topic: formatDate(
          selectedEditData.create_date_auction_topic
        ),
        status_auction_topic: selectedEditData.status_auction_topic || 0,
      };
      // console.log(data)
  
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API}/Title/${selectedEditData.auction_topic_id}/edit`,
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
        // position: 'top-end',
        icon: 'success',
        title: 'แก้ไขหัวข้อประมูลเรียบร้อย',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error("ไม่สามารถแก้ไขหัวข้อประมูลได้", error);
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขหัวข้อประมูลไม่สำเร็จ ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
    }
  };
  

  // -------------------------------------------------- //

  // ----  ออก excel ----------------------------------- //

  const exportToExcel = async () => {
    try {
      const formattedStartDate = formatDate(startDateExcel, "DD/MM/YYYY");
      const formattedEndDate = formatDate(endDateExcel, "DD/MM/YYYY");
      // console.log(formattedStartDate);
      // console.log(formattedEndDate);
  
      const url = `${import.meta.env.VITE_APP_API}/Excel-Title/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
  
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
      link.download = 'Reports_Auction_Title.xlsx'; // ตั้งชื่อไฟล์ที่จะดาวน์โหลด
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

  const checkScreenSize = () => {
    if (window.innerWidth < 540) {
      setDialogSize("xl"); // หรือเปลี่ยนเป็น "lg" หรือ "md" ตามความต้องการ
    } else if (window.innerWidth < 720) {
      setDialogSize("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
    } else if (window.innerWidth < 960) {
      setDialogSize("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
    } else if (window.innerWidth < 1024) {
      setDialogSize("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
    } else {
      setDialogSize("md"); // หรือเปลี่ยนเป็น "lg" หรือ "xl" ตามความต้องการ
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



  return (
    <div>
      {/* <p>หัวข้อประมูล</p> */}
      <div className="flex flex-col md:flex-row  gap-9 mt-3 mx-3  ">
      <div className="flex justify-center">
      <DatePicker
      selected={startDateExcel} 
      // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
      // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
      // showYearDropdown
      // showMonthDropdown
      // scrollableYearDropdown
      // scrollableMonthDropdown
      locale={th}
      dateFormat="วันเริ่มต้น dd/MM/yyyy"
      onChange={(date) => setStartDateExcel(date)}
      className="w-full border border-gray-400 rounded-md p-2   shadow-sm  text-gray-600 focus:outline-none focus:border-blue-500"
       />
      </div>
      <div className="flex justify-center">
      <DatePicker
      selected={endDateExcel}
      locale={th}
      dateFormat="วันสิ้นสุด dd/MM/yyyy"
      onChange={(date) => setEndDateExcel(date)}
      className="w-full border border-gray-400 rounded-md p-2  shadow-sm  text-gray-600 focus:outline-none focus:border-blue-500"
       />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
      <div className="flex justify-center  ">
        <Button
        fullWidth
        className="text-base flex justify-center align-middle items-center w-[200px] md:w-[200px] lg:ml-[100px]"
        onClick={handleOpenCreate}
        >
        <span className="mr-2 text-xl"><BsLayoutTextWindow /></span>
          เพิ่มหัวข้อประมูล
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
      size={dialogSize}
       handler={handleOpenCreate}
       className="custom-dialog overflow-scroll h-[520px] sm:h-[450px] "
       >
        <DialogHeader  className="text-base  text-white text-center justify-center  bg-blue-600 opacity-80">
          <div>
          เพิ่มหัวข้อประมูล
          </div>
        </DialogHeader>
        <div>
        <DialogBody divider className="px-20">
          <div 
          className="flex w-full flex-col gap-4 ">
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-28">หัวข้อประมูล:</Typography>
            </div>
            <div className="mt-3 sm:mt-0" >
            <Input
              type="text"
              label="ชื่อหัวข้อประมูล"
              maxLength="100"
              value={newAuctionTitle}
              onChange={(e) => setNewAuctionTitle(e.target.value)}
              className="w-full "
            />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div >
            <Typography className="sm:w-28">วันที่:</Typography>
            </div>
            <div className="mt-3 sm:mt-0">
            <DatePicker
            isClearable
            locale={th}
            dateFormat="dd/MM/yyyy"
            selected={newAuctionDate}
            onChange={(date) => setNewAuctionDate(date)}
            className=" border border-gray-300 rounded-md p-2  shadow-sm focus:outline-none focus:border-blue-500"
            />
            </div>
          </div>
          </div>
  </DialogBody>
  <DialogFooter className=" flex justify-center sm:justify-end gap-5 ">
    <Button variant="gradient"  color="red" onClick={handleOpenCreate} className=" flex   text-base align-middle items-center">
    <span className="flex text-xl mr-2"><GiCancel/></span>
      ยกเลิก
    </Button>
    <Button variant="gradient" color="green" onClick={createAuction} className=" text-base flex align-middle items-center">
      <span className="flex text-xl mr-2"><IoIosSave/></span>
      บันทึก
    </Button>
  </DialogFooter>

        </div>

      </Dialog>

      {/* ------------------------------------------------------------- */}

      {/* ---------------- Modal Edit ----------------------------------- */}
          <Dialog 
       open={openEditDialog}
       size={dialogSize}
       handler={handleCloseEditDialog}
       className="overflow-scroll h-[520px] sm:h-[460px] custom-dialog"
       >
        <DialogHeader className="text-base  text-white text-center justify-center  bg-blue-700 opacity-80">
          แก้ไขหัวข้อประมูล
        </DialogHeader>
        <DialogBody divider className="px-20">
          <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-28">หัวข้อประมูล:</Typography>
            </div>
            <div>
            <Input
              type="text"
              label="ชื่อหัวข้อประมูล"
              maxLength="100"
              value={selectedEditData?.title_auction_topic || ""}
              // disabled
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  title_auction_topic: e.target.value,
                })
              }
              className="w-full"
            />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-28">สถานะ:</Typography>
            </div>
            <div className="mt-4">
            <select
              value={selectedEditData?.status_auction_topic || ""}
              disabled={selectedEditData?.status_auction_topic}
              onChange={(e) =>
                setSelectedEditData({
                  ...selectedEditData,
                  status_auction_topic: Number(e.target.value),
                })
              }
              className="block  bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value={0}>ยังไม่ประมูล</option>
              <option value={1}>ประมูลแล้ว</option>
            </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div>
            <Typography className="sm:w-28">วันที่:</Typography>
            </div>
            <div>
            <DatePicker
            isClearable
            locale={th}
            disabled={selectedEditData?.status_auction_topic}
            dateFormat="dd/MM/yyyy"
            selected={
              selectedEditData?.create_date_auction_topic
                ? new Date(selectedEditData.create_date_auction_topic)
                : null
            } 
            onChange={(date) =>
              setSelectedEditData({
                ...selectedEditData,
                create_date_auction_topic: date,
              })
            }
            className="border border-gray-300 rounded-md p-2  shadow-sm focus:outline-none focus:border-blue-500"
            />
            </div>
          </div>
       
          </div>
  </DialogBody>
  <DialogFooter className=" flex justify-center mt-[10px] sm:mt-[40px] gap-5">
    <Button variant="gradient" color="red" onClick={handleCloseEditDialog} className="mr-1  text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><GiCancel/></span>
      ยกเลิก
    </Button>
    <Button variant="gradient" color="green" onClick={editAuction} className=" text-base flex align-middle items-center">
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
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                        {data.title_auction_topic || ''}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.status_auction_topic == 0 ? "ยังไม่ประมูล" : "ประมูลแล้ว" }
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(data.create_date_auction_topic, "DD/MM/YYYY") || ''}
                        {/* {data.create_date_auction_topic} */}
                      </Typography>
                    </td>
                    <td className={classes}>
                        <IconButton 
                        variant="text"
                        onClick={() => handleEditClick(data)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
          
                    </td>
                  </tr>
                );
              },
            )}
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

export default AuctionTopic