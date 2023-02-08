import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {

  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])

  // GET request
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, [])

  // POST CB Function
  function onAddNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
    console.log(questions)
  }

  // DELETE CB Function
  function onDeleteQuestion(deletedQuestion) {
    const newArray = questions.filter(question => 
        deletedQuestion.id !== question.id
      )
      setQuestions(newArray)
  }

  // PATCH CB Function
  function onUpdateQuestion(updatedQuestion) {
    const newArray = questions.map(question => {
      if (updatedQuestion.id === question.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(newArray)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm onAddNewQuestion={onAddNewQuestion}/> : 
      <QuestionList 
        questions={questions} 
        onDeleteQuestion={onDeleteQuestion}
        onUpdateQuestion={onUpdateQuestion}
      />}
    </main>
  );
}

export default App;
