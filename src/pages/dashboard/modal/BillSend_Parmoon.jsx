import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const BillSend_Parmoon = ({ open3, handleOpen3, data, statusModal }) => {

  useEffect(() => {
    console.log(data[0]);

  }, [open3]);
  
  return (
    <div>
      <Dialog open={open3} size="xl" handler={handleOpen3}>
        <DialogHeader> 
            บิลที่ {data[0]?.number} 
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

export default BillSend_Parmoon;
