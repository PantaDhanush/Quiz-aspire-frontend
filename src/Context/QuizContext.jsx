import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [questions, setQuestions] = useState([]);
    const [timeLimit, setTimeLimit] = useState(0);  // New state for time limit

    return (
        <QuizContext.Provider value={{ questions, setQuestions, timeLimit, setTimeLimit }}>
            {children}
        </QuizContext.Provider>
    );
}
