import SignInHeader from "./SignInHeader";
import { useEffect, useState} from "react";
import useAuth from "../../Hooks/useAuth.jsx";
import axios from "axios";
import { QuizContext } from "../../Context/QuizContext.jsx";
import { useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";


function PreStart() {
    const navigate=useNavigate();
    const location=useLocation();
    const from=location.state?.from?.pathname || "/start-quiz";


    const [visibility, setVisibility] = useState(true);
    const [start, setStart] = useState(false);
    const [num, setNum] = useState(0);
    const [topic,settopic]=useState(""); 
    const { auth } = useAuth();

    const { setQuestions, setTimeLimit } = useContext(QuizContext);


    const data = {
        num: num,
        userId: auth.userId,
        specific: visibility,
        topic:topic
    };


    function handletopic(e){
        settopic(e.target.value);
      }

    
    useEffect(() => {
        async function getAll() {
            try {
                console.log(data)
                const response = await axios.post(`http://localhost:5000/api/v1/question/getRandomQuestions`, data);
                setQuestions(response.data.data);
                console.log(response.data.data);
                console.log("success");
                navigate(from,{replace:true});
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        if (start) {
            getAll();
        }
    }, [start]);

    function handleStart() {
        setStart((prevStart) => !prevStart);
    }

    function handleNumChange(e) {
        const value = parseInt(e.target.value);
        setNum(value);
    }

    function handleTime(e){
        const value=parseInt(e.target.value);
        setTimeLimit(value);
    }

    const handleVisibilityChange = (choice) => {
        setVisibility(choice);
    };

    return (
        <div className="total">
            <SignInHeader />
             <div className="pre-start-rules">
             <h2>Which type of questions are you interested in?</h2>
            <div className="quiz-buttons">
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
            <h2>Number of questions you need</h2>
            <input
                type="number"
                placeholder="Enter number of questions"
                style={{ width: "200px", height: "30px", borderRadius: "10px", margin: "10px" }}
                onChange={handleNumChange}
                min="0"
            />
            <h2>Time limit for each question</h2>
            <input
                type="number"
                placeholder="Enter time limit for each question"
                style={{ width: "200px", height: "30px", borderRadius: "10px", margin: "10px" }}
                onChange={handleTime}
                min="1"
            />
            <select name="topic-frame" id="topic-frame" value={topic} onChange={handletopic} style={{height:"35px"}}>
                <option value="">select a topic</option>
                <option value="dsa">dsa</option>
                <option value="science">science</option>
                <option value="maths">maths</option>
                <option value="social">social</option>
            </select>
            <h2>Rules</h2>
            <p>Eligibility: Participants must register with valid information and meet the minimum age requirement.</p>
            <p>Account Use: Only one account per participant is allowed.</p>
            <p>Privacy: User data is confidential and used solely for the quiz experience.</p>
            <p>Participation: Accept quiz guidelines before starting; sharing answers or cheating is prohibited.</p>
            <p>Time Limits: Each quiz has a specified time limit; exceeding it will trigger automatic submission.</p>
            <p>Scoring: Points are awarded based on accuracy.</p>
            <p>Code of Conduct: Respectful behavior is mandatory; offensive language leads to disqualification.</p>
            <p>Fair Play: Using scripts, bots, or software for an advantage is prohibited.</p>
            <button className="start-quiz" onClick={handleStart}>Start Quiz</button>
             </div>
        </div>
    );
}

export default PreStart;
