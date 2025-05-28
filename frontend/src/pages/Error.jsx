import { useNavigate } from "react-router-dom"

export default function Error() 
{
    const navigate = useNavigate()
    return (<>
        <div className="bg-gradient-to-r from-blue-500 to-black h-dvh text-white text-center overflow-hidden pt-80">
        <h2 className="text-3xl ">Hello, Mate check the url</h2>
         <h1 className="text-9xl animate__backInDown ">ERROR 404</h1>
     
        <button className="border m-5 p-2 rounded-xl hover:text-white hover:font-sans hover:bg-black hover:scale-110 "
         onClick={()=>navigate("/")}>
            Take me back
        </button>
    </div>

    </>)
} 