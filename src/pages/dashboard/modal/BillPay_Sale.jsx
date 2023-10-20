import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

const BillPay_Sale = ({ open5, handleOpen5, data, statusModal  }) => {

  const [dataPay, setDataPay] = useState({})

  const fethDataPay = async()=>{
    if (data.id_receipt){
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API}/Receipt/${data.id_receipt}/detail`)
        console.log(res.data[0]);
        setDataPay(res.data[0])
        
      } catch (error) {
        console.log(error);
      }
    }
  }


  useEffect(() => {
    console.log(data);
    fethDataPay()
  }, [open5]);
  
  return (
    <div>
      <Dialog open={open5} size="xl" handler={handleOpen5}>
        <DialogHeader> 
            บิลที่ {data?.sale_code} 
            {statusModal == "1" && " ( เครื่องพิมพ์หัวเข็ม ) "}
            {statusModal == "2" && " ( เครื่องพิมพ์ธรรมดา ) "}

            </DialogHeader>
        <DialogBody divider>
        <p>ปล. ข้อมูลใน console.log</p>
        </DialogBody>

       
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen3}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen3}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </div>
  );
};

export default BillPay_Sale;
