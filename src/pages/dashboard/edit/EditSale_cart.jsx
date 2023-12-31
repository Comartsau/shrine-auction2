import { useState, useEffect } from "react";
import { format } from "date-fns-tz";
import axios from "axios";
import { Route, Link, Routes, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import THBText from "thai-baht-text";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { GiCancel } from "react-icons/gi";
import { IoIosSave } from "react-icons/io";
import { BiReceipt } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { PiReceipt } from "react-icons/pi";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";


// import { PDFViewer } from "@react-pdf/renderer";
// import { Receive } from "../Receive";
// import { Receipt1 } from "../Receipt1";
// import { Receipt2 } from "../Receipt2";
// import { Receipt3 } from "../Receipt3";

//   Components
import Customer_modal from "../modal/Customer_modal";
import Product_modal from "../modal/Product_modal";
import BillSend_Parmoon from "../modal/BillSend_Parmoon";
import Pay from "../modal/Pay";
import BillPay_Parmoon from "../modal/BillPay_Parmoon";
import BillSend_Sale from "../modal/BillSend_Sale";
import BillPay_Sale from "../modal/BillPay_Sale";

export function EditSale_cart({
  idAuctionReport,
  setOpenEditSale,
  fetchDataIndex,
}) {
  const Token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [dataAllCustomer, setDataAllCustomer] = useState([]);
  const [titleProduct, setTitleProduct] = useState({});
  const [products, setProduct] = useState([]);
  const [customerData, setCustomerData] = useState({});
  // const [productTitle, setProductTitle] = useState({})
  const [sendData, setSendData] = useState({});
  const navigate = useNavigate();
  const [cancelNote, setCancelNote] = useState("");
  const [dataPayModal, setDataPayModal] = useState({});
  const [statusModal, setStatusModal] = useState(1);

  const [totalPriceData, setTotalPriceData] = useState(0);
  const [dataAomsin, setDataAomsin] = useState({});
  const [options, setOptions] = useState([]);


  const TABLE_HEAD = [
    "#",

    "ของมงคล",
    "จำนวน",
    "หน่วยนับ",
    "ราคา/หน่วย",
    "ราคารวม",
    "ลบ",
  ];

  //   Modals
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleOpen2 = () => setOpen2(!open2);

  const handleOpen3 = (number) => {
    setOpen3(!open3), setStatusModal(number);
  };
  const handleOpen4 = () => setOpenPay(!openPay);
  const [openPay, setOpenPay] = useState(false);
  const [open5, setOpen5] = useState(false);
  const handleOpen5 = (number) => {
    setOpen5(!open5), setStatusModal(number);
  };

  // const params = useParams();
  const id = idAuctionReport;

  // console.log(id)

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/Sale/${id}/detail`
      );

      console.log(res.data);
      setData(res.data);
      setProduct(res.data?.product);

      let sum = 0;
      for (const item of products) {
        const data =
          item?.sale_auction_start_event_count_price *
          item?.sale_auction_start_event_count;
        sum += data;
      }
      setTotalPriceData(sum);

      setCustomerData({
        sale_code_customer_address: res?.data?.sale_code_customer_address,
        sale_code_customer_delivery: res?.data?.sale_code_customer_delivery,
        sale_code_customer_contract: res?.data?.sale_code_customer_contract,
        sale_code_customer_noun: res?.data?.sale_code_customer_noun,
        sale_code_customer_name: res?.data?.sale_code_customer_name,
        sale_code_customer_tel: res?.data?.sale_code_customer_tel,
        id: res?.data?.sale_code_id,
        auction_auction_start_event_count_1:
          res.data?.aomsin[0]?.auction_auction_start_event_count,
        auction_auction_start_event_count_2:
          res.data?.aomsin[1]?.auction_auction_start_event_count,
        sale_auction_q: res.data?.sale_auction_q,
        sale_auction_refer: res.data?.sale_auction_refer,
        sale_auction_num: res.data?.sale_auction_num,
      });

      // console.log(customerData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchdataCustomer = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/Customer`);
      setDataAllCustomer(res.data);
      //   console.log(res.data);

      
      const formattedOptions  = res.data.map((item)=>({
        value: item.id,
        label:item.customer_name
      }))
      setOptions(formattedOptions)

    } catch (error) {
      console.error(error);
    }
  };

  const changeCustomer = (e) => {
    // const text = e.target.value;
    const text = e.value;

    const newData = dataAllCustomer.find((obj) => obj.id == text);
    setCustomerData((prev) => ({
      ...prev,

      sale_code_customer_address: newData?.customer_address,
      sale_code_customer_delivery: newData?.customer_delivery,
      sale_code_customer_contract: newData?.customer_contract,
      sale_code_customer_noun: newData?.customer_noun,
      sale_code_customer_name: newData?.customer_name,
      sale_code_customer_tel: newData?.customer_tel,
      id: newData?.id,
    }));

  };

  const deleteRow = (id) => {
    const updateRow = products.filter((row) => row.id !== id);
    setProduct(updateRow);
  };
  const handleSave = async () => {
    try {
      const modifyProduct = products.map((data, index) => ({
        sale_auction_start_event: data?.product_name,
        sale_auction_start_event_count: data?.sale_auction_start_event_count,
        sale_auction_start_event_count_price:
          data?.sale_auction_start_event_count_price,
        sale_auction_start_event_count_unit: data?.product_count,
        sale_auction_start_event_count_cat: data?.product_category,
      }));

      const sendData = {
        sale_code_customer_name: customerData?.sale_code_customer_name,
        sale_code_customer_address: customerData?.sale_code_customer_address,
        sale_code_customer_delivery: customerData?.sale_code_customer_delivery,
        sale_code_customer_contract: customerData?.sale_code_customer_contract,
        sale_code_customer_noun: customerData?.sale_code_customer_noun,
        sale_code_customer_number: "000",
        sale_code_customer_tel: customerData?.sale_code_customer_tel,
        sale_code_customer_line: "111",
        sale_auction_refer: customerData?.sale_auction_refer,
        sale_auction_num: customerData?.sale_auction_num,
        sale_auction_price: totalPriceData,
        // sale_auction_price: 800,
        status_sale: 1,
        sale_auction_q: customerData?.sale_auction_q,
        // auction_report_customer_id :customerData?.id,
        product: modifyProduct,
        aomsin: [
          {
            sale_auction_start_event: 1,
            sale_auction_start_event_count: dataAomsin?.aomsin_1,
          },
          {
            sale_auction_start_event: 2,
            sale_auction_start_event_count: dataAomsin?.aomsin_2,
          },
        ],
      };
      
      //console.log(totalPriceData)
      // console.log(data[0]);
      // console.log(products);

      console.log(sendData);

      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/Sale/${data.id}/edit`,
        sendData
      );
      console.log(res.data);

      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "บันทึกสำเร็จ !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const endBill = async () => {
    let cancelNote; // Declare cancelNote in the outer scope
    try {
      // ถามครั้งที่ 1
      const result = await Swal.fire({
        title: "กรอกหมายเหตุ",
        titleText: `ยกเลิกบิลเลขที่: ${data?.sale_code}`,
        input: "text",
        inputPlaceholder: "กรอกหมายเหตุที่ยกเลิก",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        preConfirm: (note) => {
          cancelNote = note; // Set the cancelNote variable here
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: ` คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่ `,
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "บันทึก",
          denyButtonText: `ยกเลิก`,
        }).then((result) => {
          if (result.isConfirmed) {
            const dataSend = {
              show_Id: data?.id,
              sale_auction_q: cancelNote,
            };

            // console.log(dataSend);
            const response = axios.put(
              `${import.meta.env.VITE_APP_API}/Cancel-Sale`,
              dataSend,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${Token}`,
                },
              }
            );
            Swal.fire("ยกเลิกสำเร็จ !", "", "success");

            setTimeout(() => {
              fetchDataIndex();
              setOpenEditSale(false);
            }, 1300);
          } else if (result.isDenied) {
            Swal.fire("บิลยังไม่ถูกยกเลิก !", "", "info");
          }
        });
      }
    } catch (error) {
      // กรณีเกิดข้อผิดพลาดในการส่งข้อมูล
      Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถยกเลิกบิลได้ในขณะนี้", "error");
    }
  };
  const handlePay = async () => {
    setDataPayModal({
      id: data?.id,
      number: 2,
      billNumber: data?.sale_code,
    });
    handleOpen4();
  };

  const checkAomsinData = () => {
    products?.map((data, index) => {
      if (data?.product_name == "สลากออมสิน") {
        setDataAomsin((prev) => ({
          ...prev,
          aomsin_1: data?.sale_auction_start_event_count,
        }));
      } else if (
        data?.product_name == "ล็อตเตอรี่" ||
        data?.product_name == "ลอตเตอรี่"
      ) {
        setDataAomsin((prev) => ({
          ...prev,
          aomsin_2: data?.sale_auction_start_event_count,
        }));
      } else {
        console.log("0000");
      }
    });

    // console.log(dataAomsin);
  };

  useEffect(() => {
    fetchData();
    fetchdataCustomer();
  }, []);

  useEffect(() => {
    checkAomsinData();
  }, [products]);

  const newBill = () => {
    Swal.fire({
      title: "ต้องการสร้างบิลใหม่ ?",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      preConfirm: (note) => {
        // นำค่าที่กรอกเก็บลงใน state หรือทำอะไรกับมันตามความเหมาะสม
        setCancelNote(note);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard/sale");
        setTimeout(() => {
          navigate("/dashboard/saleList");
        }, 100);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // ผู้ใช้กดยกเลิก
      }
    });
  };

  return (
    <>
      {/* CUSTOMER ID : {customerData?.id} */}
      <Customer_modal
        open={open}
        handleOpen={handleOpen}
        setCustomerData={setCustomerData}
        fetchdataCustomer={fetchdataCustomer}
        dataAllCustomer={dataAllCustomer}
        id={customerData?.id}
        // id={2}
        type={2}
      />

      <Product_modal
        open2={open2}
        handleOpen2={handleOpen2}
        setTitleProduct={setTitleProduct}
        titleProduct={titleProduct}
        products={products}
        setProduct={setProduct}
        type={2}
        setTotalPriceData={setTotalPriceData}
      />

      {/* <BillSend_Parmoon
        open3={open3}
        handleOpen3={handleOpen3}
        data={data}
        statusModal={statusModal}
      /> */}
      <BillSend_Sale
        open3={open3}
        handleOpen3={handleOpen3}
        data={data}
        statusModal={statusModal}
      />

      <BillPay_Sale
        open5={open5}
        handleOpen5={handleOpen5}
        data={data}
        statusModal={statusModal}
      />

      <Pay
        handleOpen3={handleOpen4}
        openPay={openPay}
        dataPayModal={dataPayModal}
        fetchData={fetchData}
      />

      <Card className=" h-auto  w-full overflow-scroll px-5 ">
        <div className=" sm:flex-col-auto md:flex-row-auto  flex justify-between gap-4 p-3 ">
          <div className="mt-5 flex flex-col gap-4 md:flex-row lg:flex-row ">
            <div>
              <Typography className="flex w-[100px] text-sm font-bold">
                เลขที่บิล :
              </Typography>
            </div>
            <div className="">
              <Typography className="">{data?.sale_code || ""}</Typography>
            </div>
          </div>

          <div className="flex  flex-wrap gap-4 md:flex-row lg:flex-row">
            <Button
              size="sm"
              variant="filled"
              color="blue"
              className=" flex w-[170px] items-center align-middle  text-sm"
              onClick={newBill}
            >
              <span className="mr-2 flex text-base">
                <PiReceipt />
              </span>
              รายการขายสินค้า
            </Button>
            <Button
              size="sm"
              variant="gradient"
              color="green"
              className=" flex items-center align-middle text-sm"
              onClick={handleSave}
            >
              <span className="mr-2 flex text-base">
                <IoIosSave />
              </span>
              บันทึก
            </Button>

            <Button
              size="sm"
              variant="gradient"
              color="red"
              className=" flex items-center align-middle text-sm"
              onClick={endBill}
              disabled={data?.status_sale === 2}
            >
              <span className="mr-2 flex text-base">
                <GiCancel />
              </span>
              ยกเลิก
            </Button>

            <Button
              size="sm"
              variant="gradient"
              color="purple"
              className=" flex w-[120px] items-center align-middle  text-sm"
              onClick={handlePay}
              disabled={data?.status_sale === 2}
            >
              <span className="mr-2 flex text-base">
                <MdOutlinePayment />
              </span>
              ชำระเงิน
            </Button>

            <Menu>
              <MenuHandler>
                <Button
                  size="sm"
                  variant="gradient"
                  color="orange"
                  className=" flex w-[120px] items-center align-middle text-sm"
                >
                  <span className="mr-2 flex text-base">
                    <BiReceipt />
                  </span>
                  ใบรับของ
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => handleOpen3(1)}>
                  เครื่องพิมพ์หัวเข็ม{" "}
                </MenuItem>
                <MenuItem onClick={() => handleOpen3(2)}>
                  เครื่องพิมพ์ธรรมดา
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuHandler>
                <Button
                  size="sm"
                  variant="gradient"
                  color="yellow"
                  className=" flex w-[110px] items-center align-middle  text-sm"
                  disabled={data?.status_sale === 1}
                >
                  <span className="mr-2 flex text-base">
                    <PiReceipt />
                  </span>
                  ใบเสร็จ
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => handleOpen5(1)}>
                  เครื่องพิมพ์หัวเข็ม{" "}
                </MenuItem>
                <MenuItem onClick={() => handleOpen5(2)}>
                  เครื่องพิมพ์ธรรมดา
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        {/* {JSON.stringify(customerData)} */}

        <div className=" mt-5 flex flex-col justify-between  gap-4 p-3 md:flex-row lg:flex-row ">
          <div>
            <div className="flex flex-col justify-between gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography className="flex w-[110px] text-sm font-bold">
                  ผู้บริจาค:
                </Typography>
              </div>
       
                    <div className="w-full md:w-80">
                {/* <select
                  onChange={changeCustomer}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={" " || null}>เลือกผู้บริจาคที่ต้องการ</option>
                  {dataAllCustomer?.map((data, index) => (
                    <option key={data?.id} value={data?.id}>
                      {data?.customer_name || " "}
                    </option>
                  ))}
                </select> */}

                <Select className="text-lg"  onChange={(option) => changeCustomer(option)} options={options} />
              </div>
              <div>
                <IconButton
                  variant="filled"
                  color="green"
                  size="sm"
                  className=" rounded-full border-4  border-green-500 "
                  onClick={handleOpen}
                >
                  <AiOutlinePlus className="text-2xl" />
                </IconButton>
              </div>
              <div>
                <small>เพิ่ม/แก้ไข ผู้บริจาค</small>
              </div>
            </div>
            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography className="flex w-[110px] text-sm font-bold">
                  ชื่อผู้บริจาค:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm ">
                  {customerData?.sale_code_customer_name || ""}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography className="flex w-[110px] text-sm font-bold">
                  ที่อยู่:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm ">
                  {customerData?.sale_code_customer_address || ""}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography className="flex w-[110px] text-sm font-bold">
                  สถานที่จัดส่ง:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm ">
                  {customerData?.sale_code_customer_delivery || ""}
                </Typography>
              </div>
            </div>

    
            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography
                  className="flex w-[110px] text-sm font-bold"
                  value="xxxxx"
                >
                  เบอร์โทร:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm " value="xxxxx">
                  {customerData?.sale_code_customer_tel || ""}
                </Typography>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography
                  className="flex w-[110px] text-sm font-bold"
                  value="xxxxx"
                >
                  วันที่:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm " value="xxxxx">
                  {data?.sale_auction_date || ""}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography className="flex w-[110px] text-sm font-bold">
                  ออกสลากในนาม:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm ">
                  {customerData?.sale_code_customer_noun || ""}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography className="flex w-[110px] text-sm font-bold">
                  ผู้ติดต่อ:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm ">
                  {customerData?.sale_code_customer_contract || ""}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <Input
                type="text"
                maxLength="10"
                value={customerData?.sale_auction_refer || ""}
                label="อ้างถึงบิลเล่มที่"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    sale_auction_refer: e.target.value,
                  }))
                }
              />

              <Input
                type="text"
                maxLength="10"
                value={customerData?.sale_auction_num || ""}
                label="เลขที่"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    sale_auction_num: e.target.value,
                  }))
                }
              />
            </div>
            {/* <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <Input
                type="text"
                maxLength="10"
                value={customerData?.auction_auction_start_event_count_1 || ""}
                label="สลากออมสิน"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    auction_auction_start_event_count_1: e.target.value,
                  }))
                }
              />

              <Input
                type="text"
                maxLength="10"
                value={customerData?.auction_auction_start_event_count_2 || ""}
                label="ล็อตเตอรี่"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    auction_auction_start_event_count_2: e.target.value,
                  }))
                }
              />
            </div> */}

            <div className="flex flex-col justify-end  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <small>เพิ่ม/แก้ไข สินค้า</small>
              </div>
              <IconButton
                variant="filled"
                color="green"
                size="sm"
                className=" rounded-full border-4  border-green-500 "
                onClick={handleOpen2}
              >
                <AiOutlinePlus className="text-2xl" />
              </IconButton>

              <div className="flex gap-3">
                <Typography
                  className="text-md flex text-sm font-bold text-red-500"
                  value="xxxxx"
                >
                  ราคาทั้งหมด:
                </Typography>
                <Typography
                  className="text-md flex text-sm  font-bold text-red-500"
                  value="xxxxx"
                >
                  {Number(totalPriceData).toLocaleString() || " "}
                </Typography>
                <Typography
                  className="text-md flex  font-bold text-red-500"
                  value="xxxxx"
                >
                  บาท
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* ------------ table  ----------------------------------------- */}

          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head || " "}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products?.map((data, index) => {
                  const isLast = index === products.length - 1;
                  const classes = isLast
                    ? "p-4 "
                    : "p-4 border-b border-blue-gray-50 ";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data?.product_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data?.sale_auction_start_event_count}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data?.product_count}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Number(
                            data?.sale_auction_start_event_count_price
                          ).toLocaleString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Number(
                            data?.sale_auction_start_event_count_price *
                              data?.sale_auction_start_event_count
                          ).toLocaleString()}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <IconButton
                          variant="text"
                          color="red"
                          onClick={() => deleteRow(data?.id)}
                        >
                          <AiFillDelete className="h-4 w-4" />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          <table className="w-20  min-w-max table-auto text-center  md:w-full lg:w-full"></table>

          {/* ----------------  หมายเหตุ -------------------------------- */}
          <div className="flex w-full flex-col items-center gap-3  py-3 align-middle md:flex-row">
            <div className="mt-4 flex w-full">
              <Input
                type="text"
                maxLength="10"
                value={customerData?.sale_auction_q || ""}
                label="หมายเหตุ"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    sale_auction_q: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
export default EditSale_cart;
