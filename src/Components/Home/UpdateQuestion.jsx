import SignInHeader from "./SignInHeader.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function UpdateQuestion() {
    const location = useLocation();
    const questionData = location.state?.questionData;

    const [options, setOptions] = useState(["", "", "", ""]);
    const [question, setQuestion] = useState("");
    const [correct, setCorrect] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [verify,setverify]=useState(true);
    const [topic,settopic]=useState(""); 
    const navigate=useNavigate();
    
        useEffect(()=>{
            setQuestion(questionData.question);
            setOptions(questionData.options);
            setCorrect(questionData.correctOption);
            setVisibility(questionData.specificity);
            settopic(questionData.topic);
            setverify(questionData.canverify);
        },[])

        const handleOptionChange = (index, value) => {
            setOptions((prevOptions) => {
              const newOptions = [...prevOptions];
              newOptions[index] = value;
              return newOptions;
            });
          };
        
          const handleQuestionChange = (e) => {
            let questionText = e.target.value.toLowerCase();
            setQuestion(questionText);
          };
        
          const handleCorrectAnswerChange = (index) => {
            setCorrect(options[index]);
          };
        
          const handleVisibilityChange = (choice) => {
            setVisibility(choice);
            setverify(choice); 
          };
        
          const handletopic = (e) => {
            settopic(e.target.value);
          };
        
          function handleverify(){
            if(visibility===true){
             setverify(true);
            }
            else{
             setverify((prevVerify) => !prevVerify);
            }
         }

         async function onEdit() {
            try {
              const updatedData = {
                question,
                options,
                correctOption: correct,
                specificity: visibility,
                canverify:verify,
                topic
              };
              
              // Send the updated data to the backend
              const response = await axios.patch(`http://localhost:5000/api/v1/question/edit?id=${questionData._id}`, updatedData);
              console.log(response);
              navigate("/home", { replace: true });
            } catch (error) {
              console.log(error);
            }
          }
        

  return (
    <div className="total">
        <SignInHeader/>
       <div className="access">
        <h2>Update Question</h2>
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
              checked={option === correct}
            />
            <input
              type="text"
              onChange={(e) => handleOptionChange(index, e.target.value)}
              value={option}
            />
          </div>
        ))}      
      </div>
      <button type="submit" style={{cursor:"pointer"}} onClick={onEdit}>
        <p>Save</p>
      <i className="fa-solid fa-check"></i>
      </button>      
      </div>
    </div>
  );
}

export default UpdateQuestion;
