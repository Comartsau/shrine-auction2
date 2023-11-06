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
  Image
} from "@material-tailwind/react";

import p01 from '../../images/รูปอาม่า01.png'
import p02 from '../../images/รูปอากง02.png'

import no1 from '../../images/no-first.png'
import no2 from '../../images/no-second.png'
import no3 from '../../images/no-third.png'



// Socket
import io from "socket.io-client";
let socket = io.connect(`${import.meta.env.VITE_APP_API_SOCKET}`);

export function Display() {

  // const [showTop, setShowTop] = useState([]);


  const [Title, setTitle] = useState(localStorage.getItem("auctionstarted_auction_topic") || "");
  const [product, setProduct] = useState([]);
  const [aomsin, setAomsin] = useState([]);
  // const [customer, setCustomer] = useState(
  //   localStorage.getItem("customer") || ""
  // );

  const [number, setNumber] = useState(
    localStorage.getItem("status_123") || 0
  );
  const [id, setId] = useState(localStorage.getItem("id") || "");
  const [statusA, setStatusA] = useState(0);
  const [statusB, setStatusB] = useState(0);
  const [startAuction, setStartAuction] = useState(false);
  const [listShowTop, setListShowTop] = useState([]);
  const [customer1Name, setCustomer1Name] = useState('');
  const [customer1Price, setCustomer1Price] = useState('');
  const [customer2Name, setCustomer2Name] = useState('');
  const [customer2Price, setCustomer2Price] = useState('');
  const [customer3Name, setCustomer3Name] = useState('');
  const [customer3Price, setCustomer3Price] = useState('');
  const [winName, setWinName] = useState('');
  const [winPrice, setWinPrice] = useState('');
  const [productData, setProductData] = useState('');
  const [aomsinData, setAomsinData] = useState('');

  const Token = localStorage.getItem("token");

  // test Soket
  const [testSocket, setTestSocket] = useState(0)

  useEffect(()=>{
   
    setTitle(localStorage.getItem("auctionstarted_auction_topic"))
    setStartAuction(localStorage.getItem("startAuction"))
    setStatusB(localStorage.getItem("auctionstarted_status_B"))
    setCustomer1Name(localStorage.getItem("customer1_name"))
    setCustomer1Price(localStorage.getItem("customer1_price"))
    setCustomer2Name(localStorage.getItem("customer2_name"))
    setCustomer2Price(localStorage.getItem("customer2_price"))
    setCustomer3Name(localStorage.getItem("customer3_name"))
    setCustomer3Price(localStorage.getItem("customer3_price"))
    setAomsinData(localStorage.getItem('aomsin'))
    setProductData(localStorage.getItem('product'))
    setWinName(localStorage.getItem('winname'))


  },[])
  // console.log(startAuction)
  // console.log(statusB)

  // const test01 = (newData)=>{
  //   console.log('test01' , newData);
  // }




  // Socket
  useEffect(() => {

    // Display_1
    socket.on("show_display_1", (newData) => {
      // console.log(newData)
      newData.map((data) => {return setTitle(data.auctionstarted_auction_topic);});
      localStorage.setItem("auctionstarted_auction_topic",newData?.[0].auctionstarted_auction_topic);
      localStorage.setItem("status_123", newData?.[0].status_123);
      localStorage.setItem("id_auctionstarted", newData?.[0].id_auctionstarted);
      localStorage.setItem("auctionstarted_status_A",newData?.[0].auctionstarted_status_A);
      localStorage.setItem("auctionstarted_status_B",newData?.[0].auctionstarted_status_B);
      // localStorage.setItem("product", JSON.stringify(newData?.[0].product));
      setStartAuction(true);
      localStorage.setItem("startAuction", true )
      
      // console.log(newData);
      if(newData?.[0].aomsin){
        setAomsin(newData?.[0].aomsin);
      }
      if(newData?.[0].product) {
        setProduct(newData?.[0].product);
      }

    });

    // display_3
    socket.on("show_display_3", (newData) => {
      // console.log(newData);
      setListShowTop(newData.main);
      if (listShowTop) {
        localStorage.setItem("auctionstarted_auction_topic", newData.main?.[0]?.auction_result_auctionstarted);
        setTitle(newData.main?.[0]?.auction_result_auctionstarted)
        localStorage.setItem("startAuction", true )
        setStartAuction(true);
        localStorage.setItem("auctionstarted_status_B", 1);
        setStatusB(1)
        localStorage.setItem("customer1_name", newData.main?.[0]?.user_auction || '');
        setCustomer1Name(newData.main?.[0]?.user_auction)
        localStorage.setItem("customer1_price", newData.main?.[0]?.auction_result_price || '');
        setCustomer1Price(newData.main?.[0]?.auction_result_price)
        localStorage.setItem("customer2_name", newData.main?.[1]?.user_auction || '');
        setCustomer2Name(newData.main?.[1]?.user_auction)
        localStorage.setItem("customer2_price", newData.main?.[1]?.auction_result_price || '');
        setCustomer2Price(newData.main?.[1]?.auction_result_price)
        localStorage.setItem("customer3_name", newData.main?.[2]?.user_auction || '');
        setCustomer3Name(newData.main?.[2]?.user_auction)
        localStorage.setItem("customer3_price", newData.main?.[2]?.auction_result_price || '');
        setCustomer3Price(newData.main?.[2]?.auction_result_price)

        if(newData?.[0].aomsin){
          setAomsin(newData?.[0].aomsin);
        }
        if(newData?.[0].product) {
          setProduct(newData?.[0].product);
        }
  
      }
    });

    // console.log(listShowTop)

    // number 0
    socket.on("show_number_0", (newData) => {
      // console.log(newData)
      // localStorage.setItem("status_123", newData);
      // setNumber(newData)

      

    });

    // number 1
    socket.on("show_number_1", (newData) => {
      // console.log(newData.number)

      localStorage.setItem("status_123", newData.number);
      setNumber(newData.number)
      if (listShowTop) {
        // console.log('aaaaaa')
        localStorage.setItem("auctionstarted_auction_topic", newData.main?.[0]?.auction_result_auctionstarted);
        setTitle(newData.main?.[0]?.auction_result_auctionstarted)
        localStorage.setItem("startAuction", true )
        setStartAuction(true);
        localStorage.setItem("auctionstarted_status_B", 1);
        setStatusB(1)
        localStorage.setItem("customer1_name", newData.main?.[0]?.user_auction || '');
        setCustomer1Name(newData.main?.[0]?.user_auction)
        localStorage.setItem("customer1_price", newData.main?.[0]?.auction_result_price || '');
        setCustomer1Price(newData.main?.[0]?.auction_result_price)
        localStorage.setItem("customer2_name", newData.main?.[1]?.user_auction || '');
        setCustomer2Name(newData.main?.[1]?.user_auction)
        localStorage.setItem("customer2_price", newData.main?.[1]?.auction_result_price || '');
        setCustomer2Price(newData.main?.[1]?.auction_result_price)
        localStorage.setItem("customer3_name", newData.main?.[2]?.user_auction || '');
        setCustomer3Name(newData.main?.[2]?.user_auction)
        localStorage.setItem("customer3_price", newData.main?.[2]?.auction_result_price || '');
        setCustomer3Price(newData.main?.[2]?.auction_result_price)

        if(newData?.[0].aomsin){
          setAomsin(newData?.[0].aomsin);
        } 
        if(newData?.[0].product) {
          setProduct(newData?.[0].product);
        }
      }
    });
      

    // number 2
    socket.on("show_number_2", (newData) => {
      // console.log(newData)
    
      // localStorage.setItem("status_123", newData);
      // setTestSocket(newData)
      // test01(newData)
    });

    // number 3
    socket.on("show_number_3", (newData) => {
      // console.log(newData)
     
      // localStorage.setItem("status_123", newData);
      // setTestSocket(newData)

    });

    // number 4
    socket.on("show_number_4", (newData) => {
      // console.log(newData)
      localStorage.setItem("status_123", newData.data);
      setNumber(newData.data)
      localStorage.setItem("winname", newData.main.data[0].user_auction);
      setWinName(newData.main.data[0].user_auction);
      localStorage.setItem("winprice", newData.main.data[0].auction_result_price);
      setWinName(newData.main.data[0].auction_result_price);
      localStorage.setItem("auctionstarted_auction_topic", newData.main.data[0].auction_result_auctionstarted_topic);


    });


        // number 5
        socket.on("show_number_5", (newData) => {
          setNumber(newData)
          setStartAuction(false);
          localStorage.removeItem("auctionstarted_auction_topic");
          localStorage.removeItem("status_123");
          localStorage.removeItem("auctionstarted_status_A");
          localStorage.removeItem("auctionstarted_status_B");
          localStorage.removeItem("startAuction");
          localStorage.removeItem("id_auctionstarted");
          localStorage.removeItem("customer1_name");
          setCustomer1Name('')
          localStorage.removeItem("customer1_price");
          setCustomer1Price('')
          localStorage.removeItem("customer2_name");
          setCustomer2Name('')
          localStorage.removeItem("customer2_price");
          setCustomer2Price('')
          localStorage.removeItem("customer3_name");
          setCustomer3Name('')
          localStorage.removeItem("customer3_price");
          setCustomer3Price('')
          setProduct([])
          setAomsin([])
          localStorage.removeItem("winname");
          localStorage.removeItem("winprice");
          localStorage.removeItem("aomsin");
          localStorage.removeItem("product");
          setListShowTop([])

        });

  }, []);


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

    if (concatenatedAomsin.length > 0) {
      localStorage.setItem('aomsin', concatenatedAomsinData)
    }

    if(concatenatedProducts.length > 0) {
      localStorage.setItem('product', concatenatedProductData )
    }
    
  // console.log(concatenatedProductData);
  // console.log(concatenatedAomsinData);

  return (
    <div
      className="flex h-screen w-screen flex-col items-center   bg-red-200  "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        fontFamily:"'Mitr', sans-serif" 
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
        {!startAuction == true || '' ? (
          // --------  ขอร่วมประมูล -------------- //
          <div className="mt-40 flex w-full items-center justify-center py-6 text-center align-middle   text-3xl font-bold md:text-5xl lg:mt-40">
            <div className="flex flex-col gradient-text3">
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
                <div className=" mx-14 mt-20 flex  overflow-y-scroll xl:overflow-y-hidden  w-full flex-col items-center justify-center  rounded-3xl bg-red-200 bg-opacity-40  h-[550px]   sm:h-[550px] md:h-[550px]  lg:h-[550px]   xl:h-[590px]">
                  <div className="flex mt-5  sm:mt-10 z-20   w-full justify-center md:mt-[30px] lg:mt-[30px] ">
                    <Typography className=" gradient-text text-center text-5xl font-extrabold  lg:text-7xl">
                      {Title ? Title : ""}
                    </Typography>
                  </div>
                  <div className="mt-10 flex w-[90%] justify-center  text-center font-semibold sm:mt-5 sm:text-3xl md:mt-1 lg:py-3 lg:text-4xl  ">
                    {localStorage.getItem('aomsin')?.length > 0 || localStorage.getItem('product')?.length > 0 ? (
                      <div className=" z-20 mt-5 mx-20">
                        <Typography className="text-4xl font-bold gradient-text1">
                          {localStorage.getItem('aomsin') || ''}/{localStorage.getItem('product') || ''}
                        </Typography>
                      </div>
                    ) : (
                      <p className="gradient-text1  text-4xl mt-10">ของมงคล : ไม่มีรายการ</p>
                    )}
                  </div>
                  {!localStorage.getItem('aomsin') && !localStorage.getItem('product')  && Number(customer1Price) == 0 ? (
                    
                  <div className="mt-10 flex w-full items-center justify-center py-6 text-center align-middle   text-3xl font-bold md:text-5xl lg:mt-10">
                  <div className="flex flex-col gradient-text3">
                    <h1 className=" mb-2 sm:mb-10">ขอเชิญร่วมการประมูล</h1>
                    <h1>ของมงคลได้ค่ะ</h1>
                  </div>
                </div>
                  ) : (
                    <div></div>
                  )}

                  {/* {Array.isArray(listShowTop) && listShowTop.length > 0 ? ( */}
                  {!statusB !== 1 ? (
                    <div className="mt-5  md:mt-10 flex w-full flex-col  gap-5   md:gap-10">
                    
                       <div className="flex w-full   flex-col items-center  gap-5  md:flex-row md:px-[20px]  lg:px-[80px]  ">
                       <div className="flex w-full   flex-col items-center gap-5 md:flex-row   lg:justify-start  ">
                         <div className="flex ">
                           <Typography className="flex text-3xl gradient-text     md:text-4xl xl:text-5xl ">
                           {customer1Name ? "1." : ""}
                           </Typography>
                         </div>
                         <div>
                           <Typography className="flex w-full text-3xl   gradient-text   md:text-4xl xl:text-5xl   lg:justify-start ">
                             {/* {listShowTop?.[0].user_auction} */}
                             {customer1Name || ''}
                           </Typography>
                         </div>
                       </div>
                       <div className="flex w-auto flex-col items-center justify-center gap-5 md:flex-row lg:items-end lg:justify-end">
                         <div className="flex">
                           <Typography className="flex   text-3xl gradient-text   md:text-4xl xl:text-5xl    ">
                             {/* {listShowTop?.[0]?.auction_result_price.toLocaleString()} */}
                             {customer1Price ? Number(customer1Price).toLocaleString() : ''}
                           </Typography>
                         </div>
                         <div>
                           <Typography className="flex    text-3xl  gradient-text   md:text-4xl xl:text-5xl  font-bold">
                             {customer1Price ? "บาท" : ''}
                           </Typography>
                         </div>
                       </div>
                     </div>
                      {customer2Price  > 0  ? (
                           <div className="flex w-full   flex-col items-center  gap-5  md:flex-row md:px-[20px]  lg:px-[80px]   ">
                           <div className="flex w-full  flex-col items-center gap-5 md:flex-row   lg:justify-start  ">
                             <div className="flex">
                               <Typography className="flex text-2xl    md:text-3xl xl:text-4xl  font-extrabold ">
                                 {/* {listShowTop?.[1] ? "2" : ""}. */}
                                 {customer2Name ? "2" : ""}.
                               </Typography>
                             </div>
                             <div>
                               <Typography className="flex w-full text-2xl    md:text-3xl xl:text-4xl font-extrabold lg:justify-start ">
                                 {/* {listShowTop?.[1].user_auction} */}
                                 {customer2Name || ''}
                               </Typography>
                             </div>
                           </div>
                           <div className="flex w-auto flex-col items-center justify-center gap-5 md:flex-row lg:items-end lg:justify-end">
                             <div>
                               <Typography className="flex   text-2xl    md:text-3xl xl:text-4xl  font-extrabold  ">
                                 {/* {listShowTop?.[1].auction_result_price.toLocaleString()} */}
                                 {Number(customer2Price).toLocaleString() || ''}
                               </Typography>
                             </div>
                             <div>
                               <Typography className="flex    text-2xl    md:text-3xl xl:text-4xl  font-bold">
                                 บาท
                               </Typography>
                             </div>
                           </div>
                         </div>
                    
                      ) : (
                        ""
                      )}
                      {/* {listShowTop?.[2] ? ( */}
                      {customer3Price  > 0  ? (
                        <div className="flex w-full   flex-col items-center  gap-5  md:flex-row md:px-[20px]  lg:px-[80px]   ">
                          <div className="flex w-full  flex-col items-center gap-5 md:flex-row   lg:justify-start  ">
                            <div className="flex">
                              <Typography className="flex   text-2xl    md:text-3xl xl:text-4xl  font-bold ">
                              {customer3Name ? "3" : ""}.
                              </Typography>
                            </div>
                            <div>
                              <Typography className="flex w-full text-2xl    md:text-3xl xl:text-4xl     font-bold lg:justify-start  ">
                              {customer3Name || ''}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex w-auto flex-col items-center justify-center gap-5 md:flex-row lg:items-end lg:justify-end">
                            <div>
                              <Typography className="flex   text-2xl    md:text-3xl xl:text-4xl  font-bold ">
                              {Number(customer3Price).toLocaleString() || ''}
                              </Typography>
                            </div>
                            <div>
                              <Typography className="flex   text-2xl    md:text-3xl xl:text-4xl  font-bold">
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
              <div className="flex w-full justify-center    ">
                <div className=" z-20 mx-3  flex  justify-center items-center  h-[650px]  w-full flex-col  overflow-y-scroll  md:overflow-auto  xl:h-[690px]">
                  <div className=" z-20 mt-[50px] flex w-full justify-center ">
                  <div className="flex w-full justify-center align-bottom gap-5" >
                    <img src={p01} className="w-[15%] sm:w-[15%] md:w-[10%] xl:w-[10%] bg-white rounded-full " />
                    <img src={p02} className="w-[15%] sm:w-[15%] md:w-[10%] xl:w-[10%]  bg-white rounded-full" />
                  </div>
                  </div>
                  <div className=" z-20 mt-[10px] flex w-full justify-center sm:mt-[10px] md:mt-[5px] lg:mt-[7px] ">
                    <Typography className=" gradient-text11 text-center text-5xl font-bold  sm:text-5xl">
                      ขอแสดงความยินดี
                    </Typography>
                  </div>

                  <div className=" mt-7 flex w-[90%] items-center justify-center rounded-lg border-4   text-center text-3xl text-white sm:w-[80%] py-4 sm:text-5xl md:w-[60%] lg:mt-5 "
                          style={{
                            backgroundColor: "#8A0707",
                            borderColor: "#FFB72B"
                          }}>
                    <Typography className="flex text-4xl font-bold">
                      {localStorage.getItem('winname') || ""}
                    </Typography>
                  </div>

                  <div className="mt-10 xl:mt-5 flex w-full flex-col items-center gap-5 px-5  md:flex-row lg:justify-between lg:px-[80px]  ">
                    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row   ">
                      <Typography className="flex gradient-text text-5xl xl:text-5xl text-center font-bold ">
                        {localStorage.getItem('auctionstarted_auction_topic') || ''}
                      </Typography>
                    </div>
                  </div>
                  <div className="mt-5 xl:mt-5 flex w-full flex-col items-center justify-center  gap-5 px-5 md:flex-row lg:px-[80px]  ">
                    <div className=" z-20 mx-32">
                      <Typography className="text-center text-3xl xl:text-3xl  font-bold gradient-text12"  >
                        {/* {concatenatedAomsinData}/{concatenatedProductData} */}
                        {localStorage.getItem('aomsin') || ''}/{localStorage.getItem('product') || ''}
                      </Typography>
                    </div>
                  </div>

                  <div className="  mt-10 xl:mt-3 flex w-full flex-col items-center justify-center  gap-5 px-5 sm:flex-row  ">
                    <div className=" flex flex-col   justify-center gap-5 sm:flex-row    ">
                      <div>
                        <Typography className="  flex text-4xl xl:text-4xl     font-bold gradient-text11  ">
                          มูลค่า
                        </Typography>
                      </div>
                      <div>
                        <Typography className="flex   text-3xl xl:text-5xl font-bold gradient-text11  ">
                          {Number(localStorage.getItem('winprice')).toLocaleString() || ''}
                        </Typography>
                      </div>
                      <div>
                        <Typography className="flex    text-4xl xl:text-4xl font-bold gradient-text11 ">
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
        }  md:w-[130px] md:h-[130px] absolute right-10 z-40 flex  h-20 w-20 translate-y-12  translate-x-9 items-center justify-center rounded-full sm:h-24 sm:w-24 lg:translate-x-0 lg:translate-y-12`}
      >
        {number == "1" && (
          // <img
          //   // src="/src/images/no-first.png"
          //   src={no1}
          //   alt="first"
          //   style={{ width: "80%", height: "auto" }}
          //   className="ms-2"
          // />
          <Typography className="text-8xl font-bold gradient-text13 pb-2 pr-1 ">1</Typography>
        )}
        {number == "2" && (
          // <img
          //   // src="/src/images/no-second.png"
          //   src={no2}
          //   alt="first"
          //   style={{ width: "70%", height: "auto" }}
          // />
          <Typography className="text-8xl font-bold gradient-text13 pb-2 pr-1 ">2</Typography>
        )}
        {number == "3" && (
          // <img
          //   // src="/src/images/no-third.png"
          //   src={no3}
          //   alt="first"
          //   style={{
          //     width: "80%",
          //     height: "auto",
          //     animation: "shake 0.5s infinite",
          //     animation: "scale-up-down 0.5s alternate infinite"
          //   }}
          // />
          <Typography 
          className="text-8xl font-bold gradient-text13 pb-2  ps-5 text-center "
          style={{
                width: "80%",
                height: "auto",
                animation: "shake 0.5s infinite",
                animation: "scale-up-down 0.5s alternate infinite"
              }}
          >
            3
            </Typography>
        )}
      </div>
    </div>
  );
}

export default Display;
