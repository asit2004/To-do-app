import Navbar from "../components/Navbar";

export default function Home(){
    return(<>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
        <Navbar/>
    <h1>Welcome to your TO-do Dashboard</h1>
    </div>
    </>)
}