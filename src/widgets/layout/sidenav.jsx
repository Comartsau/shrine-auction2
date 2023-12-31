import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useState,useEffect } from "react";


export function Sidenav({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const userName = localStorage.getItem("username");
  const [lockMenu, setlockMenu] = useState("");

  useEffect(() => {
    // ตรวจสอบค่า lockMenu ทุกๆ 1 วินาที
    setInterval(() => {
      setlockMenu(localStorage.getItem("lockMenu"));
    }, 1000);
  }, []);
 

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-52 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-red-gray-50"
        }`}
      >
        {/* <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link> */}
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="mx-2 justify-center align-middle ">
        <div className="text-center text-lg text-white font-bold  py-5 ">
          {userName || ''}
        </div>
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            <hr/>
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                 <NavLink
                  //  to={`/${layout}${path}`}>
                  to={lockMenu ? `/Dashboard/auctions` : `/${layout}${path}`}
                  >
                 {({ isActive }) => (
                   <Button
                     variant={isActive ? "gradient" : "text"}
                     color={
                       isActive
                         ? sidenavColor
                         : sidenavType === "dark"
                         ? "white"
                         : "blue-gray"
                     }
                     className="flex items-center gap-4   capitalize align-middle p-[5px]"
                     fullWidth
                     disabled={lockMenu}
                   >
                     {icon}
                     <Typography
                       color="inherit"
                       className="flex items-center font-medium capitalize align-middle   "
                     >
                       {name}
                     </Typography>
                   </Button>
                 )}
               </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
   
  );
}

Sidenav.defaultProps = {
  brandImg: "",
  brandName: "",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
