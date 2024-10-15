 
function Navbar() {
  return (
    <nav className="flex justify-around bg-blue-500 text-white py-2">
        <div className="flex mx-9 font-bold text-xl" >
            <span>ToDo List</span>
        </div>
        <ul className="flex mx-9 gap-9">
          <li className="cursor-pointer hover:font-bold transition-all ">Home</li>  
          <li className="cursor-pointer hover:font-bold transition-all ">Your Tasks</li>  
        </ul>  
    </nav>
  )
}

export default Navbar
