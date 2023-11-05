import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { SiMicrosoftexcel } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import DatePicker from "react-datepicker";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";

import { PDFViewer } from "@react-pdf/renderer";
import THBText from "thai-baht-text";
import { Receipt1 } from "./Receipt1";
import { Receipt2 } from "./Receipt2";
import { Receipt3 } from "./Receipt3";
import Pay from "./modal/Pay";
import BillPay_Parmoon from "./modal/BillPay_Parmoon";
import BillPay_Sale from "./modal/BillPay_Sale";

export function Account() {
  const [data, setData] = useState([]);
  const [dataPay, setDataPay] = useState([]);
  const [checkSelect, setCheckSelect] = useState(true);
  const [inputName, setInputName] = useState("");
  let [search, setSearch] = useState({
    type: "",
    name: "",
    date_start: "",
    date_end: "",
    pay: "",
  });
  const [dataModal, setDataModal] = useState({});
  const [dataPayModal, setDataPayModal] = useState({});
  let Token = localStorage.getItem("token");
  let url = "";

  const TABLE_HEAD = [
    "#",
    "ผู้บริจาค",
    "เลขที่ใบรับของ",
    "หัวข้อประมูล",
    "วันที่บิล",
    "วันที่ชำระเงิน",
    "สถานะ",
    "จำนวนเงิน",
    "action",
  ];

  // Modal
  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpenReceipt(!openReceipt);
  const handleOpen3 = () => setOpenPay(!openPay);
  const handleOpen4 = () => setOpen4(!open4);

  const [open, setOpen] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [statusModal, setStatusModal] = useState(1);

  const fetchData = async (number) => {
    let apiUrl = "";

    if (search.type >= 1) {
      apiUrl = `?type_Data=${search.type}`;
    }

    if (search.name) {
      apiUrl = `?type_Data=${search.type}&receipt_number=${search.name}`;
    }

    if (search.date_start && search.date_end) {
      apiUrl = `?type_Data=${search.type}&start_date=${search.date_start}&end_date=${search.date_end}`;
    }
    if (search.name && search.date_start && search.date_end) {
      apiUrl = `?type_Data=${search.type}&receipt_number=${search.name}&start_date=${search.date_start}&end_date=${search.date_end}`;
    }

    if (search.pay) {
      apiUrl = `?type_Data=${search.type}&paid=${search.pay}`;
    }

    if (search.name && search.pay) {
      apiUrl = `?type_Data=${search.type}&receipt_number=${search.name}&paid=${search.pay}`;
    }

    if (search.name && search.date_start && search.date_end && search.pay) {
      apiUrl = `?type_Data=${search.type}&receipt_number=${search.name}&start_date=${search.date_start}&end_date=${search.date_end}&paid=${search.pay}`;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/Debtor${apiUrl} `,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      setData(res?.data);
      console.log(res.data);

      if (number) {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_API
          }/Debtor-Excel${apiUrl}&text=${number} `,
          {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "Reports.xlsx";
        link.click();
        URL.revokeObjectURL(downloadUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectTypeStart = (e) => {
    const type = e.target.value;
    setSearch((prev) => ({ ...prev, type: e.target.value }));
  };

  const searchData = (e, type) => {
    const input = e.target.value;

    // ชื่อ  ************************
    if (type === "name") {
      setSearch((prev) => ({ ...prev, name: input }));
    }

    if (type === "start") {
      setSearch((prev) => ({ ...prev, date_start: input }));
    }

    // // วันที่สิ้นสุด  ************************
    if (type === "end") {
      setSearch((prev) => ({ ...prev, date_end: input }));
    }

    // // ทั้งหมด ชำระแล้ว ยังไม่ชำระ  ************************
    if (type === "pay") {
      setSearch((prev) => ({ ...prev, pay: input }));
    }
  };

  const fetchDataModal = async (id, number, id_receipt, type) => {
    let showDataModal = {};
    if (number === 1) {
      showDataModal = data.find((obj) => obj.id_auction_report == id);
    } else {
      showDataModal = data.find((obj) => obj.id == id);
    }
    setDataModal(showDataModal);

    if (id_receipt) {
      let apiForSaleDetail = "";
      // if (number == 1) {
      //   apiForSaleDetail = `${
      //     import.meta.env.VITE_APP_API
      //   }/Auction-Sale/${id_receipt}/detail`;
      // } else {
      //   apiForSaleDetail = `${
      //     import.meta.env.VITE_APP_API
      //   }/Receipt/${id_receipt}/detail`;

      // }

      if (number == 1) {
        apiForSaleDetail = `${
          import.meta.env.VITE_APP_API
        }/Auction-Sale/${id_receipt}/detail`;
      } else {
        apiForSaleDetail = `${
          import.meta.env.VITE_APP_API
        }/Receipt/${id_receipt}/detail`;
      }

      try {
        const res = await axios.get(apiForSaleDetail);
        setDataPay(res.data);
        // console.log(res.data);
        type != "excel" && setOpen(!open);
      } catch (error) {
        console.error(error);
      }
    } else {
      setDataPay([]);
      setOpen(!open);
    }
  };

  const hanleExcel = async (number) => {
    fetchData(number);
  };

  const OpenReceipt = (id, number, id_receipt, statusModal) => {
    // console.log(id);
    // console.log(number);

    number === 1 && id_receipt && handleOpen2();

    number === 2 && id_receipt && handleOpen4();

    fetchDataModal(id, number, id_receipt, "excel");

    setStatusModal(statusModal);
  };

  const handlePay = async (id, number, billNumber) => {
    setDataPayModal({
      id,
      number,
      billNumber,
    });
    handleOpen3();
  };

  useEffect(() => {
    if (search.type >= 1) {
      setCheckSelect(false);
      fetchData();
    } else {
      setCheckSelect(true);
    }
  }, [search]);

  return (
    <div>
      <Pay
        handleOpen3={handleOpen3}
        openPay={openPay}
        dataPayModal={dataPayModal}
        fetchData={fetchData}
      />
      <BillPay_Parmoon
        open5={openReceipt}
        handleOpen5={handleOpen2}
        data={dataModal}
        statusModal={statusModal}
      />

      <BillPay_Sale
        open5={open4}
        handleOpen5={handleOpen4}
        data={dataModal}
        statusModal={statusModal}
      />

      <div className="mt-2 mb-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 ">
        <select
          className="focus:ring-indigo h-full rounded-md border-4 bg-transparent py-0 pl-2 pr-7 text-gray-700 focus:ring-1  focus:ring-indigo-500 sm:text-sm xl:text-lg"
          onChange={(e) => selectTypeStart(e)}
        >
          <option value=" ">ค้นหา</option>
          <option value="1">ประมูล</option>
          <option value="2">ขายสินค้า</option>
        </select>

        <div>
          <input
            type="text"
            onKeyUp={(e) => searchData(e, "name")}
            disabled={checkSelect}
            className=" block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500  sm:text-sm sm:leading-6"
            placeholder="ค้นหา ชื่อผู้บริจาค / เลขใบรับของ"
          />
        </div>
        <div>
          <input
            type="date"
            onChange={(e) => searchData(e, "start")}
            disabled={checkSelect}
            className="focus:ring-indigo block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500  sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <input
            type="date"
            onChange={(e) => searchData(e, "end")}
            disabled={checkSelect}
            className="focus:ring-indigo block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500  sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <select
            disabled={checkSelect}
            className="focus:ring-indigo h-full rounded-md border-4 bg-transparent py-0 pl-2 pr-7 text-gray-700 focus:ring-1  focus:ring-indigo-500 sm:text-sm xl:text-lg"
            onChange={(e) => searchData(e, "pay")}
          >
            <option value="">ทั้งหมด</option>
            <option value="1">ยังไม่ชำระเงิน</option>
            <option value="2">ชำระเงินแล้ว</option>
          </select>
        </div>
        <div className=" ">
          <Menu>
            <MenuHandler className="ml-4">
              <Button color="green">Excel</Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => hanleExcel(2)}>
                <i className="fa-solid fa-arrow-right mr-3"></i>
                มาก - น้อย
              </MenuItem>
              <MenuItem onClick={() => hanleExcel(1)}>
                <i className="fa-solid fa-arrow-left mr-3"></i>
                น้อย - มาก
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <br />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
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
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checkSelect == false &&
              data?.map((data, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

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
                        {data?.sale_code_customer_name
                          ? data?.sale_code_customer_name
                          : data?.auction_report_user_auction}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data?.sale_code ? data?.sale_code : data?.number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data?.auction_report_auctionstarted
                          ? data?.auction_report_auctionstarted
                          : ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data?.sale_auction_date
                          ? data?.sale_auction_date
                          : data?.auction_report_date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data?.sale_auction_date_pay_Bill
                          ? data?.sale_auction_date_pay_Bill || ""
                          : data?.auction_report_date_Pay_Date || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="paragraph"
                        className={`
                        ${data?.status_sale === 0 || data?.auction_report_Pay_status === 0 ? "bg-red-500 opacity-70 text-white flex justify-center p-1" : ''}
                        ${data?.status_sale === 1 || data?.auction_report_Pay_status === 1 ? "bg-orange-500 opacity-70 text-black flex justify-center p-1" : ''}
                        ${data?.status_sale === 2 || data?.auction_report_Pay_status === 2 ? "bg-green-500 opacity-70 text-white flex justify-center p-1" : ''}
                        `
                          
                        }
                      >

  
                        {data?.status_sale === 0 ||
                        data?.auction_report_Pay_status === 0
                          ? "ยกเลิก"
                          : ""}

                        {data?.status_sale === 1 ||
                        data?.auction_report_Pay_status === 1
                          ? "ยังไม่ชำระ"
                          : ""}

                        {data?.status_sale === 2 ||
                        data?.auction_report_Pay_status === 2
                          ? "ชำระแล้ว"
                          : ""}

                    
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data?.sale_auction_price
                          ? Number(data?.sale_auction_price).toLocaleString() || ""
                          : Number(data?.auction_report_price).toLocaleString() || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Menu>
                        <MenuHandler>
                          <i
                            className="fa-solid fa-list"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              data?.id
                                ? fetchDataModal(data?.id, 2, data?.id_receipt)
                                : fetchDataModal(
                                    data?.id_auction_report,
                                    1,
                                    data?.id_receipt
                                  )
                            }
                          >
                            {/* <i className="fa-solid fa-eye px-2"> </i> */}
                            <p className="px-3">รายละเอียด</p>
                          </MenuItem>

                          {data?.auction_report_Pay_status == 2 && (
                            <div>
                              {/* <MenuItem>
                                <i className="fa-regular fa-file-excel pr-3"></i>
                                ใบเสร็จ
                              </MenuItem> */}
                              <i className="fa-regular fa-file-excel pr-3"></i>
                              ใบเสร็จ
                              <MenuItem
                                onClick={() =>
                                  data?.id
                                    ? OpenReceipt(
                                        data?.id,
                                        2,
                                        data?.id_receipt,
                                        1
                                      )
                                    : OpenReceipt(
                                        data?.id_auction_report,
                                        1,
                                        data?.id_receipt,
                                        1
                                      )
                                }
                              >
                                <p className="px-3">เครื่องพิมพ์หัวเข็ม</p>
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  data?.id
                                    ? OpenReceipt(
                                        data?.id,
                                        2,
                                        data?.id_receipt,
                                        2
                                      )
                                    : OpenReceipt(
                                        data?.id_auction_report,
                                        1,
                                        data?.id_receipt,
                                        2
                                      )
                                }
                              >
                                <p className="px-3">เครื่องพิมพ์ธรรมดา</p>
                              </MenuItem>
                            </div>
                          )}

                          {data?.status_sale == 2 && (
                            <div>
                              <MenuItem>
                                <i className="fa-regular fa-file-excel pr-3"></i>
                                ใบเสร็จ
                              </MenuItem>

                              <MenuItem
                                onClick={() =>
                                  data?.id
                                    ? OpenReceipt(
                                        data?.id,
                                        2,
                                        data?.id_receipt,
                                        1
                                      )
                                    : OpenReceipt(
                                        data?.id_auction_report,
                                        1,
                                        data?.id_receipt,
                                        1
                                      )
                                }
                              >
                                <p className="px-3">เครื่องพิมพ์หัวเข็ม</p>
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  data?.id
                                    ? OpenReceipt(
                                        data?.id,
                                        2,
                                        data?.id_receipt,
                                        2
                                      )
                                    : OpenReceipt(
                                        data?.id_auction_report,
                                        1,
                                        data?.id_receipt,
                                        2
                                      )
                                }
                              >
                                <p className="px-3">เครื่องพิมพ์ธรรมดา</p>
                              </MenuItem>
                            </div>
                          )}

                          {/* ประมูล */}
                          {data?.auction_report_Pay_status == 1 && (
                            <MenuItem
                              onClick={() =>
                                handlePay(
                                  data?.id_auction_report,
                                  1,
                                  data?.number
                                )
                              }
                            >
                              <i className="fa-solid fa-money-bill px-3"></i>
                              ชำระเงิน
                            </MenuItem>
                          )}
                          {/* ขายสินค้า */}

                          {data?.status_sale == 1 && (
                            <MenuItem
                              onClick={() =>
                                handlePay(data?.id, 2, data?.sale_code)
                              }
                            >
                              <i className="fa-solid fa-money-bill px-3"></i>
                              ชำระเงิน
                            </MenuItem>
                          )}
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>

      {/* Modal รายละเอียด */}
      <Dialog open={open} size="xl" handler={handleOpen}>
        <DialogHeader>
          รายการบิลที่ :{" "}
          {dataModal?.number ? dataModal?.number : dataModal?.sale_code}
        </DialogHeader>
        <DialogBody style={{ marginTop: "-20px" }}>
          <div className="grid-rows grid h-80 gap-4 overflow-scroll p-3  md:h-full md:grid-cols-2 md:overflow-hidden lg:grid-cols-2 ">
            <div className="m-2">
              <Typography variant="h5" className="mb-2 text-black ">
                รายการ
              </Typography>
              <p className="text-black">
                หัวข้อประมูล : {dataModal?.auction_report_auctionstarted}
              </p>
              <p className="text-black">
                เลขที่ใบรับของ :{" "}
                {dataModal?.number ? dataModal?.number : dataModal?.sale_code}
              </p>
              <p className="text-black">
                ผู้บริจาค :{" "}
                {dataModal?.auction_report_user_auction
                  ? dataModal?.auction_report_user_auction
                  : dataModal?.sale_code_customer_name}
              </p>
              <p className="text-red-500 ">
                ราคารวม :{" "}
                {dataModal?.auction_report_price
                  ? Number(dataModal?.auction_report_price).toLocaleString()
                  : Number(dataModal?.sale_auction_price).toLocaleString()}{" "}
                บาท
              </p>
              <hr className="m-2 " />

              <div className="mt-2 mb-2 grid grid-cols-3 gap-4">
                {dataModal?.aomsin1?.map((data, index) =>
                  data?.auction_auction_start_event === "สลากออมสิน" ? (
                    <p key={index} className="text-black">
                      {" "}
                      สลากออมสิน {data?.auction_auction_start_event_count} ใบ
                    </p>
                  ) : (
                    <p key={index} className="text-black">
                      {" "}
                      ล็อตเตอรี่ : {data?.auction_auction_start_event_count} ใบ
                    </p>
                  )
                )}

                {dataModal?.aomsin?.map((data, index) =>
                  data?.sale_auction_start_event == 1 ? (
                    <p key={index} className="text-black">
                      {" "}
                      สลากออมสิน : {data?.sale_auction_start_event_count} ใบ
                    </p>
                  ) : (
                    <p key={index} className="text-black">
                      {" "}
                      ล็อตเตอรี่ : {data?.sale_auction_start_event_count} ใบ
                    </p>
                  )
                )}
              </div>




              <Card
                style={{ backgroundColor: "#E7E7E7" }}
                className=" h-60 w-full overflow-y-auto p-4  shadow-xl  "
              >
                <b className="m-4 text-black">วัตถุมงคล</b>
                <ul>
                  {dataModal?.product1?.map((data, index) => (
                    <li key={index}>
                      {data?.auction_product_start_event_cat === "วัตถุมงคล" &&
                        `${index + 1}. ${
                          data?.auction_product_start_event
                        }  | จำนวน : ${
                          data?.auction_product_start_event_count
                        }  ${data?.auction_product_start_event_cat_count} `}
                    </li>
                  ))}

                  {dataModal?.product?.map((data, index) => (
                    <li key={index}>
                      {data?.sale_auction_start_event_count_cat ===
                        "วัตถุมงคล" &&
                        `${index + 1}.  
                      ${data?.sale_auction_start_event}  
                      | จำนวน : 
                      ${data?.sale_auction_start_event_count_price} 
                       ${data?.sale_auction_start_event_count_cat} 
                       | ราคา : 
                       ${data?.sale_auction_start_event_count} บาท
                       `}
                    </li>
                  ))}
                </ul>

                <b className="m-4 text-black ">โทรศัพท์</b>
                <ul>
                  {dataModal?.product1?.map((data, index) => (
                    <li key={index}>
                      {data?.auction_product_start_event_cat === "โทรศัพท์" &&
                        `${index + 1}.  ${
                          data?.auction_product_start_event
                        }  | จำนวน : ${
                          data?.auction_product_start_event_count
                        }  ${data?.auction_product_start_event_cat_count} `}
                    </li>
                  ))}
                  {dataModal?.product?.map((data, index) => (
                    <li key={index}>
                      {data?.sale_auction_start_event_count_cat ===
                        "โทรศัพท์" &&
                        `${index + 1}.  
                      ${data?.sale_auction_start_event}  
                      | จำนวน : 
                      ${data?.sale_auction_start_event_count_price} 
                       ${data?.sale_auction_start_event_count_cat} 
                       | ราคา : 
                       ${data?.sale_auction_start_event_count} บาท
                       `}
                    </li>
                  ))}
                </ul>

                <b className="m-4 text-black">เครื่องใช้สำนักงาน</b>
                <ul>
                  {dataModal?.product1?.map((data, index) => (
                    <li key={index}>
                      {data?.auction_product_start_event_cat ===
                        "เครื่องใช้สำนักงาน" &&
                        `${index + 1}.  ${
                          data?.auction_product_start_event
                        }  | จำนวน : ${
                          data?.auction_product_start_event_count
                        }  ${data?.auction_product_start_event_cat_count} `}
                    </li>
                  ))}

                  {dataModal?.product?.map((data, index) => (
                    <li key={index}>
                      {data?.sale_auction_start_event_count_cat ===
                        "เครื่องใช้สำนักงาน" &&
                        `${index + 1}.  
                      ${data?.sale_auction_start_event}  
                      | จำนวน : 
                      ${data?.sale_auction_start_event_count_price} 
                       ${data?.sale_auction_start_event_count_cat} 
                       | ราคา : 
                       ${data?.sale_auction_start_event_count} บาท
                       `}
                    </li>
                  ))}
                </ul>

                <b className="m-4 text-black">เครื่องใช้ไฟฟ้า</b>
                <ul>
                  {dataModal?.product1?.map((data, index) => (
                    <li key={index}>
                      {data?.auction_product_start_event_cat ===
                        "เครื่องใช้ไฟฟ้า" &&
                        `${index + 1}.  ${
                          data?.auction_product_start_event
                        }  | จำนวน : ${
                          data?.auction_product_start_event_count
                        }  ${data?.auction_product_start_event_cat_count} `}
                    </li>
                  ))}

                  {dataModal?.product?.map((data, index) => (
                    <li key={index}>
                      {data?.sale_auction_start_event_count_cat ===
                        "เครื่องใช้ไฟฟ้า" &&
                        `${index + 1}.  
                      ${data?.sale_auction_start_event}  
                      | จำนวน : 
                      ${data?.sale_auction_start_event_count_price} 
                       ${data?.sale_auction_start_event_count_cat} 
                       | ราคา : 
                       ${data?.sale_auction_start_event_count} บาท
                       `}
                    </li>
                  ))}
                </ul>

                <b className="m-4 text-black">อื่นๆ</b>
                <ul>
                  {dataModal?.product1?.map((data, index) => (
                    <li key={index}>
                      {data?.auction_product_start_event_cat === "อื่นๆ" &&
                        `${index + 1}.  ${
                          data?.auction_product_start_event
                        }  | จำนวน : ${
                          data?.auction_product_start_event_count
                        }  ${data?.auction_product_start_event_cat_count} `}
                    </li>
                  ))}

                  {dataModal?.product?.map((data, index) => (
                    <li key={index}>
                      {data?.sale_auction_start_event_count_cat === "อื่นๆ" &&
                        `${index + 1}.  
                      ${data?.sale_auction_start_event}  
                      | จำนวน : 
                      ${data?.sale_auction_start_event_count_price} 
                       ${data?.sale_auction_start_event_count_cat} 
                       | ราคา : 
                       ${data?.sale_auction_start_event_count} บาท
                       `}
                    </li>
                  ))}
                </ul>
              </Card>

              <p className="mt-4 text-black">
                หมายเหตุ :{" "}
                {dataModal?.auction_report_q
                  ? dataModal?.auction_report_q
                  : dataModal?.sale_auction_q}
              </p>
            </div>
            <div className="m-2">
              <Typography variant="h5" className="mb-2  text-black">
                ข้อมูลการชำระเงิน
              </Typography>

              {dataPay?.[0] && (
                <>
                  <div className="mt-2 mb-2 grid grid-cols-2 gap-4">
                    <div className="m-2">
                      <p className="text-black">
                        ชำระโดย :{" "}
                        {(dataModal?.status_sale === 1 && "เงินสด") ||
                          (dataModal?.status_sale === 2 && "เงินโอน") ||
                          (dataModal?.status_sale === 3 && "เช็ค")}{" "}
                      </p>
                      <p className="mt-2 text-black">
                        ผู้รับชำระ : {dataPay?.[0]?.sale_receipt_name}
                      </p>
                      <p className="mt-2 text-black">
                        วันที่รับชำระ : {dataPay?.[0]?.sale_receipt_date_pay}
                      </p>
                      <p className="mt-2 text-black">
                        เลขที่อ้างอิง : {dataPay?.[0]?.sale_receipt_number}
                      </p>
                      <p className="mt-2 text-black">
                        วันที่ใบเสร็จ : {dataPay?.[0]?.sale_receipt_date}
                      </p>

                      <p className="mt-2 text-black">
                        โอนเข้าธนาคาร : {dataPay?.[0]?.sale_receipt_acc}
                      </p>
                    </div>
                    <div className="m-2">
                      <img
                        className="h-ful w-full object-cover object-center"
                        src={`${import.meta.env.VITE_APP_API}/${
                          dataPay?.[0]?.sale_receipt_image
                        }`}
                        alt=""
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          {/* <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>ออก</span>
          </Button> */}
          <Button variant="filled" color="gray" onClick={handleOpen}>
            <span>ออก</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
export default Account;
