import { useState } from "react"
import axios from "axios"
import {ToastContainer,toast} from 'react-toastify'

export default function TodoInput({ onAdd }) {
    const [task, setTask] = useState('')
    const userid = localStorage.getItem("userid")

    const handleAdd = async () => {
        if (!task.trim()) {
            toast.error("task cannot be empty")
            return
        }
        try {
            const result = await axios.post('http://localhost:8080/addtodo', {
                task,
                userid
            })
            setTask('');
            if (onAdd && result.data && result.data.todo) {
                onAdd(result.data.todo);
            }
        }

        catch (error) {
            alert("error adding todo")
        }

    }
    return (<>
        <div className="flex-col gap-0.5">
            <input className="border-2 text-black bg-blue-50 text-balck rounded-lg p-2"
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)} />

            <button
                className="border-2 m-2 p-1 px-3 rounded-md  hover:bg-gradient-to-tl from-blue-300   hover:border-white"
                onClick={handleAdd}
                type="button"
                
            >
                Add
            </button>

        </div>
    </>)
}