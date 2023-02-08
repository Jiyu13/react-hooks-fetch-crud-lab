import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {

  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, [])


  function onAddNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
    console.log(questions)
  }

  function onDeleteQuestion(deletedQuestion) {
    const newArray = questions.filter(question => 
        deletedQuestion.id !== question.id
      )
      setQuestions(newArray)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm onAddNewQuestion={onAddNewQuestion}/> : 
      <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion}/>}
    </main>
  );
}

export default App;
