import Header from "./Header.jsx";
import "./Login.css";
import { useEffect, useRef, useState} from "react";
import axios from "axios";
import { Link,useNavigate,useLocation } from "react-router-dom";


function ForgotPassword(){
    const userRef=useRef("");
    const passwordRef=useRef("");

    const navigate=useNavigate();
    const location=useLocation();
    const from=location.state?.from?.pathname || "/login";

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [otp,setotp]=useState("");
    const [shouldNavigate,setshouldnavigate]=useState(false);
    const [otpsent,setotpsent]=useState(false);
    const [otpverified,setotpverified]=useState(false);

    const [err,seterr]=useState("");
    const [success,setSucess]=useState(false);

    useEffect(()=>{
        seterr("");
    },[email,password])

    useEffect(()=>{
        userRef.current.focus();
    },[])

    function handleemail(e){
        setemail((prevmail)=>prevmail=e.target.value);
    }

    function handlepassword(e){
        setpassword((pass)=>pass=e.target.value);
    }

    function handleotp(e){
        setotp((o)=>o=e.target.value);
    }

    const data={
        email:email,
        newPassword:password
    }

    useEffect(() => {
        if (shouldNavigate) {
          const intervalId = setInterval(() => {
            navigate(from, { replace: true });
          }, 2000);
    
          return () => clearInterval(intervalId);
        }
      }, [shouldNavigate]);

      async function sendotp(){
           try{
              const response=await axios.post("http://localhost:5000/api/v1/otp/send-otp",{email})
              console.log("otpsent");
              setotpsent(true);
           }
           catch(err){
            console.log(err);
           }
      }

      useEffect(() => {
        const verifyOtp = async () => {
          try {
            const response = await axios.post("http://localhost:5000/api/v1/otp/verify-otp", {email, otp });
            setotpverified(true);
          } catch (error) {
            setotpverified(false);
          }
        };
    
        if (otpsent) {
          verifyOtp();
        }
      }, [otp, otpsent]);

    async function handlesubmit() {
        try {
            if(otpverified){
            const response= await axios.patch("http://localhost:5000/api/v1/users/forgot",data)    
            setSucess(true);
            setemail("");
            setpassword("");
            setshouldnavigate(true);
            }
            else{
                seterr("invalid otp");
            }
  
         } catch (error) {
             console.log(error);
             if(error.response.status==401){
                 seterr("invalid email")
             }
         }

    }

    return(
        <div className="total">
            <Header/>
           <div className="content">
            <div className="logo-image">
                <img src="logo-image.jpeg" alt="logo-image" />
            </div>
            <div className="forgot">
                <h2>Create new password</h2>
                <h3>E-mail</h3>
                <input id="e-mail" type="text" ref={userRef} placeholder="Enter your email-address" onChange={(e)=>handleemail(e)} required value={email}/>
                <h3>Otp</h3>
                <input id="otp" type="text" placeholder="Enter otp" onChange={(e)=>handleotp(e)}  value={otp}/>
                <button className="otp" onClick={sendotp}>Send otp</button>
                {otpsent&&(<p style={{color:"green", fontSize:"20px"}}>otp sent successfully</p>)}
                <h3>password</h3>
                <input type="password" name="password" id="password" ref={passwordRef} placeholder="Enter your password" value={password}  onChange={(e)=>handlepassword(e)}/>
                {success&&(<p style={{color:"green", fontSize:"20px"}}>password updated successfully</p>)}
                {!success&&(<p style={{color:"red", fontSize:"20px"}}>{err}</p>)}

                <button className="update" onClick={handlesubmit}>Update</button>
            </div>

        </div>
        </div>
    )
}

export default ForgotPassword;