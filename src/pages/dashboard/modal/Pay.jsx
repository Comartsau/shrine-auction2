import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
  Input,
} from "@material-tailwind/react";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";


const Pay = ({ openPay, handleOpen3, dataPayModal, fetchData }) => {
  let currentDate = moment().format("DD MM YYYY");
  const [statusRadio, setStatusRadio] = useState(1);
  const [sendData, setSendData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  let url = "";

  const selectRadio = (number) => {
    setStatusRadio(number);
  };

  const handleSave = async () => {
    try {
      if (dataPayModal.number === 1) {
        url = `${import.meta.env.VITE_APP_API}/Receipt-Auctions`;
      } else {
        url = `${import.meta.env.VITE_APP_API}/Receipt`;
      }

      const formData = new FormData();

      formData.append("sale_auction", Number(sendData?.sale_auction) || "");
      formData.append("sale_receipt_acc", sendData?.sale_receipt_acc || "");
      formData.append(
        "sale_receipt_date_pay",
        sendData?.sale_receipt_date_pay || ""
      );
      formData.append("sale_receipt_name", sendData?.sale_receipt_name || "");
      formData.append(
        "sale_receipt_number",
        sendData?.sale_receipt_number || ""
      );
      formData.append("sale_receipt_image", selectedFile || "");
      formData.append("sale_receipt_bank", sendData?.sale_receipt_bank || "");
      formData.append("sale_receipt_check", sendData?.sale_receipt_check || "");
      formData.append("sale_receipt_status", Number(statusRadio) || "");
      formData.append("sale_receipt_name_export", sendData?.sale_receipt_name_export || "")

        // console.log("FormData:", JSON.stringify([...formData.entries()]));


      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    // console.log(res.data);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'บันทึกสำเร็จ !',
      showConfirmButton: false,
      timer: 1500
    })

      handleOpen3();
      setStatusRadio(1);
      fetchData()


    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSendData((prev) => ({
      ...prev,
      sale_auction: dataPayModal?.id,
    }));
   
  }, [openPay]);

  return (
    <div>
      <Dialog open={openPay} size="lg" handler={handleOpen3} className="p-4">
        <DialogHeader className="flex flex-col justify-between md:flex-row lg:flex-row">
          <p>เลือกวิธีการชำระเงิน</p>
          <p>บิลที่ {dataPayModal?.billNumber}</p>
        </DialogHeader>
        <DialogBody
          divider
          className=" overflow-y-scroll pr-2 h-80  lg:h-auto md:h-auto "
        >
          <div className="  w-full">
            <br />
            <div>
              <b className="text-black">วันที่ : </b> <span>{currentDate}</span>
            </div>
            <div className="flex flex-col justify-center gap-10 md:flex-row lg:flex-row">
              <Radio
                name="type"
                label="เงินสด"
                defaultChecked
                onChange={() => selectRadio(1)}
              />
              <Radio
                name="type"
                label="เงินโอน"
                onChange={() => selectRadio(2)}
              />
              <Radio name="type" label="เช็ค" onChange={() => selectRadio(3)} />
            </div>

            <div className="mt-4 flex flex-col gap-4 md:flex-row lg:flex-row">
              <Input
                type="text"
                label="ผู้รับชำระ"
                onChange={(e) =>
                  setSendData((prev) => ({
                    ...prev,
                    sale_receipt_name: e.target.value,
                  }))
                }
              />
              <Input
                type="date"
                label="วันที่รับชำระ"
                onChange={(e) =>
                  setSendData((prev) => ({
                    ...prev,
                    sale_receipt_date_pay: e.target.value,
                  }))
                }
              />
            </div>

            {statusRadio !== 1 && statusRadio == 2 && (
              <div className="mt-4 flex flex-col gap-4 md:flex-row lg:flex-row">
                <Input
                  type="text"
                  label="โอนเข้าธนาคาร"
                  onChange={(e) =>
                    setSendData((prev) => ({
                      ...prev,
                      sale_receipt_acc: e.target.value,
                    }))
                  }
                />
                <Input
                  type="file"
                  label="อัพโหลดสลิป"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedFile(file);
                  }}
                />
              </div>
            )}

            {statusRadio !== 1 && statusRadio == 3 && (
              <div className="mt-4 flex flex-col gap-4 md:flex-row lg:flex-row">
                <Input
                  type="text"
                  label="ธนาคาร"
                  onChange={(e) =>
                    setSendData((prev) => ({
                      ...prev,
                      sale_receipt_bank: e.target.value,
                    }))
                  }
                />
                <Input
                  type="text"
                  label="เลขที่เช็ค"
                  onChange={(e) =>
                    setSendData((prev) => ({
                      ...prev,
                      sale_receipt_check: e.target.value,
                    }))
                  }
                />
              </div>
            )}

            <div className="mt-4 flex flex-col gap-4 md:flex-row lg:flex-row">
            <Input
                type="text"
                label="ผู้ออกบิล"
                onChange={(e) =>
                  setSendData((prev) => ({
                    ...prev,
                    sale_receipt_name_export: e.target.value,
                  }))
                }
              />

              <Input
                type="text"
                label="เลขที่อ้างอิง"
                onChange={(e) =>
                  setSendData((prev) => ({
                    ...prev,
                    sale_receipt_number: e.target.value,
                  }))
                }
              />
              
            </div>

            <div className="mt-4 flex justify-end gap-1 md:flex-row lg:flex-row">
              <Button
                variant="filled"
                color="gray"
                onClick={handleOpen3}
                className="mr-1"
              >
                <span>ออก</span>
              </Button>

              <Button
                variant="filled"
                color="blue"
                onClick={handleSave}
                className="mr-1"
              >
                <span>ชำระเงิน</span>
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default Pay;
