import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers?.map((answer, index) => ( // add "?" in case answers is blank
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {method: "DELETE"}) // return empty object
    .then(res => res.json())
    .then(() => onDeleteQuestion(question))
  }


  function handleChange(e) {
    const updatedAnswerIndex = e.target.value
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        correctIndex: updatedAnswerIndex
      })
    })
    .then(res => res.json())
    .then(updatedQuestion => onUpdateQuestion(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
