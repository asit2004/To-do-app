import { useState } from "react"
import axios from "axios"

export default function TodoInput() {
    const [task, setTask] = useState('')
    const userid = localStorage.getItem("userid")
    const handleAdd = async () => {
        try {
            const result = await axios.post('http://localhost:8080/addtodo', {
                task,
                userid
            })
            console.log(result)

        }
        catch (error) {
            alert("error adding todo")
        }

    }
    return (<>
        <div className="flex-col">
            <input className="border-2 bg-amber-50" type="text" placeholder="Enter task" onChange={(e) => setTask(e.target.value)} />
            <button className="border-2 m-2 px-1 bg-red-400" onClick={handleAdd} type="button">Add</button>
        </div>
    </>)
}