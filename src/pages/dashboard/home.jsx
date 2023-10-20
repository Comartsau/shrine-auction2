import React from "react";
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

import DatePicker from "react-datepicker"
import { Bar } from 'react-chartjs-2';




export function Home() {

  const [startDateExcel, setStartDateExcel] = useState(new Date());
  const [endDateExcel, setEndDateExcel] = useState(new Date());

  // Data for the bar chart
  const barChartData = {
    labels: ['รายการ1', 'รายการ2', 'รายการ3'], // รายการแท่ง
    datasets: [
      {
        label: 'จำนวน', // ชื่อเลเบล
        data: [10, 20, 15], // ข้อมูลของแท่ง
        backgroundColor: ['red', 'blue', 'green'], // สีของแท่ง
      },
    ],
  };


  return (
    <div className="mt-12">
       <div className="flex flex-col justify-center gap-3 align-middle md:flex-col lg:flex-row">
        <div className="flex h-[550px] w-full lg:w-[50%] ">
          <Card className=" h-auto  w-full  px-5  ">
            <div>
              <Typography>ยอดขาย(ประมูล)</Typography>
            </div>
            <div className="flex  justify-center gap-5 md:justify-start xl:gap-4">
              <div className="flex justify-center ">
                <DatePicker
                  selected={startDateExcel}
                  // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
                  // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
                  // showYearDropdown
                  // showMonthDropdown
                  // scrollableYearDropdown
                  // scrollableMonthDropdown
                  locale="th"
                  dateFormat=" วันเริ่มต้น dd/MM/yyyy"
                  label="วันสิ้นสุด"
                  onChange={(date) => setStartDateExcel(date)}
                  className="w-full rounded-md border border-gray-400 p-2 shadow-sm  text-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-center ">
                <DatePicker
                  selected={endDateExcel}
                  dateFormat="วันสิ้นสุด dd/MM/yyyy"
                  onChange={(date) => setEndDateExcel(date)}
                  className="w-full rounded-md border border-gray-400 p-2 shadow-sm  text-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex  justify-center gap-5 md:justify-start ">
              <div className="flex w-full justify-end ">
              <Button
                className="flex w-auto mt-3 items-center justify-center bg-green-500 align-middle text-base "
              >
                บัญชีลูกหนี้
              </Button>
      
              </div>
            </div>
            <div className="flex  justify-center gap-5 md:justify-start ">
              <div className="flex w-full justify-end ">
        
              </div>
            </div>

          </Card>
        </div>
        <div className="flex h-[550px] w-full lg:w-[50%] ">
          <Card className=" h-auto  w-full  px-5  ">
            <div>
              <Typography>ยอดขาย(ขายสินค้า)</Typography>
            </div>
            <div className="flex  justify-center gap-5 md:justify-start xl:gap-4">
              <div className="flex justify-center ">
                <DatePicker
                  selected={startDateExcel}
                  // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
                  // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
                  // showYearDropdown
                  // showMonthDropdown
                  // scrollableYearDropdown
                  // scrollableMonthDropdown
                  locale="th"
                  dateFormat=" วันเริ่มต้น dd/MM/yyyy"
                  label="วันสิ้นสุด"
                  onChange={(date) => setStartDateExcel(date)}
                  className="w-full rounded-md border border-gray-400 p-2 shadow-sm  text-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-center ">
                <DatePicker
                  selected={endDateExcel}
                  dateFormat="วันสิ้นสุด dd/MM/yyyy"
                  onChange={(date) => setEndDateExcel(date)}
                  className="w-full rounded-md border border-gray-400 p-2 shadow-sm  text-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex  justify-center gap-5 md:justify-start ">
              <div className="flex w-full justify-end ">
              <Button
                className="flex w-auto mt-3 items-center justify-center bg-green-500 align-middle text-base "
              >
                บัญชีลูกหนี้
              </Button>
      
              </div>
            </div>
            <div className="flex  justify-center gap-5 md:justify-start ">
              <div className="flex w-full justify-end ">
        
              </div>
            </div>

          </Card>
        </div>

        {/* content right  */}
      
      </div>
    </div>
  );
}

export default Home;
