import { useEffect, useRef, useState} from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth.jsx";
import { Link,useNavigate} from "react-router-dom";
function Main(){
    const {auth,setauth}=useAuth();
    const navigate=useNavigate();
    const from= "/home";

    const userRef=useRef("");
    const passwordRef=useRef("")

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
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
    const data={
        email:email,
        password:password
    }

    async function handlesubmit(e){
        e.preventDefault();
        try {
           const response= await axios.post("http://localhost:5000/api/v1/users/login",data)
           const userId=response.data.message.user._id;    
           setSucess(true);
           setauth({email,password,userId});
           setemail("");
           setpassword("");
           navigate(from,{replace:true});
 
        } catch (error) {
            console.log(error);
            if(error.response.status==401){
                seterr("invalid credentials")
            }
        }
    }
    
    return(
        <div className="content">
            <div className="logo-image">
                <img src="logo-image.jpeg" alt="logo-image" />
            </div>
            <form onSubmit={handlesubmit}>
            <div className="authentication">
                <h1>Welcome back!</h1>
                <h3>E-mail</h3>
                <input id="e-mail" type="text" ref={userRef} placeholder="Enter your email-address" onChange={(e)=>handleemail(e)} required value={email}/>
                <h3>password</h3>
                <input type="password" name="password" id="password" ref={passwordRef} placeholder="Enter your password" value={password} required onChange={(e)=>handlepassword(e)}/>
                {!success&&(<p style={{color:"red", fontSize:"20px"}}>{err}</p>)}
                <button className="sign-in">sign in</button>
                <Link to="/forgot"><p style={{fontSize:"15px",paddingTop:"5px",color:"black",paddingLeft:"2px"}}>Forgot password?</p></Link>
            </div>
            </form>

        </div>
    )
}


export default Main;