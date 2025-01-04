import { useState, useEffect, useContext } from "react";
import { QuizContext } from "../../Context/QuizContext.jsx";
import SignInHeader from "./SignInHeader.jsx";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import { ResultContext } from "../../Context/ResultContext.jsx";

function Start() {
    const { questions, timeLimit } = useContext(QuizContext);  
    const [start, setStart] = useState(false);  
    const [counter, setCounter] = useState(15); 
    const [index, setIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); 
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(timeLimit); 
    const [wrong, setWrong] = useState(0);
    const [unanswered, setUnanswered] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    
    const navigate = useNavigate();
    const location=useLocation();
    const from="/result";
    const { setresult } = useContext(ResultContext);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[index].correctOption) {
            setScore((prevScore) => prevScore + 1);
        } else if (selectedOption == null) {
            setUnanswered((prev) => prev + 1);
        } else {
            setWrong((prev) => prev + 1);
        }
        setShowAnswer(true);

        setTimeout(() => {
            setShowAnswer(false);
            setSelectedOption(null);

            if (index <= questions.length - 1) {
                setIndex((prevIndex) => prevIndex + 1); 
                setTimer(timeLimit);
            } 
        }, 2000);
    };

    useEffect(() => {
        if (counter > 0) {
            const countdown = setInterval(() => {
                setCounter((prev) => prev - 1);  
            }, 1000);
            return () => clearInterval(countdown);  
        } else {
            setStart(true); 
        }
    }, [counter]);

    useEffect(() => {
        if (start && timer > 0) {
            const questionTimer = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(questionTimer);
        } else if (start && timer === 0) {
            handleNextQuestion();
        }
    }, [timer, start]);

    function handlesubmit(){
        setresult({score,unanswered,wrong});
        navigate(from,{replace:true});
    }

    const counterColor = counter > 7 ? "green" :  "red";

    if (start) {
        if(index<questions.length){
            return (
                <div className="total">
                    <SignInHeader />
                    <h2 className="timer" style={{ textAlign: "center" }}>
                        Time Remaining: 00:{timer < 10 ? `0${timer}` : timer}
                    </h2>
                    <div className="question">
                        <h1>Question-{index + 1}</h1>
                        <p className="given-question">{questions[index].question}?</p>
                        <ul>
                            {questions[index].options.map((option, i) => (
                                <li
                                    key={i}
                                    style={{
                                        color: showAnswer && option === questions[index].correctOption ? "green" : 
                                                showAnswer && selectedOption === option ? "red" : "black"}}
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={option}
                                            checked={selectedOption === option}
                                            onChange={() => handleOptionChange(option)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className="next">
                                <button onClick={handleNextQuestion} >
                                    Next
                                </button>
                        </div>
                    </div>
                </div>
            );
        }

        return(
            <div className="total">
                <SignInHeader/>
                <div className="result-submit">
                <h1>All answers recorded successfully</h1>
                <h2>click on submit to calculate the results</h2>
                <button onClick={handlesubmit}>Submit</button>
                </div>
            </div>
        )
    }

    return (
        <div className="total">
            <h1 style={{ paddingTop: "100px", textAlign: "center" }}>Quiz starts in...</h1>
            <div className="counter">
                <h1 className={counterColor}>{counter}</h1>
            </div>
        </div>
    );
}

export default Start;
