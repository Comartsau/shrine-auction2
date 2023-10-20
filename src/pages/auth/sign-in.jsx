import { Link,useNavigate   } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import bglogin2 from '../../images/bg-login2.jpg'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export function SignIn() {
  const navigate = useNavigate()
  const [email,setEmail] =  useState("")
  const [password,setPassword] = useState("")


  const handleSignIn = async () => {
    try {
      const data = {
        username:email,
        password:password
      }
      // const response = await axios.post("http://26.125.18.207:8000/login",data);
      const response = await axios.post(`${import.meta.env.VITE_APP_API}/login`,data);

      // console.log(response)
      //------ Display -----//
      if (response.data.check == 0) {  
        localStorage.setItem("token", response.data.accessToken)
        // localStorage.setItem("username", response.data.username)
        // localStorage.setItem("check", response.data.check)
        // localStorage.setItem("id", response.data.id)
        // localStorage.setItem("btn_login", response.data.btn_login)
        // localStorage.setItem("status", response.data.status)
        navigate("/display");
        window.location.reload();
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 1500
          // confirmButtonText: 'ตกลง',
        });
        // -----  Admin  ---- //
      } else if(response.data.check == 1)  {
        localStorage.setItem("token", response.data.accessToken)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("check", response.data.check)
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("btn_login", response.data.btn_login)
        localStorage.setItem("status", response.data.status)
        navigate("/dashboard/home");
        window.location.reload();
        // console.log("22222222222222")
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ ',
          text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว Admin',
          showConfirmButton: false,
          timer: 1500
          // confirmButtonText: 'ตกลง',
        });
        // ---------  User --------------- //
      }else if(response.data.check == 2)  {
        localStorage.setItem("token", response.data.accessToken)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("check", response.data.check)
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("btn_login", response.data.btn_login)
        localStorage.setItem("status", response.data.status)
        navigate("/dashboard/home");
        window.location.reload();
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ ',
          text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว User',
          showConfirmButton: false,
          timer: 1500
          // confirmButtonText: 'ตกลง',
        });
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      // console.log("33333333333333333333333")
      Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบไม่สำเร็จ ',
        text: 'กรุณาเข้าระบบอีกครั้ง',
        confirmButtonText: 'ตกลง',
      });
      // Handle error case here, if needed
    }
  };
  return (
    <>
      <img
        // src="../../../public/img/bg-login2.jpg"
        // src="../../images/bg-login2.jpg"
        src={bglogin2}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full  bg-black/50" />
      <div className="container mx-auto p-4">
      <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-16 place-items-center bg-purple-500"
          >
            <Typography  color="white" className=" text-2xl font-bold">
              เข้าสู่ระบบ
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 py-10">
            <Input 
            type="text" 
            label="Username" 
            size="lg"
            onChange={(e)=> setEmail(e.target.value)}
             />
            <Input 
            type="password" 
            label="Password" 
            size="lg"
            onChange={(e)=> setPassword(e.target.value)}
             />
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button  
            fullWidth 
            className=" bg-purple-600 text-base"
            onClick={handleSignIn}
            >
              เข้าสู่ระบบ
            </Button>
            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
