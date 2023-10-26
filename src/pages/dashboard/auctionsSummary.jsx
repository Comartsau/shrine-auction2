import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdSearch } from "react-icons/md";
import { TfiPrinter } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Line } from "react-icons/ri";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";
import {
  Card,
  Typography,
  Button,
  CardFooter,
  IconButton,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";

export function AuctionsSummary() {
  const [listData, setListData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryPay, setSearchQueryPay] = useState("");
  const [noData, setNoData] = useState(true);
  const [reportData, setReportData] = useState([]);

  const [billData, setBillData] = useState([]);
  const [billDataId, setBillDataId] = useState("");

  const [startDateExcel, setStartDateExcel] = useState(new Date());
  const [endDateExcel, setEndDateExcel] = useState(new Date());

  // ---------  Token ------------------------ //
  const Token = localStorage.getItem("token");

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  //---------- แสดงข้อมูลในตาราง --------------- //
  const fetchData = async () => {
    try {
      let url = "";
      if ((startDateExcel && endDateExcel) || searchQuery) {
        // console.log(startDateExcel);
        const formattedStartDate = formatDate1(startDateExcel, "YYYY-MM-DD");
        const formattedEndDate = formatDate1(endDateExcel, "YYYY-MM-DD");
        // console.log(formattedStartDate);
        // console.log(formattedEndDate);
        //  url = `${import.meta.env.VITE_APP_API}/search-report-sale/`;
        url = `${
          import.meta.env.VITE_APP_API
        }/search-report-sale/?search=${searchQuery},${formattedStartDate},${formattedEndDate}&pay=${searchQueryPay}`;
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      console.log(response.data)
      setListData(response.data);
      setNoData(false);
    } catch (error) {
      console.error(error);
      setNoData(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, searchQueryPay, startDateExcel, endDateExcel]);

  //------------- แปลง วันที่ ------------------------------------- //

  function formatDate(dateString, format) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      return ""; // หรือค่า default ที่คุณต้องการ
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  }
  function formatDate1(dateString, format) {
    const date = new Date(dateString);

    if (isNaN(date)) {
      return ""; // หรือค่า default ที่คุณต้องการ
    }

    if (format === "DD/MM/YYYY") {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    // return `${year}-${month}-${day}`;
    return `${year}-${month}-${day}`;
  }

  // ----  ออก excel ----------------------------------- //

  const exportToExcel = async () => {
    try {
      // console.log(searchData)
      // console.log(searchQuery)

      const url = `${
        import.meta.env.VITE_APP_API
      }/Customer-Excel/?search=${searchQuery}`;

      // ตรวจสอบว่ามี Token หรือไม่
      const Token = localStorage.getItem("token");
      if (!Token) {
        throw new Error("Token not found.");
      }

      // ส่งคำขอไปยัง API โดยใส่ Token ใน Header
      const response = await axios.get(url, {
        responseType: "blob", // ระบุ responseType เป็น 'blob'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Reports_Auction_Title.xlsx"; // ตั้งชื่อไฟล์ที่จะดาวน์โหลด
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      Swal.fire({
        icon: "error",
        title: "ออก Excel ไม่สำเร็จ ",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const dateObject = new Date(reportData.sale_auction_date);

  // รับค่าวันที่, เดือน, และปี
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // เดือนจะนับเริ่มต้นที่ 0, เพิ่ม 1 เพื่อเป็นเดือนที่ถูกต้อง
  const year = dateObject.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.

  // สร้างรูปแบบวันที่ใหม่ "dd/mm/yyyy"
  const formattedDate1 = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return (
    <div>
      {/* <p>ข้อมูลผู้บริจาค</p> */}
      <div className="mx-3 mt-3 flex w-full  flex-col justify-center  gap-5 xl:justify-start xl:gap-3 2xl:flex-row  ">
        <div className="flex  flex-col items-center justify-center  gap-5 sm:justify-start md:flex-row ">
          <div className="flex flex-col justify-center  gap-5  md:flex-row xl:justify-start xl:gap-2 ">
            <div className="flex">
              <div className="flex w-[80%] sm:w-[430px] md:w-[300px] lg:w-[350px] 2xl:w-[210px] ">
                <Input
                  type="text"
                  label="ค้นหาผู้บริจาค / เลขใบรับของ"
                  value={searchQuery}
                  className="flex justify-center "
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex  ">
              <Select
                label="ค้นหาชำระ/ยังไม่ชำระ"
                onChange={(e) => {
                  // console.log(e)
                  setSearchQueryPay(e);
                }}
              >
                <Option value="">ทั้งหมด</Option>
                <Option value="2">ชำระแล้ว</Option>
                <Option value="1">ยังไม่ชำระ</Option>
              </Select>
            </div>
            <div className="flex  justify-center gap-5 md:justify-start xl:gap-2">
              <div className="flex justify-center ">
                <DatePicker
                  selected={startDateExcel}
                  // yearDropdownItemNumber={100} // จำนวนปีที่แสดงใน Dropdown
                  // yearItemNumber={100} // จำนวนปีที่แสดงในปฏิทิน
                  // showYearDropdown
                  // showMonthDropdown
                  // scrollableYearDropdown
                  // scrollableMonthDropdown
                  locale={th}
                  dateFormat=" วันเริ่มต้น dd/MM/yyyy"
                  label="วันสิ้นสุด"
                  onChange={(date) => setStartDateExcel(date)}
                  className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-center ">
                <DatePicker
                  selected={endDateExcel}
                  locale={th}
                  dateFormat="วันสิ้นสุด dd/MM/yyyy"
                  onChange={(date) => setEndDateExcel(date)}
                  className="w-full rounded-md border border-gray-400 p-2 text-gray-600  shadow-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  fullWidth
                  className="flex w-[200px] items-center justify-center bg-green-500 align-middle text-base md:w-[120px]     lg:w-[150px]"
                  onClick={exportToExcel}
                >
                  <span className="mr-2 text-xl">
                    <SiMicrosoftexcel />
                  </span>
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------ table  ----------------------------------------- */}

      <Card className="mt-5 h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th
                // key={head}
                className="flex justify-center border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  #
                </Typography>
              </th>
              <th
                // key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  วันที่
                </Typography>
              </th>
              <th
                // key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  หัวข้อประมูล
                </Typography>
              </th>

              <th
                // key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex font-normal leading-none opacity-70"
                >
                  ชื่อผู้บริจาค
                </Typography>
              </th>
              <th
                // key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex font-normal leading-none opacity-70"
                >
                  เลขที่ใบรับของ
                </Typography>
              </th>
              <th
                // key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex font-normal leading-none opacity-70"
                >
                  สถานะ
                </Typography>
              </th>
              <th
                // key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex font-normal leading-none opacity-70"
                >
                  จำนวนเงิน
                </Typography>
              </th>
            </tr>
          </thead>
          {noData ? (
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Typography>...ไม่พบข้อมูล...</Typography>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {displayedData.map((data, index) => {
                const isLast = index === displayedData.length - 1;
                const pageIndex = startIndex + index;
                const classes = isLast
                  ? "p-3"
                  : "p-3  border-b  border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold "
                        >
                          {pageIndex + 1 || ""}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {formatDate(data?.auction_report_date) || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {data.auction_report_auctionstarted || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {data?.auction_report_user_auction || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {data?.number || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        style={{
                          color:
                            data?.status_sale === 1 ||
                            data?.auction_report_Pay_status === 1
                              ? "red"
                              : "green",
                        }}
                        className="font-normal"
                      >
                        {data?.auction_report_Pay_status === 1
                          ? "ยังไม่ชำระ"
                          : "ชำระแล้ว"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {Number(data?.auction_report_price).toLocaleString() ||
                          ""}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <div className="mt-5"></div>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="pr-3  text-right font-bold ">
                  รวมจำนวนเงิน:
                </td>
                <td className="font-bold">
                  {listData
                    .reduce(
                      (total, data) =>
                        total + Number(data.auction_report_price),
                      0
                    )
                    .toLocaleString()}{" "}
                  บาท
                </td>
              </tr>
            </tbody>
          )}
        </table>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ก่อนหน้า
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <IconButton
                key={i}
                variant="outlined"
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }
              >
                {i + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ถัดไป
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export default AuctionsSummary;
