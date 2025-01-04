import React, { useContext } from "react";
import { ResultContext } from "../../Context/ResultContext.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignInHeader from "./SignInHeader.jsx";

function Result() {
    const { result } = useContext(ResultContext);
    const total=result?.score+result?.wrong+result?.unanswered;
    const accuracy=(result?.score/total)*100;

    return (
        <div className="total">
            <SignInHeader/>
            <h1 className="result-h1">Result</h1>
            <div className="result-page">
            <div className="result-summary">
                <p>Total Number of questions : {total}</p>
                <p>Number of questions correct : {result?.score}</p>
                <p>Accuracy : {accuracy}%</p>
            </div>
            <div className="circular-progress">
                <div className="circle">
                    <div className="circle-inner">
                        <span className="accuracy-text">{accuracy}%</span>
                        <span className="accuracy-label">Accuracy</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="actions">
                <Link to="/home">
                    <button className="home-button">Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Result;
