import {
  HomeIcon,

} from "@heroicons/react/24/solid";

import { LuClipboardList } from "react-icons/lu";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { MdPointOfSale } from "react-icons/md";
import { FaMoneyCheckAlt,FaRegListAlt,FaUserTie,FaRegNewspaper } from "react-icons/fa";
import { BsLayoutTextWindow , BsPersonCircle, BsCart3,BsGraphUpArrow } from "react-icons/bs";
import { Home, AuctionTopic , Auctioneer, Products, Auctions , Sale, Account,AuctionsList, SaleList, SaleSummary ,AuctionsSummary, Member, DailySummary } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";


const icon = {
  className: "w-5 h-5 text-inherit",
};

let check = localStorage.getItem("check" || "");
// let userName = localStorage.getItem("username" || "");

// const isAdmin = userName === "admin";
const isAdmin = check == "1";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <BsLayoutTextWindow {...icon} />,
        name: "หัวข้อประมูล",
        path: "/auctionTopic",
        element: <AuctionTopic />,
      },
      {
        icon: <BsPersonCircle {...icon} />,
        name: "ข้อมูลผู้บริจาค",
        path: "/auctioneer",
        element: <Auctioneer />,
      },
      {
        icon: <BsCart3 {...icon} />,
        name: "ข้อมูลสินค้า",
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: isAdmin? [
      {
        icon: <PiBellSimpleRingingBold {...icon} />,
        name: "เริ่มการประมูล",
        path: "/auctions",
        element: <Auctions />,
      },
      {
        icon: <MdPointOfSale {...icon} />,
        name: "ขายสินค้า",
        path: "/sale",
        element: <Sale />,
      },
      {
        icon: <FaMoneyCheckAlt {...icon} />,
        name: "บัญชีลูกหนี้",
        path: "/account",
        element: <Account />,
      },
      {
        icon: <FaRegListAlt {...icon} />,
        name: "รายการประมูล",
        path: "/auctionsList",
        element: <AuctionsList />,
      },

      {
        icon: <LuClipboardList {...icon} />,
        name: "รายการขายสินค้า",
        path: "/saleList",
        element: <SaleList />,
      },
    
    ]:[
      {
        icon: <MdPointOfSale {...icon} />,
        name: "ขายสินค้า",
        path: "/sale",
        element: <Sale />,
      },
      {
        icon: <FaMoneyCheckAlt {...icon} />,
        name: "บัญชีลูกหนี้",
        path: "/account",
        element: <Account />,
      },
      {
        icon: <FaRegListAlt {...icon} />,
        name: "รายการประมูล",
        path: "/auctionsList",
        element: <AuctionsList />,
      },

      {
        icon: <LuClipboardList {...icon} />,
        name: "รายการขายสินค้า",
        path: "/saleList",
        element: <SaleList />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        icon: <FaRegNewspaper {...icon} />,
        name: "สรุปยอดประจำวัน",
        path: "/DailySummary",
        element: <DailySummary />,
      }, 
      {
        icon: <BsGraphUpArrow {...icon} />,
        name: "สรุปยอดขายประมูล",
        path: "/auctionsSummary",
        element: <AuctionsSummary />,
      }, 
      {
        icon: <VscGraph {...icon} />,
        name: "สรุปยอดขายสินค้า",
        path: "/saleSummary",
        element: <SaleSummary />,
      }
    ],
  },
  {
    layout: "dashboard",
    pages: isAdmin? [
      {
        icon: <FaUserTie {...icon} />,
        name: "ข้อมูล Member",
        path: "/member",
        element: <Member />,
      },
    ]:[]
  },
];

export default routes;
