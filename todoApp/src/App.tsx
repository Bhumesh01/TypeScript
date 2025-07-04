import { useState, useRef } from 'react'
import './App.css'

interface todoType{
  title: string,
  message: string,
  done: boolean,
};
interface todoInput{
  todo: todoType
}

function App() {
  const titleRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<todoType[]>([{
    title: "Go to Gym",
    message: "Grind Hard",
    done: false
  }])

  function submitData(){
    if (
    titleRef.current &&
    messageRef.current &&
    doneRef.current
  ) {
    const todo = {
      title: titleRef.current.value,
      message: messageRef.current.value,
      done: doneRef.current.value === "true"? true:false,
    };
    const newTodos = [...todos,todo];
    setTodos(newTodos);
    titleRef.current.value = "";
    messageRef.current.value = "";
    doneRef.current.value = "";
  }
  }

  return (
    <>
      <div>
        <div>
          <input ref={titleRef} style={{margin: '2px', fontSize: '18px'}} placeholder='Enter the Title' />
          <input ref={messageRef} style={{margin: '2px', fontSize: '18px'}} placeholder='Enter the Message' />
          <input ref={doneRef} style={{margin: '2px', fontSize: '18px'}} placeholder='Done? true/false' />
        </div>
        <div>
          <button onClick={submitData}>Submit</button>
        </div>
      </div>
      {todos.map((todo, index)=>
        <Todo key={index} todo={todo}></Todo>
      )}
    </>
  )
}

function Todo({todo}: todoInput){
  return(
    <div>
        <h1>Title: {todo.title}</h1>
        <h2>Message: {todo.message}</h2>
        <h2>Done: {todo.done? "true": "false"}</h2>
    </div>
  )

}

export default App
