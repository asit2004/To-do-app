import { Routes, Route } from "react-router-dom";
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Todo from './pages/Todo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Error from "./pages/Error";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Todo' element={<Todo />} />
        <Route path="/*" element={<Error/>}/>
      </Routes>
      <ToastContainer position="top-center"/>
    </>
  )
}

export default App