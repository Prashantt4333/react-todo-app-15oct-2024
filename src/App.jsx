
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


function App() {

  let [todo, setTodo] = useState('')
  let [todos, setTodos] = useState([])
  let [showFinished, setShoFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos") 
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const saveLocalStorage = () =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () =>{
    setShoFinished(!showFinished)
  }

  const handleEdite=(e, id)=>{
      let t = todos.filter(item=>(item.id === id))
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
        return item.id !== id
      })
      setTodos(newTodos)
      saveLocalStorage()

  }
  const handleDelete=(e, id)=>{
      let newTodos = todos.filter(item=>{
        return item.id !== id
      })
      setTodos(newTodos)
      saveLocalStorage()

  }
  const handleAdd=()=>{
      setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
      setTodo("")
      saveLocalStorage()

      
  }  
  const handleChange=(e)=>{
    setTodo(e.target.value)
  } 
  const handleCheckBox=(e)=>{
    let id = e.target.name;
    console.log("this is id",id)
    let index = todos.findIndex(item=>{
      return item.id === id; 
    })
    console.log("index",index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveLocalStorage()
  }
  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto  my-5 p-2  rounded-xl   bg-blue-200 min-h-[80vh] m-5 md:w-1/2">
        <div className="addTodo flex flex-col gap-4">
          <h2 className='text-2xl font-bold text-center'>Add Todo</h2>
         <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full h-7  p-4  ' />
            <button onClick={handleAdd } disabled={todo.length<=3} className='disabled:bg-blue-400 bg-blue-500 font-bold hover:bg-blue-700 p-4 py-1 px-3 text-white rounded-full mx-2'>
              Add
            </button>
         </div>
        </div>
        <input className='mt-5' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="show" />
        <label htmlFor='show'> Show Finished</label>
        <div className="h-[1px] bg-black w-[90%] my-3 mx-auto opacity-15"></div>
        <h2 className='text-center text-2xl font-bold my-5'>Yours TODOS</h2>

        <div className="todos">
          {todos.length ===0 && <div className='m-5 '>No todos to display</div>}
          {todos.map(item=>{  
          return  (showFinished || !item.isCompleted ) && <div key={item.id} className="todo md:w-full flex my-3 justify-between">
                    <div className='flex gap-5'>
                      <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                      <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                    </div>
                    <div className="buttons flex h-full">
                        <button onClick={(e)=>{handleEdite(e , item.id)}} className='bg-blue-500 font-bold hover:bg-blue-700 p-2 py-1 px-3 text-white rounded-md mx-2'><FaEdit /></button>
                        <button onClick={(e)=>{handleDelete(e , item.id)}}className='bg-red-500 font-bold hover:bg-red-700 p-2 py-1 px-3 text-white rounded-md mx-2'><MdDelete /></button>
                    </div>
                  </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
