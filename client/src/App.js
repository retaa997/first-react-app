import {useState, useEffect} from "react"
import axios from "axios"

function App() {
  const [todos, setTodos] = useState([])
  const [popup, setPopup] = useState(false)
  const [newTodo, setNewTodo] = useState("")


  useEffect(()=>{
    fetchTodos()
  },[])

  const fetchTodos = async()=>{
    const {data} = await axios.get("http://localhost:3001/todos")
    setTodos(data)
  }

  const handleDelete = async id => {
    const {deletedTodo} = await axios.delete("http://localhost:3001/todos/delete/"+id)

    setTodos(todos => todos.filter(todo => todo._id !== id))
    
  }

  const handleComplete = async id => {
    const {data} = await axios.put("http://localhost:3001/todos/complete/"+id)
    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
        todo.isComplete = data.isComplete
      }
      return todo
    }))

  }

  const handleAdd = async()=>{
    const {data} = await axios.post("http://localhost:3001/todos/new", {text: newTodo})

    setTodos([...todos, data])
    setNewTodo("")
    setPopup(false)
  }

  return (
    <div className="App">
      <h1>Welcome, Tarik</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.map(todo=>{
          return(
            <div className="todo" key={todo._id} disabled={!popup}>
              <div className={todo.isComplete ? "td is-complete":"td"}  onClick={()=>{
                if(popup)return
                handleComplete(todo._id)}}>
                <div className="todo-checkbox"></div>
                <div className="todo-text">{todo.text}</div>
              </div>

              <div className="todo-delete" onClick={()=>{
                if(popup)return
                handleDelete(todo._id)
                }}>x</div>
            </div>
          )
          
        })}
      </div>

      <div className="add-btn" onClick={()=>setPopup(true)}>
        <div className="add-text">+</div>
      </div>

      {popup ? (
        <div className="add-form">
          <div className="close-form" onClick={()=>setPopup(false)}>x</div>
          <h5>Add New Task</h5>
          <input type="text" name="text" onChange={(e)=>{setNewTodo(e.target.value)}} value={newTodo} />
          <button className="form-btn" onClick={handleAdd}>Add</button>
        </div>
      ):""}
      
    </div>
  );
}

export default App;
