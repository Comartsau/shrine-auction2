import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TABLE_HEAD = [
  "ลำดับ",
  "ชื่อสินค้า",
  "จำนวน",
  "หน่วยนับ",
  "ราคา/หน่วย",
  "ราคารวม",
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date1: "23/04/18",
    date2: "23/04/18",
    date3: "23/04/18",
    date4: "23/04/18",
  },
];

const DailySummaryProduct = () => {
  const [selectData, setSelectData] = useState({
    type_Data: 1,
  });
  const [data, setData] = useState([]);
  const [sumData, setSumData] = useState({});

  const [endData, setEndData] = useState({});
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    let url = "";

    if (selectData?.type_Data) {
      url = `${import.meta.env.VITE_APP_API}/Sum/search/?type_Data=${
        selectData?.type_Data
      }`;

      if (selectData?.category) {
        url = `${import.meta.env.VITE_APP_API}/Sum/search/?type_Data=${
          selectData?.type_Data
        }&category=${selectData?.category}`;
      }

      if (selectData?.pay) {
        url = `${import.meta.env.VITE_APP_API}/Sum/search/?type_Data=${
          selectData?.type_Data
        }&pay=${selectData?.pay}`;
      }

      if (selectData?.pay && selectData?.category) {
        url = `${import.meta.env.VITE_APP_API}/Sum/search/?type_Data=${
          selectData?.type_Data
        }&category=${selectData?.category}&pay=${selectData?.pay}`;
      }
    }

    try {
      const res = await axios.get(url);
      // console.log(res.data);
      setData(res.data);
      sumData2(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSum = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/Sum`);
      // console.log(res.data);
      setSumData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sumData2 = (dataFetch) => {
    let qty = 0;
    let total = 0;

    dataFetch?.map((item, index) => {
      const price = Number(item?.sale_auction_start_event_count_price);
      const count = Number(item?.sale_auction_start_event_count);
      const result = price * count;
      (qty += item?.auction_product_start_event_count
        ? Number(item?.auction_product_start_event_count)
        : Number(item?.sale_auction_start_event_count)),
        selectData.type_Data === 2 &&
          (total += Number(
            item?.sale_auction_start_event_count_price ? result : 0
          ));
    });

    setQty(qty);
    setTotal(total);
  };

  const fetchExcel = async (number) => {
    let urlExcel = "";
    const Token = localStorage.getItem("token");
    if (number === 1) {
      urlExcel = `${import.meta.env.VITE_APP_API}/Sum/excel/?type_Data=${
        selectData?.type_Data
      } `;
    } else {
      if (selectData.category) {
        urlExcel = `${import.meta.env.VITE_APP_API}/Sum/excel/?type_Data=${
          selectData.type_Data
        }&category=${selectData.category}`;
      }
    }
    try {
      // console.log(urlExcel);
      const res = await axios.get(urlExcel, {
        responseType: "blob", // ระบุ responseType เป็น 'blob'
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(res.data);

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Reports.xlsx"; // ตั้งชื่อไฟล์ที่จะดาวน์โหลด
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.log(error);
    }

    // sssssssssssssssssssssss
  };

  useEffect(() => {
    fetchData();
    fetchSum();
  }, [selectData]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row ">
        <div className="w-full md:w-96">
          <Card className="mt-6 w-full">
            <CardBody>
              <div className="flex flex-col gap-4 md:flex-row">
                <Button
                  color="green"
                  onClick={() =>
                    setSelectData((prev) => ({ ...prev, type_Data: 1 }))
                  }
                  variant={selectData.type_Data === 1 ? "outlined" : "filled"}
                >
                  ประมูล
                </Button>
                <Button
                  color="green"
                  onClick={() =>
                    setSelectData((prev) => ({ ...prev, type_Data: 2 }))
                  }
                  variant={selectData.type_Data === 2 ? "outlined" : "filled"}
                >
                  ขายสินค้า
                </Button>
              </div>

              <Typography
                variant="lead"
                color="green"
                className="mb-2 mt-4 flex justify-end"
              >
                {selectData.type_Data === 1 &&
                  `สลากออมสิน : ${sumData?.auction_aomsin2} ใบ`}
                {selectData.type_Data === 2 &&
                  `สลากออมสิน : ${sumData?.sale_aomsin1} ใบ`}
              </Typography>
              <Typography
                variant="lead"
                color="red"
                className="mb-2 mt-4 flex justify-end"
              >
                {selectData.type_Data === 1 &&
                  `ล็อตเตอรี่ : ${sumData?.auction_aomsin1} ใบ`}
                {selectData.type_Data === 2 &&
                  `ล็อตเตอรี่ : ${sumData?.sale_aomsin2} ใบ`}
              </Typography>

              <hr />

              <div className="mt-4 flex   flex-col">
                <div className="flex justify-end">
                  <Typography>จำนวนทั้งหมด : {qty} รายการ</Typography>
                </div>
                <div className="flex justify-end">
                  <Typography>
                    ราคาสุทธิ :{" "}
                    {selectData.type_Data === 1
                      ? 0
                      : Number(total).toLocaleString()}{" "}
                    บาท
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>

        </div>

        <div className="w-full">
          <Card className="mt-6 w-full">
            <CardBody>
              <div className="felx-col flex gap-5 md:flex-row">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    เลือกหมวดหมู่สินค้า
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setSelectData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option value="">ทั้งหมด</option>
                      <option value="วัตถุมงคล">วัตถุมงคล</option>
                      <option value="โทรศัพท์">โทรศัพท์</option>
                      <option value="เครื่องใช้สำนักงาน">
                        เครื่องใช้สำนักงาน
                      </option>
                      <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    เลือกประเภทชำระเงิน
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      onChange={(e) =>
                        setSelectData((prev) => ({
                          ...prev,
                          pay: e.target.value,
                        }))
                      }
                    >
                      <option value="">ทั้งหมด</option>
                      <option value="1">ยังไม่ชำระ</option>
                      <option value="2">ชำระแล้ว</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-end">
                  <div className="mt-2">
                    <Menu>
                      <MenuHandler>
                        <Button color="green">Excel</Button>
                      </MenuHandler>
                      <MenuList>
                        <MenuItem onClick={() => fetchExcel(1)}>
                          ทั้งหมด
                        </MenuItem>
                        <MenuItem onClick={() => fetchExcel(2)}>
                          เฉพาะที่เลือก
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </div>
              </div>

              <Card className="mt-4 h-80 w-full overflow-scroll">
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
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((data, index) => {
                      const price = Number(
                        data.sale_auction_start_event_count_price
                      );
                      const count = Number(data.sale_auction_start_event_count);
                      const result = price * count;
                      return (
                        <tr key={data?.id} className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data?.auction_product_start_event
                                ? data?.auction_product_start_event
                                : data?.sale_auction_start_event}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data?.auction_product_start_event_count
                                ? data?.auction_product_start_event_count
                                : data?.sale_auction_start_event_count}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data?.auction_product_start_event_cat_count
                                ? data?.auction_product_start_event_cat_count
                                : data?.sale_auction_start_event_count_unit}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data?.sale_auction_start_event_count_price
                                ? Number(
                                    data?.sale_auction_start_event_count_price
                                  ).toLocaleString()
                                : "-"}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data?.sale_auction_start_event_count_price
                                ? result.toLocaleString()
                                : "-"}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailySummaryProduct;
