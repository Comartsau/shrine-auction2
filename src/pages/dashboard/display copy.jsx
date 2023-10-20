import bgImage from "../../images/bg.jpg";
import lanternRight2 from "../../images/lantern-right-2.png";
import lionright from "../../images/lion-right.gif";
import { useEffect, useState } from "react";
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

import axios from "axios";


// Socket
import io from "socket.io-client";
let socket = io.connect(`${import.meta.env.VITE_APP_API_SOCKET}`);

export function Display() {
  const [data, setData] = useState("");
  const [showTop, setShowTop] = useState([]);

  const [Title, setTitle] = useState(
    localStorage.getItem("auctionstarted_auction_topic") || ""
  );
  const [product, setProduct] = useState([]);
  const [aomsin, setAomsin] = useState([]);
  // const [customer, setCustomer] = useState(
  //   localStorage.getItem("customer") || ""
  // );
  const [customer, setCustomer] = useState("");
  const [price, setPrice] = useState(localStorage.getItem("price") || "");
  const [number, setNumber] = useState(
    localStorage.getItem("status_123") || 0
  );
  const [id, setId] = useState(localStorage.getItem("id") || "");
  const [statusA, setStatusA] = useState(
    localStorage.getItem("auctionstarted_status_A") || 0
  );
  const [statusB, setStatusB] = useState(localStorage.getItem("statusB") || 0);
  const [startAuction, setStartAuction] = useState(false);
  const [listShowTop, setListShowTop] = useState([]);
  const [winName, setWinName] = useState("");

  const Token = localStorage.getItem("token");

  // test Soket
  const [testSocket, setTestSocket] = useState(0)


  // Socket
  useEffect(() => {
    // Display_1

    socket.on("show_display_1", (newData) => {
      console.log(newData);
      newData.map((data) => {
        return setTitle(data.auctionstarted_auction_topic);
      });
      localStorage.setItem(
        "auctionstarted_auction_topic",
        newData?.[0].auctionstarted_auction_topic
      );
      localStorage.setItem("status_123", newData?.[0].status_123);
      localStorage.setItem("id_auctionstarted", newData?.[0].id_auctionstarted);
      localStorage.setItem(
        "auctionstarted_status_A",
        newData?.[0].auctionstarted_status_A
      );
      localStorage.setItem(
        "auctionstarted_status_B",
        newData?.[0].auctionstarted_status_B
      );
      // localStorage.setItem("product", JSON.stringify(newData?.[0].product));
      setStartAuction(true);
      setAomsin(newData?.[0].aomsin);
      setProduct(newData?.[0].product);
    });

    // display_3
    socket.on("show_display_3", (newData) => {
      console.log(newData);
      setListShowTop(newData.main);
      if (listShowTop) {
        localStorage.setItem("auctionstarted_status_B", 1);
      }
    });

    // number 0
    socket.on("show_number_0", (newData) => {
      localStorage.setItem("status_123", newData);
      setNumber(newData)

    });

    // number 1
    socket.on("show_number_1", (newData) => {
      localStorage.setItem("status_123", newData);
      setNumber(newData)
    });

    // number 2
    socket.on("show_number_2", (newData) => {
      localStorage.setItem("status_123", newData);
      setTestSocket(newData)
    });

    // number 3
    socket.on("show_number_3", (newData) => {
      localStorage.setItem("status_123", newData);
      // setTestSocket(newData)
      console.log(newData);

    });

    // number 4
    socket.on("show_number_4", (newData) => {
      setNumber(newData.data)
      localStorage.setItem("status_123", newData.data); //ไม่ได้ใช้ ?
      setWinName(newData?.main?.data[0]);

    });

        // number 5
        socket.on("show_number_5", (newData) => {
          setNumber(newData)
          localStorage.setItem("status_123", newData);
          localStorage.setItem("auctionstarted_status_B", "");
          setStartAuction(false);
          setListShowTop([])

        });


  }, []);

  //------ get data ------------------------ //

  // const fetchData = async () => {
  //   try {
  //     let url = `${import.meta.env.VITE_APP_API}/Show`;

  //     const response = await axios.get(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${Token}`,
  //       },
  //     });

  //     setData(response.data);
  //     setAomsin(response.data?.[0].aomsin);
  //     setProduct(response.data?.[0].product);

  //     //---------------- เก็บเข้า localStorage ---------- //
  //     localStorage.setItem(
  //       "auctionstarted_auction_topic",
  //       response.data?.[0].auctionstarted_auction_topic
  //     );
  //     localStorage.setItem("status_123", response.data?.[0].status_123);
  //     localStorage.setItem(
  //       "id_auctionstarted",
  //       response.data?.[0].id_auctionstarted
  //     );
  //     localStorage.setItem(
  //       "auctionstarted_status_A",
  //       response.data?.[0].auctionstarted_status_A
  //     );
  //     localStorage.setItem(
  //       "auctionstarted_status_B",
  //       response.data?.[0].auctionstarted_status_B
  //     );
  //     localStorage.setItem(
  //       "product",
  //       JSON.stringify(response.data?.[0].product)
  //     );
  //     setStartAuction(true);
  //   } catch (error) {
  //     setStartAuction(false);
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // console.log(data);
  // console.log(number);
  //console.log(aomsin);
  //console.log(product);

  // const fetchListTop = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_APP_API}/Show/List/Top`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Token ${Token}`,
  //         },
  //       }
  //     );
  //     console.log('777 :', response.data)
  //     setListShowTop(response.data);
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   fetchListTop();
  // }, []);

  const fetchFinish = async () => {
    // socket.emit('number_4')
    // try {
    //   const response = await axios.get(
    //     `${import.meta.env.VITE_APP_API}/Finish`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Token ${Token}`,
    //       },
    //     }
    //   );

    //   setWinName(response.data.ข้อมูล[0]);
    // } catch (error) {}
  };
  // useEffect(() => {
  //   fetchFinish();
  // }, []);

  // console.log(winName)

  // เลือกข้อมูลที่ต้องการจาก aomsin
  const selectedAomsinData = aomsin.map((item) => ({
    auction_auction_start_event: item.auction_auction_start_event,
    auction_auction_start_event_count: item.auction_auction_start_event_count,
  }));

  // เลือกข้อมูลที่ต้องการจาก product
  const selectedProductData = product.map((item) => ({
    auction_product_start_event_count: item.auction_product_start_event_count,
    product_count: item.product_count,
    product_name: item.product_name,
  }));

  // รวมข้อมูลจากทั้งสองอาร์เรย์เข้าไปในอาร์เรย์เดียวกัน
  const concatenatedProducts = [...selectedProductData];
  const concatenatedAomsin = [...selectedAomsinData];

  // console.log(concatenatedProducts);

  const concatenatedProductData = concatenatedProducts
    .map((product) => {
      return `${product.product_name} ${product.auction_product_start_event_count} ${product.product_count}`;
    })
    .join(" / ");

  const concatenatedAomsinData = concatenatedAomsin
    .map((product) => {
      return `${product.auction_auction_start_event} ${product.auction_auction_start_event_count}`;
    })
    .join(" / ");

  //console.log(concatenatedProductData);
  //console.log(concatenatedAomsinData);

  return (
    <div
      className="flex h-screen w-screen flex-col items-center  bg-red-200  "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* <h1>{number}</h1> and <br />
      <h1>{testSocket}</h1> */}
 
      {/* background */}
      <div className="z-10 flex w-full justify-between ">
        <div className=" absolute top-0 left-0 z-10 flex w-[15%]  sm:w-[17%] md:w-[13%] lg:w-[10%] xl:w-[10%]  ">
          <img src={lanternRight2} alt="lanternLeft" />
        </div>
        <div className=" absolute top-0 right-0 z-20 flex w-[15%]   sm:w-[17%] md:w-[13%] lg:w-[10%]  xl:w-[10%]">
          <img
            style={{ transform: "scaleX(-1)" }}
            src={lanternRight2}
            alt="lanternRight"
          />
        </div>
        {!startAuction == true ? (
          // --------  ขอร่วมประมูล -------------- //
          <div className="mt-40 flex w-full items-center justify-center py-6 text-center align-middle   text-3xl font-bold md:text-5xl lg:mt-40">
            <div className="flex flex-col">
              <h1 className=" mb-2 sm:mb-10">ขอเชิญร่วมการประมูล</h1>
              <h1>ของมงคลได้ค่ะ</h1>
            </div>
          </div>
        ) : (
          // ----------  เริ่มประมูล -------------- //
          <div className="flex w-full rounded-3xl  ">
            {number !== "4" ? (
              //------------ Show  ประมูล --------------------//
              <div className="flex w-full    ">
                <div className=" mx-5 mt-10 flex  overflow-y-scroll  w-full flex-col items-center   rounded-3xl bg-red-200 bg-opacity-40  h-[550px]   sm:h-[550px] md:h-[550px]  lg:h-[550px]   xl:h-[550px]">
                  <div className="flex mt-5 sm:mt-0   w-full justify-center md:mt-[10px] lg:mt-[10px] ">
                    <Typography className=" text-stroke-white  text-gradient text-center text-5xl font-bold  sm:text-7xl">
                      {Title ? Title : ""}
                    </Typography>
                  </div>
                  <div className="mt-10 flex w-[90%] justify-center  text-center font-semibold sm:mt-5 sm:text-3xl md:mt-5 lg:py-3 lg:text-3xl ">
                    {product?.length > 0 || aomsin?.length > 0 ? (
                      <div className=" z-20">
                        <Typography className="text-xl font-bold">
                          {concatenatedAomsinData}/{concatenatedProductData}
                        </Typography>
                      </div>
                    ) : (
                      <p>ของมงคล : ไม่มีรายการ</p>
                    )}
                  </div>
                  {product.length > 0 ||
                  aomsin.length > 0 ||
                  listShowTop.length > 0 ? (
                    <div></div>
                  ) : (
                    <div className="mt-10 flex flex-col items-center justify-center gap-10">
                      <Typography className="  text-center text-5xl font-bold">
                        ขอเชิญร่วมการประมูล
                      </Typography>
                      <Typography className="text-center text-5xl font-bold">
                        ของมงคลได้ค่ะ
                      </Typography>
                    </div>
                  )}

                  {Array.isArray(listShowTop) && listShowTop.length > 0 ? (
                    <div className="mt-5 flex w-full flex-col    gap-10">
                      <div className="flex w-full  flex-col items-center gap-5  md:flex-row  lg:px-[80px]  ">
                        <div className="flex w-full flex-col items-center  gap-5 md:flex-row   lg:justify-start  ">
                          <div className="flex">
                            <Typography className="flex text-2xl    md:text-5xl font-bold ">
                              {listShowTop?.[0] ? "1" : ""}.
                            </Typography>
                          </div>
                          <div>
                            <Typography className="flex w-full text-2xl    md:text-5xl    font-bold lg:justify-start ">
                              {listShowTop?.[0].user_auction}
                            </Typography>
                          </div>
                        </div>
                        <div className="flex w-auto flex-col items-center justify-center gap-5 md:flex-row lg:items-end lg:justify-end">
                          <div>
                            <Typography className="flex   text-2xl    md:text-5xl font-bold ">
                              {listShowTop?.[0].auction_result_price.toLocaleString()}
                            </Typography>
                          </div>
                          <div>
                            <Typography className="flex    text-2xl    md:text-5xl font-bold">
                              บาท
                            </Typography>
                          </div>
                        </div>
                      </div>
                      {listShowTop?.[1] ? (
                           <div className="flex w-full  flex-col items-center gap-5  md:flex-row lg:justify-between lg:px-[80px]  ">
                           <div className="flex w-full flex-col items-center justify-center  gap-5 md:flex-row   lg:justify-start  ">
                             <div className="flex">
                               <Typography className="flex text-2xl    md:text-5xl font-bold ">
                                 {listShowTop?.[1] ? "2" : ""}.
                               </Typography>
                             </div>
                             <div>
                               <Typography className="flex w-full text-2xl    md:text-5xl    font-bold lg:justify-start ">
                                 {listShowTop?.[1].user_auction}
                               </Typography>
                             </div>
                           </div>
                           <div className="flex w-auto flex-col items-center justify-center gap-5 md:flex-row lg:items-end lg:justify-end">
                             <div>
                               <Typography className="flex   text-2xl    md:text-5xl font-bold ">
                                 {listShowTop?.[1].auction_result_price.toLocaleString()}
                               </Typography>
                             </div>
                             <div>
                               <Typography className="flex    text-2xl    md:text-5xl font-bold">
                                 บาท
                               </Typography>
                             </div>
                           </div>
                         </div>
                    
                      ) : (
                        ""
                      )}
                      {listShowTop?.[2] ? (
                        <div className="flex w-full flex-col items-center gap-5 px-5 md:flex-row lg:justify-between lg:px-[80px]  ">
                          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row   lg:justify-start  ">
                            <div className="flex">
                              <Typography className="flex   text-2xl    md:text-5xl font-bold ">
                                {listShowTop?.[2] ? "3" : ""}.
                              </Typography>
                            </div>
                            <div>
                              <Typography className="flex w-fulltext-2xl    md:text-5xl     font-bold lg:justify-start ">
                                {listShowTop?.[2].user_auction}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex w-auto flex-col items-center justify-center gap-5 md:flex-row lg:items-end lg:justify-end">
                            <div>
                              <Typography className="flex   text-2xl    md:text-5xl font-bold ">
                                {listShowTop?.[2].auction_result_price.toLocaleString()}
                              </Typography>
                            </div>
                            <div>
                              <Typography className="flex   text-2xl    md:text-5xl font-bold">
                                บาท
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            ) : (
              // ---------- Show ชนะประมูล -------------------//
              <div className="flex w-full ">
                <div className="  mx-3 mt-10 flex  h-[480px]    w-full flex-col items-center justify-center overflow-y-scroll   sm:h-[480px] md:h-[480px]  lg:h-[500px]   xl:h-[500px]">
                  <div className=" z-20 mt-[220px] flex w-full justify-center sm:mt-[50px] md:mt-[10px] lg:mt-[5px] ">
                    <Typography className=" text-stroke-white text-gradient text-center text-3xl font-bold  sm:text-5xl">
                      ขอแสดงความยินดี
                    </Typography>
                  </div>

                  <div className="mt-7 flex w-[90%] items-center justify-center rounded-lg border-2 border-yellow-400 bg-red-900 text-center text-3xl text-white sm:w-[80%] sm:py-1 sm:text-5xl md:w-[60%] lg:mt-10 lg:text-6xl">
                    <Typography className="flex text-4xl">
                      {winName?.user_auction || ""}
                    </Typography>
                  </div>

                  <div className="mt-5 flex w-full flex-col items-center gap-5 px-5 md:flex-row lg:justify-between lg:px-[80px]  ">
                    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row   ">
                      <Typography className="flex    text-3xl font-bold ">
                        {winName.auction_result_auctionstarted_topic}
                      </Typography>
                    </div>
                  </div>
                  <div className="mt-5 flex w-full flex-col items-center justify-center  gap-5 px-5 md:flex-row lg:px-[80px]  ">
                    <div className=" z-20">
                      <Typography className="text-center text-xl font-bold">
                        {concatenatedAomsinData}/{concatenatedProductData}
                      </Typography>
                    </div>
                  </div>

                  <div className="z-20 mt-5 flex w-full flex-col items-center justify-center  gap-5 px-5 sm:flex-row  ">
                    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row    ">
                      <div>
                        <Typography className="flex     text-4xl font-bold ">
                          มูลค่า
                        </Typography>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row lg:items-end lg:justify-end">
                      <div>
                        <Typography className="flex   text-3xl font-bold ">
                          {winName?.auction_result_price.toLocaleString()}
                        </Typography>
                      </div>
                      <div>
                        <Typography className="flex    text-4xl font-bold">
                          บาท
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" absolute bottom-0 left-[-20px] z-10 flex w-[30%]  sm:left-[-20px] sm:w-[25%] md:left-[5px] md:w-[25%] lg:left-[-5px] lg:w-[18%] xl:left-[5px]  xl:w-[15%]  ">
                  <img
                    style={{ transform: "scaleX(-1)" }}
                    src={lionright}
                    alt="lanternLeft"
                  />
                </div>
                <div className=" absolute bottom-0 right-0 z-10 flex w-[30%]  sm:w-[25%] md:right-[5px] md:w-[25%]  lg:right-[-5px] lg:w-[18%] xl:right-[5px]  xl:w-[15%]  ">
                  <img src={lionright} alt="lanternLeft" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Show Nubmer */}
      <div
        className={` ${
          number < 1 || number > 3 || number == ""  ? "" : "bg-white shadow-lg shadow-black"
        }  md:w-30 md:h-30 absolute right-10 z-40 flex  h-20 w-20 translate-y-12  translate-x-9 items-center justify-center rounded-full sm:h-24 sm:w-24 lg:translate-x-0 lg:translate-y-12`}
      >
        {number == "1" && (
          <img
            src="/src/images/no-first.png"
            alt="first"
            style={{ width: "80%", height: "auto" }}
            className="ms-2"
          />
        )}
        {number == "2" && (
          <img
            src="/src/images/no-second.png"
            alt="first"
            style={{ width: "70%", height: "auto" }}
          />
        )}
        {number == "3" && (
          <img
            src="/src/images/no-third.png"
            alt="first"
            style={{ width: "80%", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
}

export default Display;
