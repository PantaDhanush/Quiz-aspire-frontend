import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Profile() {
  const [details, setDetails] = useState({ fullName: "", gender: "" });
  const { auth, setauth } = useAuth();
  const [err, setErr] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newName, setNewName] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const data = {
    email: auth.email,
    password: auth.password,
  };

  const handleGenderChange = (e) => setGender(e.target.value);

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await axios.post("http://localhost:5000/api/v1/users/getAll", data);
        const userData=response.data.data;
        setDetails(response.data.data);
        setNewName(userData.fullName);
        setGender(userData.gender);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, []);

  const sendingData = {
    newPassword: newPass,
    email: auth.email,
    fullName: newName,
    gender: gender,
  };

  const handleFullName = (e) => setNewName(e.target.value);
  const handleCurrentPassword = (e) => {
    setErr("");
    setCurrentPass(e.target.value);
  };
  const handleNewPassword = (e) => setNewPass(e.target.value);


  async function saveDetails() {
    try {
      if (currentPass !== data.password) {
        setErr("Incorrect current password");
      } else {
        const response = await axios.patch("http://localhost:5000/api/v1/users/updatedetails", sendingData);
        console.log(response);
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/users/logout", {
        id: auth.userId,
      });
      setauth({});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="total">
      <div className="logo">
        <img src="logo.png" alt="logo" />
      </div>
      <div className="details">
        <div className="update-details">
          <h1>Update your Profile</h1>
          <h4>Enter your full name</h4>
          <input
            type="text"
            onChange={handleFullName}
            placeholder="Enter full name"
            value={newName}
          />
          <h4>Email</h4>
          <input type="text" disabled placeholder="Enter your email" value={data.email} />
          <br />
          <h4 style={{ display: "inline", marginRight: "30px" }}>Gender</h4>
          <select name="gender" id="gender" value={gender} onChange={handleGenderChange}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="others">Others</option>
          </select>
          <h4>Password update</h4>
          <input type="password" onChange={handleCurrentPassword} placeholder="Enter current password" />
          <br />
          <input type="password" onChange={handleNewPassword} placeholder="Enter new password" />
          {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
        <div className="logout">
          <img src="profile.png" alt="profile" />
          <button className="save" onClick={saveDetails}>Save</button>
          <button className="out" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
