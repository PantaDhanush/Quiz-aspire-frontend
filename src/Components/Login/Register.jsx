import Header from "./Header.jsx";
import "./Login.css";
import { useEffect, useRef, useState} from "react";
import axios from "axios";


function Register(){
    const userRef=useRef("");
    const passwordRef=useRef("");
    const fullnameRef=useRef("");
    const usernameRef=useRef("");
    const genderRef=useRef("");

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [fullname,setfullname]=useState("");
    const [username,setusername]=useState("");
    const [gender,setgender]=useState("");

    const [err,seterr]=useState("");
    const [success,setSucess]=useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        seterr("");
    },[email,password])

    function handleemail(e){
        setemail((prevmail)=>prevmail=e.target.value);
    }

    function handlepassword(e){
        setpassword((pass)=>pass=e.target.value);
    }
    function handlefullname(e){
        setfullname((full)=>full=e.target.value);
    }

    function handleusername(e){
        setusername((user)=>user=e.target.value)
    }

    function handlegender(e){
        setgender((gen)=>gen=e.target.value)
    }

    const data={
        email:email,
        password:password,
        gender:gender,
        username:username,
        fullName:fullname
    }

    async function handlesubmit(e) {
        e.preventDefault();
        try {
            const response= await axios.post("http://localhost:5000/api/v1/users/register",data)    
            setSucess(true);
            setemail("");
            setpassword("");
            setfullname("");
            setgender("");
            setusername("");
            console.log("success");
  
         } catch (error) {
             console.log(error);
            //  if(error.response.status==401){
            //      seterr("invalid credentials")
            //  }
         }

    }

    return(
        <div className="total">
            <Header/>
            <div className="content">
            <div className="logo-image">
                <img src="logo-image.jpeg" alt="logo-image" />
            </div>
            <form onSubmit={handlesubmit}>
            <div className="registration">
                <h1 style={{fontSize:"25px"}}>Create a new Account</h1>
                <h4>Full Name</h4>
                <input id="Full Name" type="text" ref={fullnameRef} placeholder="Enter your Full Name" onChange={(e)=>handlefullname(e)} required value={fullname}/>
                <h4>User Name</h4>
                <input id="User Name" type="text" ref={usernameRef} placeholder="Enter your User Name" onChange={(e)=>handleusername(e)} required value={username}/>
                <h4>E-mail</h4>
                <input id="e-mail" type="text" ref={userRef} placeholder="Enter your email-address" onChange={(e)=>handleemail(e)} required value={email}/>
                <h4>Gender</h4>
                <input id="Gender" type="text" ref={genderRef} placeholder="Enter your Gender" onChange={(e)=>handlegender(e)} required value={gender}/>
                <h4>password</h4>
                <input type="password" name="password" id="password" ref={passwordRef} placeholder="Enter your password" value={password} required onChange={(e)=>handlepassword(e)}/>
                <button className="sign-in">Register</button>
            </div>
            </form>

        </div>
        </div>
    )
}

export default Register;