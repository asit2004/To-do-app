import SigninCard from "../components/SigninCard";

export default function Signin() {
    return (<>
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-400 to-black ">
            <div className="flex items-center justify-center rounded-2xl">
                <SigninCard />
            </div>
        </div>
    </>)
} 