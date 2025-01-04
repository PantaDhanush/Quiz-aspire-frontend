import { Link } from "react-router-dom";
import  "./Home.css";

function SignInHeader(){
    return (
        <>
          <nav>
            <div className="logo">
              <img src="logo.png" alt="logo" />
            </div>
    
            <div className="profile">
             <Link to="/profile">
             <img src="profile.png" alt="profile" />
             </Link>
            </div>
          </nav>
        </>

    )
}

export default SignInHeader;