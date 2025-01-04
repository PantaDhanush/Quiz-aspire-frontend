import SignInHeader from "./SignInHeader";
import useAuth from "../../Hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateQuestion(){
  const { auth } = useAuth();
  const [options, setOptions] = useState(["", "", "", ""]);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [verify,setverify]=useState(true);
  const [topic,settopic]=useState(""); 
  const navigate=useNavigate();

  const data={
    question:question,
    options:options,
    correctOption:correct,
    specificity:visibility,
    userId:auth.userId,
    canverify:verify,
    topic:topic
  }

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleQuestionChange = (e) => {
    let s= e.target.value
    s=s.toLowerCase()
    setQuestion(s);
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrect(options[index]);
  };

  const handleVisibilityChange = (choice) => {
    setVisibility(choice);
  };

 
  function handletopic(e){
    settopic(e.target.value);
  }

  useEffect(()=>{
     handleverify()
  },[visibility])


  function handleverify(){
     if(visibility===true){
      setverify(true);
     }
     else{
      setverify((prevVerify) => !prevVerify);
     }
  }

  async function oncreate() {
       try {
        const response=await axios.post("http://localhost:5000/api/v1/question/create",data);
        console.log(response);
        navigate("/home",{replace:true});
       } catch (error) {
        console.log(error)
       }     
  }


  return (
    <div className="total">
      <SignInHeader />
      <div className="access">
        <h2>Create a Question</h2>
        <div className="buttons">
          <button
            onClick={() => handleVisibilityChange(true)}
            className={visibility === true ? "selected" : ""}
          >
            Public
          </button>
          <button
            onClick={() => handleVisibilityChange(false)}
            className={visibility === false ? "selected" : ""}
          >
            Private
          </button>
        </div>
      </div>
      <div className="verfication">
      <input
        type="text"
        className="input-question"
        placeholder="Enter Your Question"
        onChange={handleQuestionChange}
        value={question}
      />
      <select name="topic-frame" id="topic-frame" value={topic} onChange={handletopic}>
        <option value="">select a topic</option>
        <option value="dsa">dsa</option>
        <option value="science">science</option>
        <option value="maths">maths</option>
        <option value="social">social</option>
      </select>
        <button onClick={handleverify} className={verify?"selected":""}>verfiy</button>
      </div>
      <h2 style={{ paddingLeft: "30px" }}>Create Options</h2>
      <div className="create-question">
      <div className="answers">
        {options.map((option, index) => (
          <div className="options" key={index}>
            <input
              type="radio"
              name="options"
              id={`option-${index + 1}`}
              onChange={() => handleCorrectAnswerChange(index)}
            />
            <input
              type="text"
              onChange={(e) => handleOptionChange(index, e.target.value)}
              value={option}
            />
          </div>
        ))}      
      </div>
      <button type="submit" onClick={oncreate}>
        <p>Create</p>
      <i className="fa-solid fa-plus"></i>
      </button>
      </div>
      
    </div>
  );
}

export default CreateQuestion;