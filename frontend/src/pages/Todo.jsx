import TodoInput from "../components/TodoInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    const handleAddTodo = (newTodo) => {
        setTodos(prevTodos => [newTodo, ...prevTodos]);
    };

    const handleDelete = async (taskid) => {
        try {
            const result = await axios.delete(`http://localhost:8080/deletetask?userid=${userid}&taskid=${taskid}`)
            console.log(result.data)
            setTodos(prev => prev.filter(todo => todo._id !== taskid))
            toast.success("Task deleted succesfully")
        } catch (error) {
            toast.error("Error fetching todos")
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
            toast.error("Error updating task")
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:8080/logout", { userid })
            console.log(response.data);
            localStorage.removeItem("userid")
            navigate('/signin')
            toast.success(`See you soon!`)
        } catch (error) {
            toast.error("Error logging out")
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


    return (
        <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-black text-gray-100">
            {/* Header with navigation */}
            <header className="bg-black bg-opacity-30 backdrop-blur-sm shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-sky-50 drop-shadow-[0_0_10px_rgba(99,102,241,5)] hover:scale-110">Donezo</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Card Container */}
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-800 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white  transition">Your Tasks</h2>
                    </div>

                    {/* Todo Input */}
                    <div className="p-6 bg-gray-900 bg-opacity-40 justify-items-center">
                        <TodoInput onAdd={handleAddTodo} />
                    </div>

                    {/* Todo List */}
                    <div className="p-6">
                        {todos.length === 0 ? (
                            <div className="text-center py-6">

                                <p className="mt-4 text-gray-400 text-lg">No tasks yet. Add your first task above!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {todos.map(todo => (
                                    <div
                                        key={todo._id}
                                        className={`rounded-lg transition-all duration-300 ${todo.completed
                                            ? 'bg-gray-700 bg-opacity-30'
                                            : 'bg-gray-700'
                                            } shadow-md hover:shadow-lg`}
                                    >
                                        <div className="p-4 flex items-center gap-3">
                                            {/* Checkbox with custom styling */}
                                            <div className="flex-shrink-0">
                                                <input
                                                    type="checkbox"
                                                    checked={todo.completed}
                                                    onChange={() => handleComplete(todo._id, todo.completed)}
                                                    className="w-5 h-5 rounded-full border-2 border-blue-400 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800 cursor-pointer"
                                                />
                                            </div>

                                            {/* Task Content */}
                                            <div className="flex-1">
                                                {editTaskId === todo._id ? (
                                                    <input
                                                        type="text"
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div>
                                                        <p className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                                                            {todo.task}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        if (editTaskId === todo._id) {
                                                            handleSaveEdit(todo._id)
                                                        } else {
                                                            setEditTaskId(todo._id)
                                                            setEditText(todo.task)
                                                        }
                                                    }}
                                                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-sm"
                                                >
                                                    {editTaskId === todo._id ? "Save" : "Edit"}
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(todo._id)}
                                                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 shadow-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
