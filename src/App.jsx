import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th"; // Import Thai locale
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { format, parseISO, addYears, subYears } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

// Components
// import Excelexport_Sale from "./components/excel/Excelexport_Sale";

// registerLocale('th', th); // Register Thai locale
// setDefaultLocale('th'); // Set Thai locale as default

import "./App.css";
import { SignIn } from "./pages/auth";

import Display from "./pages/dashboard/display";
// import EditSale_cart from "./pages/dashboard/edit/EditSale_cart";
// import EditSale_Parmoon from "./pages/dashboard/edit/EditSale_Parmoon";

function App() {
  const navigate = useNavigate();
  let Token = localStorage.getItem("token");
  let Type = localStorage.getItem('Type')
  const [Tokens, setTokens] = useState(localStorage.getItem("token"));
  const [statusLogin, setStatusLogin] = useState("");

  const checkToken = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      setStatusLogin(response?.data?.message);
    } catch (error) {
      // console.log(66666);
      setStatusLogin("No");
      localStorage.clear();
      setTimeout(() => {
        return <Link to="/auth/sign-in"></Link>;
      }, 1500);
    }
  };

  useEffect(() => {
    checkToken();
  }, [Token]);

  return (
    <>
      {Token || statusLogin === "Yes" ? (
        <Routes>
          <Route path="/" element={Type =="display" ? <SignIn/>  :<Navigate to="/dashboard/home" />} />,
          <Route path="/display" element={ Type =="display" ? <Display /> : <Navigate to="/dashboard/home"/> } /> ,
          <Route path="/dashboard/*" element={ Type == "display" ? <SignIn/> : <Dashboard/>} /> ,
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
  
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/auth/sign-in" />} />,
          <Route path="/auth/sign-in" element={<SignIn />} /> ,
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
