import { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Todo() {
    const [todos, setTodos] = useState([])
    const userid = localStorage.getItem("userid")
    const navigate = useNavigate()

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

    return (<>
        <nav className=" justify-items-center">
            <button
                type="button"

                onClick={handleLogout}>
                Logout
            </button>
        </nav>
        <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-black flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-2xl bg-white  rounded-lg shadow-md p-6">
                <div className="justify-items-center">
                    <h1 className="text-3xl">To do</h1>
                    <TodoInput />
                    
                </div>
                <div className="flex flex-col gap-2"> {
                    todos.length === 0
                        ?
                        <div><h2>No Record</h2></div>
                        :
                        todos.map(todo => (
                            <div key={todo._id} className="border p-4 bg-gray-100 rounded flex justify-between items-center">
                                <input type="checkbox"
                                    className="w-4 h-5"
                                    checked={todo.completed}
                                    onChange={() => handleComplete(todo._id, todo.completed)} />
                                <div className=" p-3 m-2">
                                    {todo.task}
                                </div>
                                <button
                                    onClick={() => handleDelete(todo._id)}
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                }</div>
            </div>
        </div>
    </>)
}