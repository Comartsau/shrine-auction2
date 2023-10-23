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
import React from "react";

const TABLE_HEAD = ["Name", "Job", "Employed", "111", "222", "3333"];

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
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row ">
        <div className="w-full md:w-64">
          <Card className="mt-6 w-full">
            <CardBody>
              <div className="flex flex-col gap-4 md:flex-row">
                <Button color="green">ประมูล222</Button>
                <Button color="green">ขายสินค้า</Button>
              </div>

              <Typography
                variant="lead"
                color="green"
                className="mb-2 mt-4 flex justify-end"
              >
                เงินสด 0 บาท
              </Typography>
              <Typography
                variant="lead"
                color="red"
                className="mb-2 mt-4 flex justify-end"
              >
                เงินเชื่อ 0 บาท
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="w-auto">
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
                    >
                      <option value="">ทั้งหมด</option>
                      <option value="xxx">สลากออมสิน</option>
                      <option value="xxx">ล็อตเตอรี่</option>
                      <option value="xxx">วัตถุมงคล</option>
                      <option value="xxx">โทรศัพท์</option>
                      <option value="xxx">เครื่องใช้สำนักงาน</option>
                      <option value="xxx">เครื่องใช้ไฟฟ้า</option>
                      <option value="xxx">อื่นๆ</option>

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
                    >
                      <option value="">ทั้งหมด</option>
                      <option>ชำระแล้ว</option>
                      <option>ยังไม่ชำระ</option>
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
                        <MenuItem>ทั้งหมด</MenuItem>
                        <MenuItem>เฉพาะที่เลือก</MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </div>
              </div>

              <Card className="mt-4 h-full w-full overflow-scroll">
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
                    {TABLE_ROWS.map(
                      ({ name, job, date1, date2, date3, date4 }, index) => (
                        <tr key={name} className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {job}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date1}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date2}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date3}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date4}
                            </Typography>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </Card>

              <div className="flex flex-col   mt-4" >
              <div className="flex justify-end">
              <Typography>จำนวนทั้งหมด : xxxxx รายการ</Typography>
              </div>
              <div className="flex justify-end">
              <Typography>ราคาสุทธิ : xxxxx บาท</Typography>
              </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailySummaryProduct;
