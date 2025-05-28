import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function SignupCard() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            const result = await axios.post('http://localhost:8080/add', {
                name: name,
                email: email,
                password: password
            })
            // const data=await result.json()
            console.log(result)
            const userid = result.data.userid
            localStorage.setItem("userid", userid)
            navigate("/todo")
            toast.success(`Welcome, ${name}!`)
        }
        catch (error) {
            toast.error("error signing up")
        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold mb-2">Get started now</h1>
                    <h2 className="text-gray-500">Create your account and start exploring</h2>
                  
                </div>
                <div className="flex flex-col">

                    <label className="mt-4 mb-1 font-medium">Name</label>
                    <input className="border-2 rounded-lg p-2 bg-amber-50"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <label className="mt-2 mb-1 font-medium">Email</label>
                    <input className="border-2 rounded-lg p-2 bg-amber-50"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <label className="mt-2 mb-1 font-medium">Password</label>
                    <input className="border-2 rounded-lg p-2 bg-amber-50"
                        type="password"
                        placeholder="Create your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="p-2 mt-1.5 flex justify-center ">
                    <button className="border-2 p-3  rounded-lg bg-black text-white hover:bg-gradient-to-tl to-sky-600 hover:scale-105 transition-transform duration-200"
                        type="button"
                        onClick={handleSignup}>Register</button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600"> Have an account? 
                        <a
                        className="text-blue-600 cursor-pointer"
                        href="/signin"
                    >SignIn</a>
                    </p>
                </div>
            </div>
        </div>
    )
}


