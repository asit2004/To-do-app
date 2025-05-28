import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
    const navigate = useNavigate()
    return (<>
        <div className="h-screen bg-gradient-to-t from-blue-400 to-black flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center flex-grow">
                <div className="bg-blue-200 pb-15 rounded-3xl p-10">
                    <h1 className="text-5xl font-bold mt-10">Donezo - Your Daily Task Manager</h1>
                    <p className="text-lg mt-4">Simplify your life, one task at a time.</p>
                    <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                        onClick={() => navigate("/Signup")}>
                        Get Started
                    </button>
                    <h2 className="mt-6">Already have an account,
                        <a
                            className="text-blue-600 underline"
                            href="/Signin"
                        >Signin</a>
                    </h2>
                </div>
            </div>
        </div>
    </>)
}   