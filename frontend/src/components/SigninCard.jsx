import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SigninCard() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const result = await axios.post('http://localhost:8080/signin', {
                email,
                password
            })
            console.log("Login succesful:", result.data)
            alert("Login succesful")
            navigate("/todo")
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed")
        }
    }
    return (<>
        <div className="bg-blue-400"></div>

        <div>
            <h1 className="font-extrabold text-4xl font-serif mb-3">SIGNIN</h1>
        </div>

        <div className="flex flex-col">
            <h2 className="mb-1">Email</h2>
            <input className="border-2 rounded-lg p-2 bg-amber-50"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <h2 className="mt-2 mb-1">Password</h2>
            <input className="border-2 rounded-lg p-2 bg-amber-50"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e => setPassword(e.target.value))} />

            <div className="p-2 mt-1.5 flex justify-center ">
                <button
                    type="button"
                    className="border-2 p-3  rounded-lg bg-black text-white hover:bg-blue-800 hover:scale-105"
                    onClick={handleLogin}
                >LOG IN</button>
            </div>
        </div>

    </>)
}