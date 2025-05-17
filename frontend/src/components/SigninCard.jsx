import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function SigninCard() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const result = await axios.post('http://localhost:8080/signin', {
                email,
                password
            })

            localStorage.setItem("userid", result.data.userid)//storing userid in localstorage after succesfully signed in 

            console.log("Login succesful:", result.data)
            toast.success(`Welcome back`)
            navigate("/todo")
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            toast.error("Login failed")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <div className="mb-5 text-center">
                    <h1 className="font-extrabold mb-2  text-3xl drop-shadow-[0_0_10px_rgba(9,100,134,7)]">Donezo</h1>
                    <h1 className="font-extrabold text-3xl mb-2">Welcome back</h1>
                    <h2 className="text-gray-500">Enter your credentials to continue</h2>
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Email</label>
                    <input
                        className="border-2 rounded-lg p-2 bg-amber-50 w-full"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="mt-4 mb-1 font-medium">Password</label>
                    <input
                        className="border-2 rounded-lg p-2 bg-amber-50 w-full"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            className="w-full border-2 p-3 rounded-lg bg-black text-white hover:bg-gradient-to-tl to-sky-600 hover:scale-105 transition-transform duration-200"
                            onClick={handleLogin}
                        >
                            LOG IN
                        </button>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">Don’t have an account? 
                        <a
                        className="text-blue-600 cursor-pointer"
                        href="/signup"
                    >Register</a>
                    </p>
                </div>
            </div>
        </div>
    )
}