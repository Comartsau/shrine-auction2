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


import "react-datepicker/dist/react-datepicker.css";

import p01 from '../../images/รูปอาม่า01.png'
import p02 from '../../images/รูปอากง02.png'

export function Home() {
  const [startDateExcel, setStartDateExcel] = useState(new Date());
  const [endDateExcel, setEndDateExcel] = useState(new Date());

  // Data for the bar chart
  const barChartData = {
    labels: ["รายการ1", "รายการ2", "รายการ3"], // รายการแท่ง
    datasets: [
      {
        label: "จำนวน", // ชื่อเลเบล
        data: [10, 20, 15], // ข้อมูลของแท่ง
        backgroundColor: ["red", "blue", "green"], // สีของแท่ง
      },
    ],
  };

  return (
  
      <Card className="flex h-[80vh]  w-full  px-10 ">
        <div className="flex flex-col mt-10 gap-3 items-center justify-center  ">
        <Typography variant="h1" className="gradient-text1 text-center" >โปรแกรมประมูล และ บันทึกใบส่งของ </Typography>
        <Typography variant="h1" className="gradient-text1 text-center"  >สมาคมปึงเถ่ากงม่าขอนแก่น</Typography>
        </div>
          <div className="flex w-full h-full items-center justify-center gap-5 align-bottom">
            <img
              src={p01}
              className=" w-[30%] rounded-full bg-white  "
            />
            <img
              src={p02}
              className="w-[30%] rounded-full bg-white "
            />
          </div>
      </Card>

  );
}

export default Home;
