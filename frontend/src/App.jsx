import { Routes, Route } from "react-router-dom";
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Todo from './pages/Todo'

function App() {

  return (
    <>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Todo' element={<Todo />} />
      </Routes>
    </>
  )
}

export default App