import Login from "./Components/Login/Login.jsx"

import Home from "./Components/Home/Home.jsx"

import RequireAuth from "./Components/RequireAuth.jsx"
import { Routes,Route } from "react-router-dom"
import Layout from "./Components/Layout.jsx"
import Register from "./Components/Login/Register.jsx"
import ForgotPassword from "./Components/Login/ForgotPassword.jsx"
import CreateQuestion from "./Components/Home/CreateQuestion.jsx"
import PreStart from "./Components/Home/PreStart.jsx"
import { QuizProvider } from "./Context/QuizContext.jsx"
import Start from "./Components/Home/Start.jsx"
import Result from "./Components/Home/Result.jsx"
import { ResultProvider } from './Context/ResultContext.jsx'
import Profile from "./Components/Home/Profile.jsx"
import UpdateQuestion from "./Components/Home/UpdateQuestion.jsx"


function App() {
  

  return (
     <QuizProvider>
      <ResultProvider>
      <Routes>
      <Route path="/" element={<Layout/>}>  
       {/* public routes */}
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/forgot" element={<ForgotPassword/>}/>
       {/* private routes */}
       <Route element={<RequireAuth/>}>
       <Route path="/home" element={<Home/>}/>
       <Route path="/pre-start-quiz" element={<PreStart/>}/>
       <Route path="/start-quiz" element={<Start/>}/>
       <Route path="/result" element={<Result/>}/>
       <Route path="/profile" element={<Profile/>}/> 
       <Route path="/create-question" element={<CreateQuestion/>}/>
       <Route path="/edit-question" element={<UpdateQuestion/>} />
       </Route>

      </Route>
     </Routes>
      </ResultProvider>
     </QuizProvider>
  )
}

export default App
