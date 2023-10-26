import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  ButtonGroup,
  Card,
  Typography,
  IconButton,
  Select,
} from "@material-tailwind/react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";

import axios from "axios";

const Product_modal = ({
  open2,
  handleOpen2,
  setTitleProduct,
  titleProduct,
  setProduct,
  products,
  type,
  setTotalPriceData,
}) => {
  const [status, setStatus] = useState(2);
  const [dataTitle, setDataTitle] = useState([]);
  const [titlePrice, setTitlePrice] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [productQty, setProductQty] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const [idProduct, setIdProduct] = useState("");
  const [newProduct, setNewProduct] = useState({});
  const [message, setMessage] = useState("");

  let sum = 0;

  const TABLE_HEAD_2 =
    type === 1
      ? ["#", "ชื่อสินค้า", "จำนวน", "หน่วยนับ", "หม่วดหมู่", "เลือก"]
      : [
          "#",
          "ชื่อสินค้า",
          "จำนวน",
          "หน่วยนับ",
          "ราคา/หน่วย",
          "หม่วดหมู่",
          "เลือก",
        ];

  const updateStatus = (number) => {
    setStatus(number);
  };
  const fetchDataTitle = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/Title`);
      // console.log(res.data);
      setDataTitle(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const searchDataTitle = async (e) => {
    const text = e.target.value;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/Search-Title/?topic=${text}`
      );
      setDataTitle(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const inputPriceTitle = (e, index) => {
    // console.log(e.target.value);
    setTitlePrice(e.target.value);
  };
  const handleTitle = () => {
    // const res = dataTitle.find(
    //   (data) => data.auction_topic_id == auction_topic_id
    // );
    // let TitlePrice = "";

    // if (titlePrice) {
    //   TitlePrice = titlePrice;
    // } else {
    //   TitlePrice = titleProduct?.auction_report_price;
    // }

    setTitleProduct({
      // auction_report_auctionstarted: res?.title_auction_topic,
      auction_report_price: titlePrice,
    });
    handleOpen2();
  };

  const fetchDataProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/Product`);
      setDataProduct(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const searchDataProduct = async (e) => {
    const text = e.target.value;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/Search-Product/?search=${text}`
      );
      setDataProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleProduct = (id) => {
    const res = dataProduct.find((data) => data.id == id);
    // console.log(products.length);

    if (products.length <= 6) {
      type === 1 &&
        setProduct([
          ...products,
          {
            id,
            auction_product_start_event: res?.product_name,
            auction_product_start_event_cat_count: res?.product_count,
            auction_product_start_event_cat: res?.product_category,
            auction_product_start_event_count: productQty || 0,
          },
        ]);

      type === 2 &&
        setProduct([
          ...products,
          {
            id,
            product_name: res?.product_name,
            product_count: res?.product_count,
            product_category: res?.product_category,
            sale_auction_start_event_count: productQty || 0,
            sale_auction_start_event_count_price: productPrice || 0,
          },
        ]);
    } else {
      // console.log("ไม่ได้ เกิน 8 แถวแล้วง");
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถทำรายการได้",
        text: "มีรายการสินค้าครบ 8 รายการแล้ว",
      });
    }

    handleOpen2();
  };
  const handleNewProduct = async () => {
    try {
      // console.log(newProduct);
      if (newProduct.product_name) {
        if (products.length <= 6) {
          const res = await axios.post(
            `${import.meta.env.VITE_APP_API}/Product`,
            newProduct
          );

          type === 1 &&
            setProduct([
              ...products,
              {
                auction_product_start_event: newProduct?.product_name,
                auction_product_start_event_cat_count:
                  newProduct?.product_count,
                auction_product_start_event_cat: newProduct?.product_category,
                auction_product_start_event_count: productQty || 0,
              },
            ]);

          type === 2 &&
            setProduct([
              ...products,
              {
                product_name: newProduct?.product_name,
                product_count: newProduct?.product_count,
                product_category: newProduct?.product_category,
                sale_auction_start_event_count: productQty || 0,
                sale_auction_start_event_count_price: productPrice || 0,
              },
            ]);

          setMessage("");
          handleOpen2();
          setNewProduct({});
          // console.log(products);
        } else {
          // console.log("ไม่ได้ เกิน 8 แถวแล้วง");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถทำรายการได้",
            text: "มีรายการสินค้าครบ 8 รายการแล้ว",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.message);
    }
  };

  const selectProduct = (id) => {
    const res = products.find((data) => data.id == id);

    type === 1 &&
      setNewProduct({
        product_name: res?.auction_product_start_event,
        product_category: res?.auction_product_start_event_cat,
        product_count: res?.auction_product_start_event_cat_count,
      });
    type === 2 &&
      setNewProduct({
        product_name: res?.product_name,
        product_category: res?.product_category,
        product_count: res?.product_count,
        sale_auction_start_event_count_price:
          res?.sale_auction_start_event_count_price,
      });

    type === 1 && setProductQty(res?.auction_product_start_event_count);
    type === 2 &&
      (setProductQty(res?.sale_auction_start_event_count),
      setProductPrice(res?.sale_auction_start_event_count_price));

    setIdProduct(id);
  };

  const handleUpdateProduct = async () => {
    const data = {
      product_count: newProduct.product_count,
      product_category: newProduct.product_category,
    };
    try {
      if (newProduct.product_name) {
        // const res = await axios.put(`${import.meta.env.VITE_APP_API}/Product`)

        // console.log(data);
        // console.log(products);

        const newData = products.map((data) => {
          if (data.id === idProduct && type === 1) {
            return {
              ...data,
              auction_product_start_event: newProduct?.product_name,
              auction_product_start_event_cat_count: newProduct?.product_count,
              auction_product_start_event_cat: newProduct?.product_category,
              auction_product_start_event_count: productQty || 0,
            };
          }
          if (data.id === idProduct && type === 2) {
            return {
              ...data,
              product_name: newProduct?.product_name,
              product_count: newProduct?.product_count,
              product_category: newProduct?.product_category,
              sale_auction_start_event_count: productQty || 0,
              sale_auction_start_event_count_price: productPrice || 0,
            };
          }
          return data;
        });

        // console.log(productQty);

        setProduct(newData);
        setMessage("");
        handleOpen2();
        setNewProduct({});
        setProductQty("");
        setProductPrice("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTitle();
    fetchDataProduct();
    // console.log(type);

    for (const item of products) {
      const data2 =
        item?.sale_auction_start_event_count_price *
        item?.sale_auction_start_event_count;

      sum += data2;
    }

    type === 2 && setTotalPriceData(sum);
  }, [products]);

  return (
    <>
      <Dialog open={open2} size="xl" handler={handleOpen2}>
        <DialogHeader>
          จัดการข้อมูลสินค้า :
          {status === 1 && type === 1 && " ค้นหาหัวข้อประมูล"}
          {status === 2 && " ค้นหาสินค้า"}
          {status === 3 && " เพิ่มสินค้าใหม่"}
          {status === 4 && " แก้ไขข้อมูลสินค้า"}
        </DialogHeader>
        <DialogBody
          divider
          className="overflow-y-scroll pr-2 sm:h-96 md:h-auto"
        >
          <div className="  w-full space-x-4">
            {/* เมนู */}
            <div className="m-4">
              <div className="grid  gap-2 sm:grid-cols-2 md:sm:grid-cols-4">
                {type === 1 && (
                  <Button
                    onClick={() => updateStatus(1)}
                    variant={status == 1 ? "outlined" : "gradient"}
                    className="text-lg"
                  >
                    ค้นหาหัวข้อประมูล
                  </Button>
                )}

                <Button
                  onClick={() => updateStatus(2)}
                  variant={status == 2 ? "outlined" : "gradient"}
                  className="text-lg"
                >
                  ค้นหาสินค้า
                </Button>

                <Button
                  onClick={() => updateStatus(3)}
                  variant={status == 3 ? "outlined" : "gradient"}
                  className="text-lg"
                >
                  เพิ่มสินค้าใหม่
                </Button>

                <Button
                  onClick={() => updateStatus(4)}
                  variant={status == 4 ? "outlined" : "gradient"}
                  className="text-lg"
                >
                  แก้ไขข้อมูลสินค้า
                </Button>
              </div>
            </div>

            <hr />

            <p style={{ color: "red" }}>{message}</p>

            <div className="m-4 mt-6">
              {/*เพิ่มผู้บริจาค  */}

              {status === 1 && type === 1 && (
                <div>
                  <div className="flex w-full  flex-col items-center gap-6 md:flex-row  lg:flex-row">
                    <div>
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {`ราคาปัจจุบัน : ${Number(
                          titleProduct?.auction_report_price
                        ).toLocaleString()} บาท`}
                      </Typography>
                    </div>

                    <div>
                      <Input
                        size="md"
                        label="กรอกราคาใหม่"
                        className=""
                        onChange={(e) => setTitlePrice(e.target.value)}
                      />
                    </div>

                    <Button
                      color="green"
                      variant="filled"
                      size="sm"
                      className=" rounded-full  border-4  border-green-500 "
                      onClick={() => handleTitle()}
                    >
                      บันทึก
                    </Button>
                  </div>
                </div>
              )}

              {status === 2 && (
                <div>
                  <div className="flex w-full  flex-col items-center gap-6 md:flex-row  lg:flex-row">
                    <div>
                      <Input
                        size="md"
                        label="ค้นหาสินค้า"
                        className=""
                        onChange={(e) => searchDataProduct(e)}
                      />
                    </div>
                  </div>

                  <Card className="mt-6 h-80 w-full overflow-scroll">
                    <table className="w-full  min-w-max table-auto text-center">
                      <thead>
                        <tr>
                          {TABLE_HEAD_2.map((head) => (
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
                        {dataProduct?.map((data, index) => {
                          const isLast = index === dataProduct.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={data?.id}>
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
                                <div className={type === 2 ? "" : " "}>
                                  <Input
                                    size="md"
                                    label="จำนวน"
                                    onChange={(e) =>
                                      setProductQty(e.target.value)
                                    }
                                  />
                                </div>
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
                              {type == 2 && (
                                <td className={classes}>
                                  <div className={type === 2 ? "" : " "}>
                                    <Input
                                      size="md"
                                      label="ราคา/หน่วย"
                                      onChange={(e) =>
                                        setProductPrice(e.target.value)
                                      }
                                    />
                                  </div>
                                </td>
                              )}

                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data?.product_category}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <IconButton
                                variant="filled"
                                  color="green"
                                  size="sm"
                                  className=" rounded-full  border-4  border-green-500 "
                                  onClick={() => handleProduct(data?.id)}
                                >
                                  <AiOutlinePlus className="text-2xl" />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Card>
                </div>
              )}

              {status === 3 && (
                <div>
                  <div className="flex w-full  flex-col items-center gap-6 md:flex-row  lg:flex-row">
                    <div className="w-full">
                      <Input
                        size="md"
                        label="ชื่อสินค้า"
                        className=""
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            product_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    {type === 2 && (
                      <div className="w-full">
                        <Input
                          size="md"
                          label="ราคา/หน่วย "
                          className=""
                          type="number"
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex  w-full flex-col items-center gap-6  md:flex-row lg:flex-row">
                    <div className="w-full">
                      <Input
                        size="md"
                        label="จำนวน (เฉพาะบิลนี้)"
                        className=""
                        type="number"
                        onChange={(e) => setProductQty(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <Input
                        size="md"
                        label="หน่วยนับ"
                        className=""
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            product_count: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="w-full">
                      <select
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            product_category: e.target.value,
                          }))
                        }
                        value={newProduct?.product_category || " "}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value=""></option>
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
                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleNewProduct} color="green">
                      บันทึก
                    </Button>
                  </div>
                </div>
              )}
              {status === 4 && (
                <div>
                  <div className="flex w-full  flex-col items-center gap-6 md:flex-row  lg:flex-row">
                    <div className="w-full">
                      <Input
                        disabled
                        size="md"
                        label="ชื่อสินค้า"
                        className=""
                        value={newProduct?.product_name || " "}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            product_name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="w-full">
                      <select
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            product_category: e.target.value,
                          }))
                        }
                        value={newProduct?.product_category || " "}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value=""></option>
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
                  <div className="mt-6 flex  w-full flex-col items-center gap-6  md:flex-row lg:flex-row">
                    {type === 2 && (
                      <div className="w-full">
                        <Input
                          size="md"
                          label="ราคา/หน่วย "
                          className=""
                          type="number"
                          // value={newProduct?. sale_auction_start_event_count_price || ""}
                          value={productPrice || ""}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="w-full">
                      <Input
                        size="md"
                        label="จำนวน (เฉพาะบิลนี้)"
                        className=""
                        type="number"
                        value={productQty || ""}
                        onChange={(e) => setProductQty(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <Input
                        size="md"
                        label="หน่วยนับ"
                        className=""
                        value={newProduct?.product_count || " "}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            product_count: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <Button onClick={handleUpdateProduct} color="green">
                      อัพเดท
                    </Button>
                  </div>

                  <hr className="mt-4" />

                  <Card className="mt-6 h-60 w-full overflow-scroll">
                    <table className="w-full  min-w-max table-auto text-center">
                      <thead>
                        <tr>
                          {TABLE_HEAD_2.map((head) => (
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
                        {products?.map((data, index) => {
                          const isLast = index === dataProduct.length - 1;
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
                                  {data?.auction_product_start_event
                                    ? data?.auction_product_start_event
                                    : data?.product_name}
                                </Typography>
                              </td>
                              <td className={classes}>
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
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data?.auction_product_start_event_cat_count
                                    ? data?.auction_product_start_event_cat_count
                                    : data?.product_count}
                                </Typography>
                              </td>
                              {type === 2 && (
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
                              )}

                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {data?.auction_product_start_event_cat
                                    ? data?.auction_product_start_event_cat
                                    : data?.product_category}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <IconButton
                                variant="filled"
                                  color="green"
                                  size="sm"
                                  className=" rounded-full  border-4  border-green-500 "
                                  onClick={(e) => selectProduct(data?.id)}
                                >
                                  <AiOutlinePlus className="text-2xl" />
                                </IconButton>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="outlined"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>ออก</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
};

export default Product_modal;
