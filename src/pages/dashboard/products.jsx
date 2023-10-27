import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { BsCart3 } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
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
  Select,
  Option
} from "@material-tailwind/react";
import axios from "axios";

export function Products() {
 
  const [listData,setListData] = useState([])
  const [searchQueryName, setSearchQueryName] = useState("");
  const [searchQueryCategory, setSearchQueryCategory] = useState("");
  const [noData,setNoData] = useState(true)

  const [newProductName, setNewProductName] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");



  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  
  const handleOpenCreate = () => setOpen(!open);
  // const handleOpenEdit = () => setOpen1(!open1);
  
  // ---------  แก้ไขข้อมูล -------------- //
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // ----------------------------------------- //


  //  ----  control size Dialog ----------------------- // 
  const [dialogSizeCreate, setDialogSizeCreate] = useState("xl");
  const [dialogSizeEdit, setDialogSizeEdit] = useState("xl");

  // ---------  Token ------------------------ //
  const Token = localStorage.getItem("token");


  // --------- เก็บข้อมูล / เปิด Dialog ------------- //


  const handleEditClick = (data) => {
    setSelectedEditData(data);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedEditData(null);
    setOpenEditDialog(false);
  };

    // ---------  ปรับแต่งขนาด  Dialog ------------ //

    const checkScreenSize = () => {
      if (window.innerWidth < 540) {
        setDialogSizeCreate("xl"); // หรือเปลี่ยนเป็น "lg" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("xl"); // หรือเปลี่ยนเป็น "lg" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 730) {
        setDialogSizeCreate("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("xl"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 960) {
        setDialogSizeCreate("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 1140) {
        setDialogSizeCreate("md"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("lg"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else if (window.innerWidth < 1320) {
        setDialogSizeCreate("md"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
        setDialogSizeEdit("md"); // หรือเปลี่ยนเป็น "xl" หรือ "md" ตามความต้องการ
      } else {
        setDialogSizeCreate("xs"); // หรือเปลี่ยนเป็น "lg" หรือ "xl" ตามความต้องการ
        setDialogSizeEdit("md"); // หรือเปลี่ยนเป็น "lg" หรือ "xl" ตามความต้องการ
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
      let url = `${import.meta.env.VITE_APP_API}/Product`;
      // let url = "http://26.125.18.207:8000/Product";
  
      if (searchQueryName || searchQueryCategory) {
        // console.log(searchQueryName)
        // console.log(searchQueryCategory)
        url = `${import.meta.env.VITE_APP_API}/Search-Product/?search=${searchQueryName},${searchQueryCategory}`;
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
  }, [searchQueryName,searchQueryCategory]);


  //-------------- เพิ่มสินค้า ------------------- //
  
   const  createNewProduct = async () => {

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
      // console.log(response)
      setNewProductName(""); 
      setNewProductCount(""); 
      setNewProductCategory(""); 
      handleOpenCreate()
      checkScreenSize();
      await fetchData()
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'เพิ่มสินค้าเรียบร้อย',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      handleOpenCreate()
      checkScreenSize();
      console.error("ไม่สามารถเพิ่มสินค้าได้", error);
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มสินค้าไม่สำเร็จ ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
    }
  }


  // ------  แก้ไขหัวข้อสินค้า ------------- //
  const editProduct = async () => {
    try {
      if (!selectedEditData) {
        console.error("No data selected for editing.");
        return;
      }

      // console.log(selectedEditData)
      const data = {
        product_name:selectedEditData.product_name,
        product_count:selectedEditData.product_count,
        product_category:selectedEditData.product_category
      };
      // console.log(data)

      // console.log(Token)
  
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
  
      // console.log(response);
      handleCloseEditDialog();
      await fetchData();
      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'แก้ไขสินค้าเรียบร้อย',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error("ไม่สามารถแก้ไขสินค้าได้", error);
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขสินค้าไม่สำเร็จ ',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
    }
  };
  
  // -------------------------------------------------- //

  // -----  ลบสินค้า  ------------------------//

  const  deleteProduct = async  (data) => {

    const id = data.id

    // console.log(id)
    // console.log(data)
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_APP_API}/Product/${id}/delete`,
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
            title: 'ลบสินค้าเรียบร้อย',
            showConfirmButton: false,
            timer: 1500
          })
          
        } catch (error) {
          console.error("ไม่สามารถลบสินค้าได้", error);
          Swal.fire({
            icon: 'error',
            title: 'ลบสินค้าไม่สำเร็จ ',
            text: 'กรุณาลองใหม่อีกครั้ง',
            confirmButtonText: 'ตกลง',
          });
        }
  }

  // ----  ออก excel ----------------------------------- //

  const exportToExcel = async () => {
    try {

      let url = `${import.meta.env.VITE_APP_API}/Excel-Product/`;

      if (searchQueryName || searchQueryCategory) {
      // console.log(searchQueryName)
      // console.log(searchQueryCategory)

      url = `${import.meta.env.VITE_APP_API}/Excel-Product/?search=${searchQueryName},${searchQueryCategory}`;
      }
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
    {/* <p>ข้อมูลสินค้า</p> */}
    <div className="flex flex-col md:flex-row justify-center  md:justify-start gap-9 mt-3 mx-3 ">
      <div className="flex flex-col md:flex-row ">
      <div className="flex flex-col justify-center md:flex-row  items-center gap-9">
      <div className="flex justify-center items-center">
    <Input
      type="text"
      label="ค้นหาด้วยชื่อ"
      value={searchQueryName}
      onChange={(e) => setSearchQueryName(e.target.value)}
      className="w-full py-2"
    />
    </div>
    <div className="flex justify-center items-center  ">
    <Select
              label="ค้นหาด้วยหมวดหมู่"
              onChange={(e) =>{
                // console.log(e)
                setSearchQueryCategory(e)
              } 
            }
                
            >
              <Option value="">ทั้งหมด</Option>
              <Option value="สลากออมสิน">สลากออมสิน</Option>
              <Option value="ล็อตเตอรี่">ล็อตเตอรี่</Option>
              <Option value="วัตถุมงคล">วัตถุมงคล</Option>
              <Option value="โทรศัพท์">โทรศัพท์</Option>
              <Option value="เครื่องใช้สำนักงาน">เครื่องใช้สำนักงาน</Option>
              <Option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</Option>
              <Option value="อื่นๆ">อื่นๆ</Option>
    </Select>
    </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-center gap-9 mt-5 items-center md:mt-0 mx-3  ">
    <div className="flex  flex-col lg:flex-row gap-9">
    <div className="flex justify-center ">
      <Button
      fullWidth
      className="text-base flex justify-center align-middle items-center w-[200px] md:w-[170px] lg:w-[180px] "
      onClick={handleOpenCreate}
      >
      <span className="mr-2 text-xl"><BsCart3 /></span>
        เพิ่มสินค้า
      </Button>
    </div>
    <div className="flex justify-center">
      <Button
      fullWidth
      className="text-base flex justify-center align-middle items-center w-[200px] md:w-[170px] lg:w-[180px]     bg-green-500"
      onClick={exportToExcel}
      >
        <span className="mr-2 text-xl"><SiMicrosoftexcel/></span>
        Excel
      </Button>
    </div>
    </div>
    </div>
      </div>
 
    {/* ---------------- Modal Create ----------------------------------- */}
    <Dialog open={open}
    size={dialogSizeCreate}
     handler={handleOpenCreate}
     className="custom-dialog  h-[450px]  xl:h-[450px] overflow-scroll "
     >
      <DialogHeader className="text-base text-white  justify-center bg-blue-700 opacity-80">
        <div>
        เพิ่มสินค้า
        </div>
      </DialogHeader>
      <div>
      <DialogBody divider className="px-5 sm:px-5 md:px-[50px] lg:px-5 xl:px-5  ">
        <div className="flex w-full flex-col gap-4 ">
        <div className="flex flex-col sm:flex-row items-center">
          <div>
          <Typography className="sm:w-[80px] xl:w-25 sm:mr-5 xl:mr-0">ชื่อสินค้า:</Typography>
          </div>
          <div className="mt-3 sm:mt-0  " >
          <Input
            type="text"
            label="ชื่อสินค้า"
            value={newProductName || ""}
            maxLength="100"
            onChange={(e) => setNewProductName(e.target.value)}
            className="w-full "
          />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center ">
          <div>
          <Typography className="sm:w-[80px]  xl:w-25 sm:mr-5 xl:mr-0">หน่วยนับ:</Typography>
          </div>
          <div className="mt-3 sm:mt-0 w-full  " >
                <Input
            type="text"
            maxLength="20"
            label="หน่วยนับ"
            value={newProductCount || ""}
            onChange={(e) => {
              // console.log(e);
              setNewProductCount((e.target.value))
            }
          }
           
            className="w-full "
          />

          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <div >
          <Typography className="sm:w-[80px]  xl:w-25 sm:mr-5 xl:mr-0">หมวดหมู่:</Typography>
          </div>
          <div className="mt-3 sm:mt-0 w-full  " >
          <Select
              // value={newProductCategory || ""}
              label="หมวดหมู่"
              value={newProductCategory || ""}
              onChange={(e)=> {
                // console.log(e)
                setNewProductCategory(e)
              }
              }
              // onChange={handleNewProductCategory}
            >
              <Option value="">-</Option>
              {/* <Option value="">ทั้งหมด</Option> */}
              <Option value="สลากออมสิน">สลากออมสิน</Option>
              <Option value="ล็อตเตอรี่">ล็อตเตอรี่</Option>
              <Option value="วัตถุมงคล">วัตถุมงคล</Option>
              <Option value="โทรศัพท์">โทรศัพท์</Option>
              <Option value="เครื่องใช้สำนักงาน">เครื่องใช้สำนักงาน</Option>
              <Option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</Option>
              <Option value="อื่นๆ">อื่นๆ</Option>
          </Select>
          </div>
        </div>

    
        </div>
      </DialogBody>
<DialogFooter className=" flex justify-center xl:justify-end mt-[10px] gap-5  ">
  <Button variant="gradient" color="red" onClick={handleOpenCreate} className=" flex  text-base align-middle items-center">
  <span className="flex text-xl mr-2"><GiCancel/></span>
    ยกเลิก
  </Button>
  <Button variant="gradient" color="green" onClick={createNewProduct} className=" text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><IoIosSave/></span>
    บันทึก
  </Button>
</DialogFooter>
      </div>
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
          <Typography className="text-xl">แก้ไขสินค้า</Typography>
          <Typography className="text-xl">{selectedEditData?.customer_name || ""}</Typography>
        </div>
      </DialogHeader>
      <DialogBody divider className="px-5 sm:px-5 md:px-[50px] lg:px-5 xl:px-5  ">
        <div className="flex w-full flex-col gap-4 ">
        <div className="flex flex-col sm:flex-row items-center">
          <div>
          <Typography className="sm:w-[80px] xl:w-25 sm:mr-5 xl:mr-0">ชื่อสินค้า:</Typography>
          </div>
          <div className="mt-3 sm:mt-0  " >
          <Input
            type="text"
            label="ชื่อสินค้า"
            maxLength="100"
            value={selectedEditData?.product_name || ""}
            onChange={(e) =>
              {
                setSelectedEditData({
                  ...selectedEditData,
                  product_name: e.target.value,
                })
              }
           
            }
            className="w-full "
          />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center ">
          <div>
          <Typography className="sm:w-[80px]  xl:w-25 sm:mr-5 xl:mr-0">หน่วยนับ:</Typography>
          </div>
          <div className="mt-3 sm:mt-0 w-full  " >
          <Input
              type="text"
              value={selectedEditData?.product_count || ""}
              maxLength="20"
              label="หน่วยนับ"
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
        <div className="flex flex-col sm:flex-row items-center">
          <div >
          <Typography className="sm:w-[80px]  xl:w-25 sm:mr-5 xl:mr-0">หมวดหมู่:</Typography>
          </div>
          <div className="mt-3 sm:mt-0 w-full  " >
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
              <Option value="สลากออมสิน">สลากออมสิน</Option>
              <Option value="ล็อตเตอรี่">ล็อตเตอรี่</Option>
              <Option value="วัตถุมงคล">วัตถุมงคล</Option>
              <Option value="โทรศัพท์">โทรศัพท์</Option>
              <Option value="เครื่องใช้สำนักงาน">เครื่องใช้สำนักงาน</Option>
              <Option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</Option>
              <Option value="อื่นๆ">อื่นๆ</Option>
          </Select>
          </div>
        </div>
        </div>
      </DialogBody>
<DialogFooter className=" flex justify-center  lg:justify-end mt-[10px] sm:mt-[40px] gap-5">
  <Button variant="gradient" color="red" onClick={handleCloseEditDialog} className="mr-1  text-base flex align-middle items-center">
  <span className="flex text-xl mr-2"><GiCancel/></span>
    ยกเลิก
  </Button>
  <Button variant="gradient" color="green" onClick={editProduct} className=" text-base flex align-middle items-center">
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
              <td className="expanded-row " colSpan="5">
                <Typography className="flex justify-center mt-3 ">...ไม่พบข้อมูล...</Typography>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
                        {pageIndex + 1 || ""}
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
                      <div >
                      <IconButton 
                      variant="text"
                      onClick={() => handleEditClick(data)}
                    
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>  
                      </div>
                      {/* <div>
                      <IconButton 
                      variant="text"
                      onClick={() => deleteProduct(data)}
                      >
                        <AiFillDelete className="h-4 w-4" />
                      </IconButton>
                      </div> */}
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

export default Products