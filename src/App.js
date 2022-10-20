import './App.css';
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const QUESTIONS = [
  {
    question: "who is the main character?",
    answer: "Harry Potter",
    alt2: "Ronald Wiesley",
    alt3: "Severus Snape",

  }, {
    question: "Who is the headmaster when Harry arrives at hogwarts?",
    answer: "Albus Dumbledore",
    alt2: "Severus snape",
    alt3: "Hagrid",
  }
];


function FrontPage() {
  return <div className="App">
    <header className="App-header">
      <h1>Harry Potter quiz</h1>
      <ul>
        <li><Link to="/questions">Take the quiz</Link></li>
        <li><Link to="/add questions">Add questions</Link></li>
      </ul>
    </header>
  </div>;
}

//gets a list of questions
function Questions({quizApi}) {

  const [questions, setQuestions] = useState();

  useEffect( async () => {
        setQuestions(undefined);
        setQuestions(await quizApi.listQuestions());
      }, []
  );

  if (!questions){
    return <div>Loading...</div>
  }

  let index = 1;
  return <div>
    <h1>Questions:</h1>
    {
      questions.map(q =>
          <>
            <h2>Question {index++}: {q.question}</h2>
            <select>
                <option id="1">{q.answer}</option>
                <option id="2">{q.alt2}</option>
                <option id="3">{q.alt3}</option>
            </select>
          </>
      )
    }
  </div>;
}

function AddQuestion({quizApi}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [alt2, setAlt2] = useState("");
  const [alt3, setAlt3] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    quizApi.onAddQuestion({question, answer, alt2, alt3});
    navigate("/");
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <label>Question:</label><br />
      <input type="text" value={question} onChange={e => setQuestion(e.target.value)}/><br /><br />
      <label>Answer:</label><br />
      <input type="text" value={answer} onChange={e => setAnswer(e.target.value)}/><br /><br />
      <label>Alternative 2:</label><br />
      <input type="text" value={alt2} onChange={e => setAlt2(e.target.value)}/><br /><br />
      <label>Alternative 3:</label><br />
      <input type="text" value={alt3} onChange={e => setAlt3(e.target.value)}/><br /><br />
      <input type="submit"/>
    </form>
  </div>;
}

function App() {

  const quizApi = {
    onAddQuestion: async (q) => QUESTIONS.push(q),
    listQuestions: async () => QUESTIONS
  }
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<FrontPage/>}></Route>
      <Route path="/questions" element={<Questions quizApi={quizApi}/>}></Route>
      <Route path="/add questions" element={<AddQuestion quizApi={quizApi}/>}></Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
