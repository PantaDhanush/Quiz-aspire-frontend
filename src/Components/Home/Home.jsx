import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth.jsx";
import SignInHeader from "./SignInHeader.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
    const { auth } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;

    // const navigate = useNavigate();

    useEffect(() => {
        async function getAll() {
            const response = await axios.get(`http://localhost:5000/api/v1/question/getAllQuestions?userId=${auth.userId}`);
            setQuestions(response.data.question);
        }
        getAll();
    }, []);

    async function handleDelete(id) {
        try {
            await axios.post(`http://localhost:5000/api/v1/question/deletequestion`, { qid: id });
            setQuestions(prevQuestions => prevQuestions.filter(q => q._id !== id));
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    }

    // const handleEdit = (id) => {
    //     navigate(`/edit-question/${id}`, { replace: true });
    // };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    // const filteredQuestions = questions.filter(q => q.question.toLowerCase().includes(search.toLowerCase()));
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const currentQuestions = questions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className="total">
            <SignInHeader />
            <h1 style={{ paddingLeft: "30px" }}>Welcome {auth.email}</h1>
            <h2 style={{ paddingLeft: "30px" }}>Upgrade your knowledge</h2>
            <div className="quiz">
                <Link to="/create-question" style={{ textDecoration: "none", color: "black" }}>
                    <div className="create">
                        Create a new Question
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
                <Link to="/pre-start-quiz" style={{ textDecoration: "none", color: "black" }}>
                    <div className="start">
                        Start the quiz
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
            </div>

            <div className="created-questions">
                <h2>Created Questions</h2>
                <br />
                <input
                    type="text"
                    placeholder="Search for a Question"
                    style={{ width: "400px", height: "40px", padding: "20px", marginLeft: "50px" }}
                    value={search}
                    onChange={handleSearch}
                />
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "start", paddingLeft: "40px" }}>Question</th>
                            <th>Acceptance</th>
                            <th>Verification status</th>
                            <th>Topic</th>
                            <th>Date and Time</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentQuestions.filter(q => q.question.toLowerCase().includes(search.toLowerCase())).map((q, index) => (
                            <tr key={index} className="question-row">
                                <td className="created-question">{q.question}</td>
                                <td className={q.canverify ? "green" : "red"}>{q.canverify ? "accepted" : "not-accepted"}</td>
                                <td className={q.verify === "1" ? "yellow" : q.verify === "0" ? "red" : "green"}>
                                    {q.verify === "1" ? "pending" : q.verify === "0" ? "rejected" : "verified"}
                                </td>
                                <td>{q.topic}</td>
                                <td style={{ color: "white" }}>{formatTimestamp(q.createdAt)}</td>
                                <td>
                                    <Link to="/edit-question" state={{ questionData: q }} style={{ textDecoration: "none", color: "black" }}>
                                        Edit
                                    </Link>
                                </td>
                                <td style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(q._id)}>Delete</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
