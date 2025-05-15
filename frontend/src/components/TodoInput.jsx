import { useState } from "react"
import axios from "axios"

export default function TodoInput({ onAdd }) {
    const [task, setTask] = useState('')
    const userid = localStorage.getItem("userid")

    const handleAdd = async () => {
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
        <div className="flex-col">
            <input className="border-2 bg-amber-50 rounded-lg p-1"
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)} />

            <button
                className="border-2 m-2 p-1 px-2 rounded-md bg-emerald-400 hover:bg-emerald-800 hover:text-white"
                onClick={handleAdd}
                type="button"
                disabled
            >
                Add
            </button>

        </div>
    </>)
}