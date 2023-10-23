import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";


import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th'; // Import Thai locale
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { format, parseISO, addYears, subYears } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

// Components
import Excelexport_Sale from "./components/excel/Excelexport_Sale";

registerLocale('th', th); // Register Thai locale
setDefaultLocale('th'); // Set Thai locale as default

import "./App.css"
import { SignIn } from "./pages/auth";

import Display from "./pages/dashboard/display";
// import EditSale_cart from "./pages/dashboard/edit/EditSale_cart";
// import EditSale_Parmoon from "./pages/dashboard/edit/EditSale_Parmoon";


function App() {
  const navigate = useNavigate()
  let Token = localStorage.getItem("token");
  const [Tokens,setTokens] = useState(localStorage.getItem("token"))


  
  const checkToken = async () => {
  //   if (!Token) {
  //     navigate("/auth/sign-in")
     
  // }
  // else {
  //   navigate("/dashboard/home")
    
  // }
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Token}`,
        },
      });
      // console.log(response.data.message);
      if (response.data.message == "Yes") {
        return;
      }
    } catch (error) {
      // console.log(error.response.status);
      localStorage.clear();
      navigate("/auth/sign-in")
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    checkToken();
  }, [Tokens]);

  return (
    <Routes>
      <Route path="/display" element={<Display />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/auth/sign-in" element={< SignIn />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      {/* <Route path="/excel" element={<Excelexport_Sale/>} /> */}

    </Routes>
  );
}

export default App;
