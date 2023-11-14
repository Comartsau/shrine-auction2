import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  ButtonGroup,
} from "@material-tailwind/react";
import axios from "axios";

const Customer_modal = ({
  open,
  handleOpen,
  setCustomerData,
  fetchdataCustomer,
  dataAllCustomer,
  id,
  type,
}) => {
  const [status, setStatus] = useState(1);
  const [dataSend, setDataSend] = useState({});

  const updateStatus = (number) => {
    setStatus(number);
  };

  const handleSendAddData = async () => {
    if (dataSend.customer_name) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_API}/Customer`,
          dataSend
        );
        // console.log(res.data);
        handleOpen();

        type == 1 &&
          setCustomerData((prev) => ({
            ...prev,
            auction_report_customer_address: res.data.customer_address,
            auction_report_customer_delivery: res.data.customer_delivery,
            auction_report_customer_contract: res.data.customer_contract,
            auction_report_customer_noun: res.data.customer_noun,
            auction_report_user_auction: res.data.customer_name,
            id: res.data.id,
          }));

        type == 2 &&
          setCustomerData((prev) => ({
            ...prev,
            sale_code_customer_address: res.data.customer_address,
            sale_code_customer_delivery: res.data.customer_delivery,
            sale_code_customer_contract: res.data.customer_contract,
            sale_code_customer_noun: res.data.customer_noun,
            sale_code_customer_name: res.data.customer_name,
            id: res.data.id,
          }));

        fetchdataCustomer();
        setDataSend({});
      } catch (error) {
        console.error(error);
      }
    } else {
      // console.log("กรุฯากรอก ชื่อผู้บริจาค");
    }
  };

  const setDataToState = () => {
    const res = dataAllCustomer?.find((data) => data.id == id);

    setDataSend({
      customer_address: res?.customer_address || " ",
      customer_delivery: res?.customer_delivery || " ",
      customer_contract: res?.customer_contract || " ",
      customer_noun: res?.customer_noun || " ",
      customer_name: res?.customer_name || " ",
      customer_tel: res?.customer_tel || " ",
      customer_number: res?.customer_number || " ",
      id: res?.id || " ",
      customer_code: res?.customer_code,
      customer_line: "",
    });
  };

  const handleSendUpdateData = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/Customer/${dataSend.id}/edit`,
        dataSend
      );
      // console.log(res.data);
      fetchdataCustomer();

      type == 1 &&
        setCustomerData((prev) => ({
          ...prev,
          auction_report_customer_address: dataSend?.customer_address || " ",
          auction_report_customer_delivery: dataSend?.customer_delivery || " ",
          auction_report_customer_contract: dataSend?.customer_contract || " ",
          auction_report_customer_noun: dataSend?.customer_noun || " ",
          auction_report_user_auction: dataSend?.customer_name || " ",
          auction_report_customer_tel: dataSend?.customer_tel || " ",
          customer_number: dataSend?.customer_number || " ",
          id: dataSend?.id || " ",
          customer_line: "",
        }));

      type == 2 &&
        setCustomerData((prev) => ({
          ...prev,
          sale_code_customer_address: dataSend?.customer_address || " ",
          sale_code_customer_delivery: dataSend?.customer_delivery || " ",
          sale_code_customer_contract: dataSend?.customer_contract || " ",
          sale_code_customer_noun: dataSend?.customer_noun || " ",
          sale_code_customer_name: dataSend?.customer_name || " ",
          sale_code_customer_tel: dataSend?.customer_tel || " ",
          customer_number: dataSend?.customer_number || " ",
          id: dataSend?.id || " ",
          customer_line: "",
        }));

      handleOpen();
      setDataSend({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendUpdateDataForBill = async () => {
    try {
      fetchdataCustomer();

      type == 1 &&
        setCustomerData((prev) => ({
          ...prev,
          auction_report_customer_address: dataSend?.customer_address || " ",
          auction_report_customer_delivery: dataSend?.customer_delivery || " ",
          auction_report_customer_contract: dataSend?.customer_contract || " ",
          auction_report_customer_noun: dataSend?.customer_noun || " ",
          auction_report_user_auction: dataSend?.customer_name || " ",
          auction_report_customer_tel: dataSend?.customer_tel || " ",
          customer_number: dataSend?.customer_number || " ",
          sale_code_customer_line: " ",
        }));

      type == 2 &&
        setCustomerData((prev) => ({
          ...prev,
          sale_code_customer_address: dataSend?.customer_address || " ",
          sale_code_customer_delivery: dataSend?.customer_delivery || " ",
          sale_code_customer_contract: dataSend?.customer_contract || " ",
          sale_code_customer_noun: dataSend?.customer_noun || " ",
          sale_code_customer_name: dataSend?.customer_name || " ",
          sale_code_customer_tel: dataSend?.customer_tel || " ",
          customer_number: dataSend?.customer_number || " ",
          sale_code_customer_line: " ",
        }));

      handleOpen();
      setDataSend({});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataToState();
  }, [dataAllCustomer, id]);

  return (
    <>
      <Dialog open={open} size="xl" handler={handleOpen}>
        <DialogHeader>
          จัดการข้อมูลผู้บริจาค :{status === 1 && " เพิ่มผู้บริจาค"}
          {status === 2 && " แก้ไขข้อมูล"}
          {status === 3 && " แก้ไขเฉพาะบิล"}
        </DialogHeader>
        <DialogBody
          divider
          className="overflow-y-scroll pr-2 sm:h-96 md:h-auto"
        >
          <div className="  w-full space-x-4">
            {/* เมนู */}
            <div className="m-4">
              <div className="grid  gap-2 sm:grid-cols-2 md:sm:grid-cols-3">
                <Button
                  onClick={() => updateStatus(1)}
                  variant={status == 1 ? "outlined" : "gradient"}
                  className="text-lg"
                >
                  เพิ่มผู้บริจาค
                </Button>

                <Button
                  onClick={() => updateStatus(2)}
                  variant={status == 2 ? "outlined" : "gradient"}
                  className="text-lg"
                >
                  แก้ไขข้อมูล
                </Button>

                <Button
                  onClick={() => updateStatus(3)}
                  variant={status == 3 ? "outlined" : "gradient"}
                  className="text-lg"
                >
                  แก้ไขเฉพาะบิล
                </Button>
              </div>
            </div>

            {/* {JSON.stringify(dataSend)}
            {"test " + id} */}

            <div className="m-4 mt-6">
              {/*เพิ่มผู้บริจาค  */}
              {status === 1 && (
                <div>
                  <div className=" w-72">
                    <Input
                      label="ชื่อผู้บริจาค"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className=" mt-4 w-full">
                    <Input
                      label="ที่อยู่ผู้บริจาค"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_address: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className=" mt-4 w-full">
                    <Input
                      label="สถานที่จัดส่ง"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_delivery: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      label="ผู้ติดต่อ"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_contract: e.target.value,
                        }))
                      }
                    />

                    <Input
                      label="ออกฉลากในนาม"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_noun: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      label="โทรศัพท์"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_tel: e.target.value,
                        }))
                      }
                    />

                    <Input
                      label="เลขที่อ้างอิง"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_number: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleSendAddData}
                      color="green"
                      className="m-1"
                    >
                      บันทึก
                    </Button>
                    <Button onClick={handleOpen} color="gray" className="m-1">
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              )}

              {/* แก้ไข */}
              {status === 2 && (
                <div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      value={dataSend?.customer_name  }
                      label="ชื่อผู้บริจาค"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_name: e.target.value ,
                        }))
                      }
                    />

                    <Input
                      value={dataSend?.customer_code }
                      disabled
                    />
                  </div>

                  <div className=" mt-4 w-full">
                    <Input
                      label="ที่อยู่ผู้บริจาค"
                      value={dataSend?.customer_address }
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_address: e.target.value ,
                        }))
                      }
                    />
                  </div>

                  <div className=" mt-4 w-full">
                    <Input
                      value={dataSend?.customer_delivery }
                      label="สถานที่จัดส่ง"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_delivery: e.target.value ,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      value={dataSend?.customer_contract }
                      label="ผู้ติดต่อ "
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_contract: e.target.value ,
                        }))
                      }
                    />

                    <Input
                      label="ออกฉลากในนาม"
                      value={dataSend?.customer_noun }
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_noun: e.target.value ,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      label="โทรศัพท์"
                      value={dataSend?.customer_tel}
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_tel: e.target.value ,
                        }))
                      }
                    />

                    <Input
                      label="เลขที่อ้างอิง"
                      value={dataSend?.customer_number}
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_number: e.target.value ,
                        }))
                      }
                    />
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleSendUpdateData}
                      color="purple"
                      className="m-1"
                    >
                      อัพเดท
                    </Button>
                    <Button onClick={handleOpen} color="gray" className="m-1">
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              )}

              {status === 3 && (
                <div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      value={dataSend?.customer_name }
                      label="ชื่อผู้บริจาค"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_name: e.target.value ,
                        }))
                      }
                    />

                    <Input
                      label="ออกฉลากในนาม"
                      value={dataSend?.customer_code}
                      disabled
                    />
                  </div>

                  <div className=" mt-4 w-full">
                    <Input
                      label="ที่อยู่ผู้บริจาค"
                      value={dataSend?.customer_address }
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_address: e.target.value ,
                        }))
                      }
                    />
                  </div>

                  <div className=" mt-4 w-full">
                    <Input
                      value={dataSend?.customer_delivery}
                      label="สถานที่จัดส่ง"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_delivery: e.target.value ,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      value={dataSend?.customer_contract }
                      label="ผู้ติดต่อ"
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_contract: e.target.value ,
                        }))
                      }
                    />

                    <Input
                      label="ออกฉลากในนาม"
                      value={dataSend?.customer_noun }
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_noun: e.target.value ,
                        }))
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    <Input
                      label="โทรศัพท์"
                      value={dataSend?.customer_tel }
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_tel: e.target.value ,
                        }))
                      }
                    />

                    <Input
                      label="เลขที่อ้างอิง"
                      value={dataSend?.customer_number }
                      onChange={(e) =>
                        setDataSend((prev) => ({
                          ...prev,
                          customer_number: e.target.value ,
                        }))
                      }
                    />
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleSendUpdateDataForBill}
                      color="purple"
                      className="m-1"
                    >
                      อัพเดท
                    </Button>
                    <Button onClick={handleOpen} color="gray" className="m-1">
                      ยกเลิก
                    </Button>
                  </div>
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

export default Customer_modal;
