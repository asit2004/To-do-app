import { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Todo() {
    const [todos, setTodos] = useState([])
    const userid = localStorage.getItem("userid")
    const navigate = useNavigate()
    const [editTaskId, setEditTaskId] = useState(null)
    const [editText, setEditText] = useState("")


    useEffect(() => {
        if (!userid || userid === "null") {
            navigate('/signin');
            return;
        }

        const getTodo = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/gettodo?userid=${userid}`);
                console.log(result.data);
                const sortedTodos = result.data.Todo.sort((a, b) => a.completed - b.completed).reverse();
                setTodos(sortedTodos);
            } catch (error) {
                alert("Error fetching todos");
                console.error(error);
            }
        };


        getTodo();
    }, [])

    const handleDelete = async (taskid) => {
        try {
            const result = await axios.delete(`http://localhost:8080/deletetask?userid=${userid}&taskid=${taskid}`)
            console.log(result.data)
            setTodos(prev => prev.filter(todo => todo._id !== taskid))
        } catch (error) {
            alert("Error fetching todos")
            console.error(error);
        }
    }

    const handleComplete = async (taskid, currentStatus) => {
        try {
            const result = await axios.put(`http://localhost:8080/updatetask`, {
                userid,
                taskid,
                completed: !currentStatus
            })
            console.log(result.data)
            setTodos(prev => {
                const updated = prev.map(todo =>
                    todo._id === taskid ? { ...todo, completed: !currentStatus } : todo
                );
                return updated.sort((a, b) => a.completed - b.completed)
            });
        } catch (error) {
            alert("Error updating task")
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:8080/logout", { userid })
            console.log(response.data);
            localStorage.removeItem("userid")
            navigate('/signin')
        } catch (error) {
            alert("Error logging out")
            console.error(error);

        }
    }


    const handleSaveEdit = async (taskid) => {
        if (!editText.trim()) {
            alert("Task cannot be empty!");
            return;
        }
        try {
            const result = await axios.put("http://localhost:8080/edittask", {
                userid,
                taskid,
                newText: editText
            })
            console.log(result.data);
            setTodos(prev =>
                prev.map(todo =>
                    todo._id === taskid ? { ...todo, task: editText } : todo
                )
            )
            setEditTaskId(null)
            setEditText("")
        } catch (error) {
            alert("Error updating task")
            console.error(error);

        }
    }

    return (<>

        <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-black ">
            <nav className="flex justify-end text-3xl">
                <button
                    type="button"
                    className="bg-blue-950 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-md transition"
                    onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className="flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl bg-gradient-to-br from-cyan-600 to-emerald-00  rounded-lg shadow-md p-6">
                    <div className="justify-items-center">
                        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Your Tasks</h1>
                        <TodoInput />
                    </div>

                    <div className="flex flex-col gap-2"> {
                        todos.length === 0
                            ?
                            <div><h2>No Record</h2></div>
                            :
                            todos.map(todo => (
                                <div key={todo._id} className="border p-4 bg-gradient-to-r from--950 to-indigo-200  rounded flex flex-col sm:flex-row justify-between items-center gap-2 hover:shadow-md transition">
                                    <input type="checkbox"
                                        className="w-4 h-5"
                                        checked={todo.completed}
                                        onChange={() => handleComplete(todo._id, todo.completed)} />
                                    <div className={`flex-1 px-3 py-2 ${todo.completed ? 'line-through text-gray-300' : 'text-white'}`}>
                                        {editTaskId === todo._id ? (
                                            <input
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            todo.task
                                        )}
                                        <div>Added on:{new Date(todo.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(todo._id)}
                                        type="button"
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-blue-400 hover:bg-blue-800 text-gray-200 p-1 rounded-md"
                                        onClick={() => {
                                            if (editTaskId === todo._id) {
                                                handleSaveEdit(todo._id)
                                            }
                                            else {
                                                setEditTaskId(todo._id)
                                                setEditText(todo.task)
                                            }
                                        }}
                                    >
                                        {editTaskId === todo._id ? "Save" : "Edit"}
                                    </button>
                                </div>
                            ))
                    }</div>
                </div>
            </div>
        </div>
    </>)
}