import { Button, Card, Typography } from "@material-tailwind/react";
import auctionsBook from "./../../images/auctionsBook.png";
import saleBook from "./../../images/saleBook.png";
import { useEffect, useState } from "react";
import axios from "axios";
import DailySummaryProduct from "./DailySummaryProduct";

export function DailySummary() {
  const [dataSummary, setDataSummary] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [statusPage, setStatusPage] = useState(1);

  // ---------  Token ------------------------ //
  const Token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/Sum`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response.data)
      setDataSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <div>
          <Typography>
            {statusPage === 1 && "สรุปยอดขายประจำวันที่ : "}
            {statusPage === 2 && "สรุปของมงคลประจำวัน : "}
             {formatDate(currentDate)}
          </Typography>
        </div>
      </Card>

      <div className="mt-4 flex flex-col  gap-4 md:flex-row">
        <Button className="text-md" variant={statusPage === 1 ? "outlined": "filled"} onClick={()=>setStatusPage(1)}>สรุปยอดขายประจำวัน</Button>
        <Button className="text-md"  variant={statusPage === 2 ? "outlined": "filled"}onClick={()=>setStatusPage(2)}>สรุปของมงคลประจำวัน</Button>
      </div>

      {statusPage === 2 && <DailySummaryProduct />}

      {statusPage === 1 && (
        <div className="mt-3 flex w-full  flex-col items-center justify-center gap-3 lg:flex-row ">
          <div className=" flex h-[76vh] w-[90%]  py-2 md:w-[70%] lg:w-[50%] ">
            <div className="flex w-full  flex-col gap-3">
              <div className="flex h-[50%] w-full">
                <Card className="flex w-full ">
                  <div className="flex h-full justify-center gap-5  ">
                    <div className="flex h-full w-[30%] flex-col items-center  justify-center  gap-5 p-3">
                      <img src={auctionsBook} alt="auctions" />
                      เล่มประมูล
                    </div>
                    <div className="flex w-[60%] items-center justify-center">
                      <div className="flex w-full   flex-col gap-5">
                        <div className=" flex w-full  items-center justify-end gap-5 px-5">
                          <Typography className="text-xl"> เงินสด</Typography>
                          <Typography className="text-3xl font-bold text-green-500">
                            {Number(
                              dataSummary?.total_price_auction_Pay
                            ).toLocaleString() || 0}
                          </Typography>
                          <Typography className=" flex text-xl ">
                            {" "}
                            บาท
                          </Typography>
                        </div>
                        <div className="flex w-full items-center justify-end gap-5 px-5">
                          <Typography className=" text-xl">
                            {" "}
                            เงินเชื่อ
                          </Typography>
                          <Typography className="text-3xl font-bold">
                            {Number(
                              dataSummary?.total_price_auction_Dont_Pay
                            ).toLocaleString() || 0}
                          </Typography>
                          <Typography className=" flex text-xl ">
                            {" "}
                            บาท
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex h-[50%] w-full">
                <Card className="flex w-full ">
                  <div className="flex h-full justify-center gap-5  ">
                    <div className="flex h-full w-[30%] flex-col items-center  justify-center  gap-5 p-3">
                      <img src={saleBook} alt="auctions" />
                      เล่มขายสินค้า
                    </div>
                    <div className="flex w-[60%] items-center justify-center">
                      <div className="flex w-full   flex-col gap-5">
                        <div className=" flex w-full  items-center justify-end gap-5 px-5">
                          <Typography className="text-xl"> เงินสด</Typography>
                          <Typography className="text-3xl font-bold text-green-500">
                            {Number(
                              dataSummary?.total_price_sale_Pay
                            ).toLocaleString() || 0}
                          </Typography>
                          <Typography className=" flex text-xl ">
                            {" "}
                            บาท
                          </Typography>
                        </div>
                        <div className="flex w-full items-center justify-end gap-5 px-5">
                          <Typography className=" text-xl">
                            {" "}
                            เงินเชื่อ
                          </Typography>
                          <Typography className="text-3xl font-bold">
                            {Number(
                              dataSummary?.total_price_sale_Dont_Pay
                            ).toLocaleString() || 0}
                          </Typography>
                          <Typography className=" flex text-xl ">
                            {" "}
                            บาท
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex h-[75vh] w-[90%] md:w-[70%] lg:w-[50%]">
            <Card className="flex w-full ">
              <div className="mt-10 flex w-full items-center justify-center">
                <div className="flex w-full   flex-col gap-5">
                  <div className=" flex w-full  justify-center gap-5 px-5">
                    <Typography className="text-xl">
                      {" "}
                      รวมข้อมูลเล่มประมูล และ เล่มขายสินค้า
                    </Typography>
                  </div>
                  <div className=" flex w-full  items-center justify-center gap-5 px-5">
                    <Typography className="text-xl"> เงินสด</Typography>
                    <Typography className="text-3xl font-bold text-green-500">
                      {Number(
                        dataSummary?.total_price_auction_sale_Pay
                      ).toLocaleString() || 0}
                    </Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                  </div>
                  <div className="flex w-full items-center justify-center gap-5 px-5">
                    <Typography className=" text-xl"> เงินเชื่อ</Typography>
                    <Typography className="text-3xl font-bold">
                      {Number(
                        dataSummary?.total_price_auction_sale_Dont_Pay
                      ).toLocaleString() || 0}
                    </Typography>
                    <Typography className=" flex text-xl "> บาท</Typography>
                  </div>
                  <div className="mt-5 flex w-full justify-center ">
                    <div className=" flex w-[70%] bg-gray-500 py-[1px]"></div>
                  </div>
                  <div className="flex w-full items-center justify-center  gap-5 px-5">
                    <Typography className=" text-xl font-bold text-red-500">
                      {" "}
                      รวมเป็นเงิน
                    </Typography>
                    <Typography className="text-3xl font-bold  text-red-500">
                      {Number(dataSummary?.total).toLocaleString() || 0}
                    </Typography>
                    <Typography className=" flex text-xl font-bold text-red-500 ">
                      {" "}
                      บาท
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailySummary;
