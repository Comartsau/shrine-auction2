import { useState, useEffect } from "react";
import { format } from "date-fns-tz";
import axios from "axios";
import { Route, Link, Routes, useParams, Await } from "react-router-dom";
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

import { PDFViewer } from "@react-pdf/renderer";
import { Receive } from "../Receive";
import { Receipt1 } from "../Receipt1";
import { Receipt2 } from "../Receipt2";
import { Receipt3 } from "../Receipt3";

//   Components
import Customer_modal from "../modal/Customer_modal";
import Product_modal from "../modal/Product_modal";
import BillSend_Parmoon from "../modal/BillSend_Parmoon";
import Pay from "../modal/Pay";
import BillPay_Parmoon from "../modal/BillPay_Parmoon";

export function EditSale1({
  idAuctionReport,
  setOpenEditParmoon,
  fetchDataIndex,
}) {
  let Token = localStorage.getItem("token");

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

  // console.log(idAuctionReport)

  const TABLE_HEAD = [
    "#",
    "หัวข้อประมูล",
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

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/Debtor-Auction/${id}/detail`
      );
      // console.log(res.data);
      setData(res.data);
      setProduct(res.data[0]?.product1);

      setTitleProduct({
        auction_report_auctionstarted:
          res.data[0]?.auction_report_auctionstarted,
        auction_report_price: res.data[0]?.auction_report_price,
      });
      setCustomerData({
        auction_report_customer_address:
          res?.data[0]?.auction_report_customer_address,
        auction_report_customer_delivery:
          res?.data[0]?.auction_report_customer_delivery,
        auction_report_customer_contract:
          res?.data[0]?.auction_report_customer_contract,
        auction_report_customer_noun:
          res?.data[0]?.auction_report_customer_noun,
        auction_report_user_auction: res?.data[0]?.auction_report_user_auction,
        auction_report_customer_tel: res?.data[0]?.auction_report_customer_tel,
        id: res?.data[0]?.auction_report_customer_id,
        auction_auction_start_event_count_1:
          res.data[0]?.aomsin1[0]?.auction_auction_start_event_count,
        auction_auction_start_event_count_2:
          res.data[0]?.aomsin1[1]?.auction_auction_start_event_count,
        auction_report_q: res.data[0]?.auction_report_q,
        auction_refer: res.data[0]?.auction_refer,
        auction_num: res.data[0]?.auction_num,
      });
      // console.log(customerData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchdataCustomer = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/Customer`);
      //   console.log('customer : ', res.data);
      setDataAllCustomer(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeCustomer = (e) => {
    const text = e.target.value;
    const newData = dataAllCustomer.find((obj) => obj.id == text);
    setCustomerData((prev) => ({
      ...prev,
      auction_report_customer_address: newData?.customer_address,
      auction_report_customer_delivery: newData?.customer_delivery,
      auction_report_customer_contract: newData?.customer_contract,
      auction_report_customer_noun: newData?.customer_noun,
      auction_report_user_auction: newData?.customer_name,
      auction_report_customer_tel: newData?.customer_tel,
      id: newData?.id,
    }));
  };

  const deleteRow = (id) => {
    const updateRow = products.filter((row) => row.id !== id);
    setProduct(updateRow);
  };
  const handleSave = async () => {
    try {
      const sendData = {
        auction_report_user_auction: customerData?.auction_report_user_auction,
        auction_report_customer_address:
          customerData?.auction_report_customer_address,
        auction_report_customer_delivery:
          customerData?.auction_report_customer_delivery,
        auction_report_customer_contract:
          customerData?.auction_report_customer_contract,
        auction_report_customer_noun:
          customerData?.auction_report_customer_noun,
        auction_report_customer_tel: customerData?.auction_report_customer_tel,
        auction_report_customer_tel: customerData?.auction_report_customer_tel,
        auction_report_customer_line: "000",
        auction_report_price: titleProduct?.auction_report_price,
        auction_report_auctionstarted:
          titleProduct?.auction_report_auctionstarted,
        auction_report_date: data[0]?.auction_report_date,
        auction_refer: customerData?.auction_refer,
        auction_num: customerData?.auction_num,
        auction_report_customer_id: customerData?.id,
        product1: products,
        aomsin1: [
          {
            auction_auction_start_event: "สลากออมสิน",
            auction_auction_start_event_count:
              customerData?.auction_auction_start_event_count_2,
          },
          {
            auction_auction_start_event: "ล็อตเตอรี่",
            auction_auction_start_event_count:
              customerData?.auction_auction_start_event_count_1,
          },
        ],
        auction_report_q: customerData?.auction_report_q,
        auction_report_date_Pay_Date: data[0]?.auction_report_date_Pay_Date,
        Pay_auction: "",
      };

      // console.log(data[0]);
      // console.log(sendData);
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/Edit-Auctions/${
          data[0]?.id_auction_report
        }`,
        sendData
      );
      // console.log(res.data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกสำเร็จ !!",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };


  const endBill = async () => {
    let cancelNote; 
    try {
      // ถามครั้งที่ 1
      const result = await Swal.fire({
        title: "กรอกหมายเหตุ",
        titleText: `ยกเลิกบิลเลขที่: ${data[0]?.number}`,
        input: "text",
        inputPlaceholder: "กรอกหมายเหตุที่ยกเลิก",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        preConfirm: (note) => {
          cancelNote = note; 
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: ` คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่ `,
          showDenyButton: true,
          confirmButtonText: "บันทึก",
          denyButtonText: `ยกเลิก`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ยกเลิกสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
            const dataSend = {
              show_Id: data[0]?.id_auction_report,
              auction_report_q: cancelNote, 
            };
            
            // console.log(dataSend);

            const response = axios.put(
              `${import.meta.env.VITE_APP_API}/Cancel-Auctions`,
              dataSend,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${Token}`,
                },
              } 
            );

            
            setTimeout(() => {
              fetchDataIndex();
              setOpenEditParmoon(false);
            }, 1300);
          } else if (result.isDenied) {
            Swal.fire("บิลยังไม่ถูกยกเลิก !", "", "info");
          }
        });
      }
    } catch (error) {
      Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถยกเลิกบิลได้ในขณะนี้", "error");
    }
  };


  const handlePay = async () => {
    setDataPayModal({
      id: data[0]?.id_auction_report,
      number: 1,
      billNumber: data[0]?.number,
    });
    handleOpen4();
  };

  useEffect(() => {
    fetchData();
    fetchdataCustomer();
  }, []);
  useEffect(() => {}, [cancelNote]);

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
          navigate("/dashboard/auctionsList");
        }, 100);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // ผู้ใช้กดยกเลิก
      }
    });
  };

  return (
    <>
  

      <Customer_modal
        open={open}
        handleOpen={handleOpen}
        setCustomerData={setCustomerData}
        fetchdataCustomer={fetchdataCustomer}
        dataAllCustomer={dataAllCustomer}
        id={customerData?.id}
        type={1}
      />
      <Product_modal
        open2={open2}
        handleOpen2={handleOpen2}
        setTitleProduct={setTitleProduct}
        titleProduct={titleProduct}
        products={products}
        setProduct={setProduct}
        type={1}
      />
      <BillSend_Parmoon
        open3={open3}
        handleOpen3={handleOpen3}
        data={data}
        statusModal={statusModal}
      />
      <BillPay_Parmoon
        open5={open5}
        handleOpen5={handleOpen5}
        data={data[0]}
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
              <Typography className="">{data[0]?.number || ""}</Typography>
            </div>
          </div>

          <div className="flex  flex-wrap gap-4 md:flex-row lg:flex-row">
            <Button
              size="sm"
              variant="filled"
              color="blue"
              className=" flex w-[150px] items-center align-middle  text-sm"
              onClick={newBill}
            >
              <span className="mr-2 flex text-base">
                <PiReceipt />
              </span>
              รายการประมูล
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
              disabled={data[0]?.auction_report_Pay_status === 2}
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
              disabled={data[0]?.auction_report_Pay_status === 2}
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
                  disabled={data[0]?.auction_report_Pay_status === 1}
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

            {/* {data[0]?.auction_report_Pay_status === 2 && (
              <Menu>
                <MenuHandler>
                  <Button
                    size="sm"
                    variant="gradient"
                    color="orange"
                    className=" flex w-[110px] items-center align-middle  text-sm"
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
            )} */}
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
              <div>
                <select
                  onChange={changeCustomer}
                  value={customerData?.auction_report_user_auction || " "}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={" " || null}>เลือกผู้บริจาคที่ต้องการ</option>
                  {dataAllCustomer?.map((data, index) => (
                    <option key={data?.id} value={data?.id}>
                      {data?.customer_name || " "}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <IconButton
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
                  ที่อยู่:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm ">
                  {customerData?.auction_report_customer_address || ""}
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
                  {customerData?.auction_report_customer_delivery || ""}
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
                  {customerData?.auction_report_customer_contract || ""}
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
                  {customerData?.auction_report_customer_tel || ""}
                </Typography>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <Typography
                  className="flex w-[40px] text-sm font-bold"
                  value="xxxxx"
                >
                  วันที่:
                </Typography>
              </div>
              <div>
                <Typography className="flex  text-sm " value="xxxxx">
                  {data[0]?.auction_report_date || ""}
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
                  {customerData?.auction_report_customer_noun || ""}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
              <Input
                type="text"
                maxLength="10"
                value={customerData?.auction_refer || ""}
                label="บิลอ้างอิงเล่มที่"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    auction_refer: e.target.value,
                  }))
                }
              />

              <Input
                type="text"
                maxLength="10"
                value={customerData?.auction_num || ""}
                label="เล่มที่"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    auction_num: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col  gap-4  p-3 md:flex-row lg:flex-row">
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
            </div>

            <div className="flex flex-col justify-end  gap-4  p-3 md:flex-row lg:flex-row">
              <div>
                <small>เพิ่ม/แก้ไข สินค้า</small>
              </div>
              <IconButton
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
                  {Number(
                    titleProduct?.auction_report_price
                  ).toLocaleString() || " "}
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

          <Card className="h-full w-full overflow-x-hidden">
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
                <tr>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      1
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {titleProduct?.auction_report_auctionstarted || " "}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      -
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      1
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      -
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {Number(
                        titleProduct?.auction_report_price
                      ).toLocaleString() || " "}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {Number(
                        titleProduct?.auction_report_price
                      ).toLocaleString() || " "}
                    </Typography>
                  </td>
                </tr>

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
                          {index + 2}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          -
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data?.auction_product_start_event}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data?.auction_product_start_event_count}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data?.auction_product_start_event_cat_count}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          -
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          -
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
                value={customerData?.auction_report_q || ""}
                label="หมายเหตุ"
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    auction_report_q: e.target.value,
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
export default EditSale1;
