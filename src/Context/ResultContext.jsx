import React, { createContext, useState } from "react";

export const ResultContext = createContext();

export function ResultProvider({ children }) {
    const [result,setresult] = useState({});

    return (
        <ResultContext.Provider value={{ result,setresult }}>
            {children}
        </ResultContext.Provider>
    );
}
