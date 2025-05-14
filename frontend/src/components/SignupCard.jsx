import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
        }
        catch (error) {
            alert("error signing up")
        }

    }
    return (<>
        <div className="">
            <h1 className="text-3xl font-extrabold text-center">Welcome</h1>
            <p>Name</p>
            <input className="border-2 rounded-lg p-2 bg-amber-50"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <p>Email</p>
            <input className="border-2 rounded-lg p-2 bg-amber-50"
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <p>Password</p>
            <input className="border-2 rounded-lg p-2 bg-amber-50"
                type="password"
                placeholder="Create your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="p-2 mt-1.5 flex justify-center ">
            <button className="border-2 p-3  rounded-lg bg-black text-white hover:bg-blue-800 hover:scale-105"
                type="button"
                onClick={handleSignup}>Register</button>
        </div>
    </>)
}


