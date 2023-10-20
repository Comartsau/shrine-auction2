import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

import { FiEdit } from "react-icons/fi";
import { AiOutlineCheckSquare , AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";

import {
  Card,
  Typography,
  Button,
  CardFooter,
  IconButton,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

export function Member() {
  const [listData, setListData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noData, setNoData] = useState(true);


  // ---------  Token ------------------------ //
  const Token = localStorage.getItem("token");

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = listData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listData.length / itemsPerPage);

  //---------- แสดงข้อมูลในตาราง --------------- //
  const fetchData = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API}/User`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response.data)
      const filteredData = response.data.filter(item => item.is_status === 2);

      const searchData = filteredData.filter((item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
      setListData(searchData);
      setNoData(false);
    } catch (error) {
      console.error(error);
      setNoData(true);
    }
  };

  // console.log(listData)

  

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  //--------- swicth  Active User ------------//

  const toggleIsActive = async (id ,value) => {
    try {
      const data = {
        is_active : value
      }
      let url = `${import.meta.env.VITE_APP_API}/User-Active/${id}`;      
      const response = await axios.put(url,data,
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });

      console.log(response.data)
      fetchData()
    } catch (error) {
      console.error(error);
      setNoData(true);
    }
  };

    // ---------  แก้ไขข้อมูล   User -------------- //
    const [userEditData, setUserEditData] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [dialogSize, setDialogSize] = useState("lg");
    const [userId, setUserId] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");
    // ----------------------------------------- //
  
    const handleEditClick = (data) => {
      setUserEditData(data);
      setUserId(data.id)
      setNewUser(data.username)
      setOpenEditDialog(true);
    };

  
    const handleCloseEditDialog = () => {
      setUserEditData([]);
      setOpenEditDialog(false);
    };




    //---------- Send Edit User ------------//

    const handleSendEdit = async () => {
      try {
        const data = {
          username : newUser,
          new_password: newPassword
        }
        let url = `${import.meta.env.VITE_APP_API}/password/${userId}`;      
        const response = await axios.post(url,data,
          {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        });
        console.log(response.data)
        fetchData()
        setNewUser("")
        setNewPassword("")
        setUserId("")
        setUserEditData([]);
        setOpenEditDialog(false);
      } catch (error) {
        console.error(error);
        setNoData(true);
      }
    };

  return (
    <div>
      {/* <p>ข้อมูลผู้บริจาค</p> */}
      <div className="mx-3 mt-3 flex w-full  flex-col justify-center  gap-5 xl:justify-start xl:gap-3 2xl:flex-row  ">
        <div className="flex  flex-col justify-center items-center  gap-5 sm:justify-start md:flex-row ">
          <div className="flex flex-col justify-center  gap-5  md:flex-row xl:justify-start xl:gap-2 ">
            <div className="flex    ">
              <div className="flex w-[80%] sm:w-[430px] md:w-[300px] lg:w-[350px] 2xl:w-[210px] ">
                <Input
                  type="text"
                  label="ค้นหาชื่อ Member"
                  value={searchQuery}
                  className="flex justify-center "
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                  UserName
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
                  คลาส
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
                  แก้ไข
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
                  ปิดการใช้งาน
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
                const isActive = data.is_active ? "text-green-500" : "text-red-500"

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center justify-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold "
                        >
                          {pageIndex + 1 || ''}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal "
                      >
                        {data?.username || ''}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-bold ${isActive} `} 
                      >
                        {data.is_active ? "ใช้งาน" : "ปิดใช้งาน" }
                      </Typography>
                    </td>         
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal  `} 
                      >
                        {data.is_status == 0  ? "ผู้บริจาค" 
                        : 
                         data.is_status == 1  ? "Admin"
                        : 
                         data.is_status == 2  ? "user" : ''  }
                      </Typography>
                    </td>         
           
                    <td className={classes} >
                      <div className="flex ">
                      <IconButton 
                        variant="text"
                        size="sm"
                        className=" rounded-full"
                        onClick={()=>handleEditClick(data)}
                      >
                          <FiEdit className="text-xl  text-lime-900 font-blod"/>
                      </IconButton>
                      </div>
                    </td>
                    <td className={classes} >
                      <div className="flex">
                      {data.is_active ? 
                      <IconButton 
                        variant="outline"
                        size="sm"
                        color="red"
                        className=" rounded-full"
                        onClick={()=> toggleIsActive(data.id , false)}
                      >
                          <AiOutlineCloseSquare className="text-xl"/>
                      </IconButton>   
                      :
                      <IconButton 
                        variant="outline"
                        size="sm"
                        color="green"
                        className=" rounded-full"
                        onClick={()=> toggleIsActive(data.id , true)}
                      >
                          <AiOutlineCheckSquare className="text-xl"/>
                      </IconButton>
                      }
                      </div>
                    </td>
                    
                  </tr>
                );
              })}
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


           {/* ---------------- Modal Edit ----------------------------------- */}
      <Dialog 
       open={openEditDialog}
       size={dialogSize}
       handler={handleCloseEditDialog}
       className="custom-dialog"
       >
        <DialogHeader className="text-base  text-white text-center justify-end  bg-blue-700 opacity-80">
          แก้ไข: {userEditData.username || ''}
        </DialogHeader>
        <DialogBody divider >
          <div className="flex justify-center flex-col  md:flex-row w-full  gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div>
            <Typography className="">UserName:</Typography>
            </div>
            <div>
            <Input
              type="text"
              label="ชื่อUser"
              value={newUser}
              maxLength="10"
              className="w-full"
              onChange={(e) => setNewUser(e.target.value)}
            />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div>
            <Typography className="">Password:</Typography>
            </div>
            <div>
            <Input
              type="password"
              label="password"
              maxLength="10"
              className="w-full"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            </div>
          </div>
          </div>
  </DialogBody>
  <DialogFooter className=" flex justify-end mt-[10px]  gap-5">
    <Button variant="gradient" color="red" onClick={handleCloseEditDialog} className="mr-1  text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><GiCancel/></span>
      ยกเลิก
    </Button>
    <Button variant="gradient" color="green" onClick={handleSendEdit}   className=" text-base flex align-middle items-center">
    <span className="flex text-xl mr-2"><IoIosSave/></span>
      บันทึก
    </Button>
  </DialogFooter>
      </Dialog>

    </div>
  );
}
export default Member;
