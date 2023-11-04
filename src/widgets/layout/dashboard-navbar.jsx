import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Alert,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,

} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import axios from "axios";
import Swal from "sweetalert2";

import { Badge } from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useState } from "react";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const userName = localStorage.getItem("username");
  const check = localStorage.getItem('check')


  const handleSignOut = async () => {
    try {
      const shouldLogout = await Swal.fire({
        title: "คุณต้องการออกจากระบบ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่, ออกจากระบบ",
        cancelButtonText: "ยกเลิก",
      });

      if (shouldLogout.isConfirmed) {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/logout`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        // console.log(response);
        localStorage.clear();
        navigate("/auth/sign-in");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการ logout" + error);
    }
  };

  const checkRoomError = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/clear1`
      );

      // console.log(response.data);
      localStorage.removeItem('id_auctionstarted')

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'เคลียห้องประมูลสำเร็จ',
        showConfirmButton: false,
        timer: 1500
      })
 

    } catch (error) {
      console.log(error);
    }
  };
  



  return (
    <div>
  
      <Navbar
        color={fixedNavbar ? "white" : "transparent"}
        className={`rounded-xl transition-all ${
          fixedNavbar
            ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
            : "px-0 py-1"
        }`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex flex-col-reverse justify-end gap-10  md:flex-row md:items-center">
          <div className="flex items-center gap-5 px-5">
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={() => setOpenSidenav(dispatch, !openSidenav)}
            >
              <Bars3Icon
                strokeWidth={3}
                className="h-6 w-6 text-blue-gray-500"
              />
            </IconButton>
            <Typography variant="h6" color="blue-gray">
              {userName}
            </Typography>

            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 text-sm xl:flex"
              onClick={handleSignOut}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              ออกจากระบบ
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={handleSignOut}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>

            <IconButton disabled={check === "2"}   size="sm" color="red" onClick={checkRoomError}>
              <HomeIcon className="h-4 w-4" />
            </IconButton>

            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
