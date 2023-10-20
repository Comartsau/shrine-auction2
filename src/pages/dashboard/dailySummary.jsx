
import {
  Card,
  Typography,
  Button,
  CardFooter,
  IconButton,
  Input,
  Select,
  Option,
  Dialog,
  Radio,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import auctionsBook from './../../images/auctionsBook.png'
import saleBook from './../../images/saleBook.png'
import { useEffect, useState } from "react";
import axios from "axios";

export function DailySummary() {

  const [dataSummary,setDataSummary] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date());

    // ---------  Token ------------------------ //
    const Token = localStorage.getItem("token");

  const fetchData = async () => {

    try {

     let  url = `${import.meta.env.VITE_APP_API}/Sum`;
     
     const response = await axios.get(url, {
     headers: {
       "Content-Type": "application/json",
       Authorization: `Token ${Token}`,
     },
   });
    console.log(response.data)
    setDataSummary(response.data)
      
    } catch (error) {
      console.error(error)
      
    }

  }

  useEffect(()=>{
    fetchData()
  },[])

    //------------- แปลง วันที่ ------------------------------------- //

    function formatDate(dateString, format) {
      const date = new Date(dateString);
  
      if (isNaN(date)) {
        return ""; // หรือค่า default ที่คุณต้องการ
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${day}/${month}/${year}`;
    }




  return (
    <div>
      <Card className="py-4 px-2">
        <div >
          <Typography>
            ยอดขายประจำวันที่: {formatDate(currentDate)}
          </Typography>
        </div>
      </Card>
      <div className="flex flex-col justify-center  items-center lg:flex-row w-full gap-3 mt-3 ">
        <div className=" flex w-[90%] md:w-[70%]  lg:w-[50%] h-[76vh] py-2 ">
          <div className="flex flex-col  w-full gap-3">
            <div className="flex w-full h-[50%]">
              <Card className="flex w-full " >
                <div className="flex gap-5 h-full justify-center  ">
                  <div className="flex flex-col w-[30%] h-full items-center  justify-center  gap-5 p-3">
                  <img src={auctionsBook} alt="auctions" />
                    เล่มประมูล
                  </div>
                  <div className="flex w-[60%] items-center justify-center">
                    <div className="flex w-full   flex-col gap-5">
                    <div className=" flex w-full  justify-end items-center px-5 gap-5">
                    <Typography className="text-xl"> เงินสด</Typography>
                    <Typography className="text-3xl text-green-500 font-bold">{Number(dataSummary?.total_price_auction_Pay).toLocaleString() || 0}</Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                    </div>
                    <div className="flex w-full justify-end items-center px-5 gap-5">
                    <Typography className=" text-xl"> เงินเชื่อ</Typography>
                    <Typography className="text-3xl font-bold">{Number(dataSummary?.total_price_auction_Dont_Pay).toLocaleString() || 0}</Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                    </div>
                    </div>
                  </div>

                </div>
              </Card>
            </div>
            <div className="flex w-full h-[50%]">
              <Card className="flex w-full " >
                <div className="flex gap-5 h-full justify-center  ">
                  <div className="flex flex-col w-[30%] h-full items-center  justify-center  gap-5 p-3">
                  <img src={saleBook} alt="auctions" />
                    เล่มขายสินค้า
                  </div>
                  <div className="flex w-[60%] items-center justify-center">
                    <div className="flex w-full   flex-col gap-5">
                    <div className=" flex w-full  justify-end items-center px-5 gap-5">
                    <Typography className="text-xl"> เงินสด</Typography>
                    <Typography className="text-3xl text-green-500 font-bold">{Number(dataSummary?.total_price_sale_Pay).toLocaleString() || 0}</Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                    </div>
                    <div className="flex w-full justify-end items-center px-5 gap-5">
                    <Typography className=" text-xl"> เงินเชื่อ</Typography>
                    <Typography className="text-3xl font-bold">{Number(dataSummary?.total_price_sale_Dont_Pay).toLocaleString() || 0}</Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                    </div>
                    </div>
                  </div>

                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex w-[90%] md:w-[70%] lg:w-[50%] h-[75vh]">
          <Card className="flex w-full ">
          <div className="flex w-full items-center justify-center mt-10">
                    <div className="flex w-full   flex-col gap-5">
                    <div className=" flex w-full  justify-center px-5 gap-5">
                    <Typography className="text-xl"> รวมข้อมูลเล่มประมูล และ เล่มขายสินค้า</Typography>
                    </div>
                    <div className=" flex w-full  justify-center items-center px-5 gap-5">
                    <Typography className="text-xl"> เงินสด</Typography>
                    <Typography className="text-3xl text-green-500 font-bold">{Number(dataSummary?.total_price_auction_sale_Pay).toLocaleString() || 0}</Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                    </div>
                    <div className="flex w-full justify-center items-center px-5 gap-5">
                    <Typography className=" text-xl"> เงินเชื่อ</Typography>
                    <Typography className="text-3xl font-bold">{Number(dataSummary?.total_price_auction_sale_Dont_Pay).toLocaleString() || 0}</Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                    </div>
                    <div className="flex w-full justify-center mt-5 ">
                      <div className=" flex w-[70%] bg-gray-500 py-[1px]"></div>
                    </div>
                    <div className="flex w-full justify-center items-center  px-5 gap-5">
                    <Typography className=" text-xl text-red-500 font-bold"> รวมเป็นเงิน</Typography>
                    <Typography className="text-3xl text-red-500  font-bold">{Number(dataSummary?.total).toLocaleString() || 0}</Typography>
                    <Typography className=" flex text-xl text-red-500 font-bold "> บาท</Typography>
                    </div>
                    
                    </div>
                  </div>
          </Card>
        </div>

      </div>


    </div>
  )
}

export default DailySummary