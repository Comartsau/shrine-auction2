import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";

const ExcelProduct = ({ handleOpen, open, type }) => {
  const [dataSend, setDataSend] = useState({});
  const [message, setMessage] = useState(false)
  let url;

  const handleAddData = (e) => {
    setDataSend((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleExcel = async () => {

    if (type) {
        url = `/Check/excel/?type_Data=${type}`
        if (dataSend?.category){
            url = `/Check/excel/?type_Data=${type}&category=${dataSend?.category}`
        }

        if(dataSend?.start_date || dataSend?.end_date ){
            url = `/Check/excel/?type_Data=${type}&start_date=${dataSend?.start_date}&end_date=${dataSend?.end_date}`
        }

        if(dataSend?.category || dataSend?.start_date || dataSend?.end_date ){
            url = `/Check/excel/?type_Data=${type}&category=${dataSend?.category}&start_date=${dataSend?.start_date}&end_date=${dataSend?.end_date}`
        }
    }
    try {
      const Token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}${url}`,
        {
          responseType: "blob", // ระบุ responseType เป็น 'blob'
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Reports.xlsx"; // ตั้งชื่อไฟล์ที่จะดาวน์โหลด
      link.click();
      URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      setMessage(true)
      setTimeout(()=>{
        setMessage(false)
      },3000)
      console.log(error);
    }
  };
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader className="bg-gray-200">
         รายการของมงคล 
         
         {type === 1 && " (รายการประมูล)"}
         {type === 2 && " (รายการขายสินค้า)"}
         </DialogHeader>
      <DialogBody>
        <div className="  w-full p-4">

          <div>
            <select
              onChange={(e) => handleAddData(e)}
              name="category"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">ทั้งหมด</option>
              <option value="วัตถุมงคล">วัตถุมงคล</option>
              <option value="โทรศัพท์">โทรศัพท์</option>
              <option value="เครื่องใช้สำนักงาน">เครื่องใช้สำนักงาน</option>
              <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
          <div className="mt-4 flex flex-col justify-center gap-10 md:flex-row lg:flex-row">
            <div className="w-full">
              <Input
                onChange={(e) => handleAddData(e)}
                label="Username"
                type="date"
                name="start_date"
              />
            </div>
            <div className="w-full">
              <Input
                onChange={(e) => handleAddData(e)}
                label="Username"
                type="date"
                name="end_date"
              />
            </div>
          </div>
         
          <div className="mt-4 flex flex-col justify-end gap-4 md:flex-row lg:flex-row">
          {message && <p className="text-red-500 font-bold">ไม่พบข้อมูล ** </p>}
            <Button color="green" onClick={handleExcel}>
              Excel
            </Button>
          </div>

  
        </div>

        {/* 
        <div className="flex flex-col md:flex-row gap-4 mt-4">

      

          <div className="w-full">
            <Input label="Username" type="date" />
          </div>

          <div className="w-full">
            <Input label="Username"  type="date" />
          </div>
        </div> */}
      </DialogBody>
      {/* <DialogFooter>
   
        <Button variant="filled" color="gray" onClick={handleOpen}>
          <span>ออก</span>
        </Button>
      </DialogFooter> */}
    </Dialog>
  );
};

export default ExcelProduct;
