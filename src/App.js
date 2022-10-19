import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

const questions = [
  {
    question: "who is the main character?",
    alt1: "Harry Potter",
    alt2: "Ronald Wiesley",
    alt3: "Severus Snape",
    answer: 1

  }, {
    question: "Who is the headmaster when Harry arrives at hogwarts?",
    alt1: "Severus Snape",
    alt2: "Albus Dumbledore",
    alt3: "Hagrid",
    correct: 2
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

function Questions() {
  let index = 1;
  return <div>
    <h1>Questions:</h1>
    {
      questions.map(q =>
          <>
            <h2>Question {index++}: {q.question}</h2>
            <select>
                <option id="1">{q.alt1}</option>
                <option id="2">{q.alt2}</option>
                <option id="3">{q.alt3}</option>
            </select>
          </>
      )
    }
  </div>;
}

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<FrontPage/>}></Route>
      <Route path="/questions" element={<Questions/>}></Route>
      <Route path="/add questions" element={<h1>add a question</h1>}></Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
