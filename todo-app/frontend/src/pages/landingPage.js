import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {
    const [uname, setUname] = useState(null)
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState('')
    const [taskid, setTaskID] = useState(null)
    const [showTask, setshowTask] = useState(false)
    const [title, setTitle] = useState('')
    const [todoAdded, setTodoAdded] = useState(false)
    const [todoDeleted, setTodoDeleted] = useState(false)
    const [todoEditted, setTodoEditted] = useState(false)
    const [taskAdded, setTaskAdded] = useState(false)
    const [taskDeleted, setTaskDeleted] = useState(false)

    const loadTodos = async () => {
        const response = await axios.get('https://kaushalam-task-server.vercel.app/todo/gettodos', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
        const { todos, uname } = await response.data
        setUname(uname)
        setTodos(todos)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        submitData()
        setTodo('')
    }

    const submitData = async () => {
        try {
            const data = {
                title: todo,
                createdAt: Date.now()
            }
            const res = await axios.post('https://kaushalam-task-server.vercel.app/todo/createtodo', data, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            })
            const response = await res.data
            if (response.success) {
                setTodoAdded(true)
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://kaushalam-task-server.vercel.app/todo/deletetodo/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            })
            const response = await res.data
            if (response.success) {
                setTodoDeleted(true)
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleEdit = async (id) => {
        try {
            const newtodo = window.prompt('Enter new Todo')
            setTodo(newtodo)
            const res = await axios.put(`https://kaushalam-task-server.vercel.app/todo/edittodo/${id}`, {
                "title": newtodo
            }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            })
            const response = res.data
            if (response.success) {
                setTodoEditted(true)
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            setTodo('')
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const addTask = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(`https://kaushalam-task-server.vercel.app/todo/createtask/${taskid}`, { task: task }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            })
            const response = await res.data
            setTask('')
            if (response.success) {
                setTaskAdded(true)
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleTaskClick = async (id) => {
        const res = await axios.get(`https://kaushalam-task-server.vercel.app/todo/gettodo/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
        setTasks(res.data.todo.tasks)
        setshowTask(true)
        setTaskID(null)
        setTaskID(id)
        setTitle(res.data.todo.title)
    }
    const handleTaskDelete = async (e) => {
        try {
            e.preventDefault()
            const text = e.target.parentNode.parentNode.firstChild.firstChild.innerText
            const res = await axios.delete(`https://kaushalam-task-server.vercel.app/todo/deletetask/${taskid}`, {
                data: { taskString: text },
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            })
            const response = await res.data
            setTask('')
            if (response.success) {
                setTaskDeleted(true)
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const sort = async (n) => {
        const response = await axios.get('https://kaushalam-task-server.vercel.app/todo/sortTodo', {
            params: { order: n },
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        })
        const todoarray = await response.data.todos
        setTodos(todoarray)
    }
    useEffect(() => {
        loadTodos()
        setTodoAdded(false)
        setTodoDeleted(false)
        setTaskAdded(false)
        setTaskDeleted(false)
        setTodoEditted(false)
    }, [showTask, todoAdded, todoDeleted
        , taskAdded, taskDeleted, todoEditted])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <header className="p-4 bg-gray-100 text-gray-800">
                <div className="container flex flex-col md:flex-row text-center space-y-2 md:space-y-0 justify-between h-16 mx-auto">
                    <h3 className='font-semibold text-xl align-middle text-slate-700'>Welcome, {uname}</h3>
                    <form onSubmit={handleSubmit} className="flex space-x-2 flex-row md:items-center md:space-x-4 mx-auto">
                        <div className="relative">
                            <input required value={todo} onChange={(e) => setTodo(e.target.value)} type="text" name="Search" placeholder="todo..." className="w-48 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 border border-gray-300 focus:bg-gray-50" />
                        </div>
                        <button type="submit" className="px-6 py-2 font-semibold rounded lg:block bg-indigo-600 text-gray-50">Add Todo</button>
                    </form>
                </div>
            </header>
            <div className="conatiner p-2 mx-auto sm:p-4 text-gray-800">
                <h2 className="mb-4 text-center md:text-left text-2xl font-semibold leading-tight">Todos</h2>
                <ul className='list-none mx-auto md:mx-0 flex flex-row w-80 justify-evenly text-center items-center font-semibold m-3'>Sort by Date:
                    <li className='cursor-pointer border rounded-xl shadow-lg p-1 border-gray-500 bg-indigo-600 text-white' onClick={() => sort(1)}>Oldest</li>
                    <li className='cursor-pointer border rounded-xl shadow-lg p-1 border-gray-500 bg-indigo-600 text-white' onClick={() => sort(-1)}>Newest</li>
                </ul>
                <div className="overflow-x-auto shadow-md">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">Todos</th>
                                <th className="p-3">Created At</th>
                                <th className="p-3">Updated At</th>
                                <th className="p-3">Tasks</th>
                                <th className="p-3">Delete</th>
                                <th className="p-3">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map(todo => (
                                    <tr key={todo._id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                        <td className="p-3">
                                            <p>{todo.title}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{new Date(todo.createdAt).toDateString()}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{new Date().toGMTString(todo.updatedAt)}</p>
                                        </td>
                                        <td className="p-3 ">
                                            <button onClick={() => handleTaskClick(todo._id)} className="px-3 py-1 font-semibold rounded-md bg-indigo-600 text-gray-50">
                                                <span>Tasks: {todo.tasks.length}</span>
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <button onClick={() => handleDelete(todo._id)} className="px-3 py-1 font-semibold rounded-md bg-indigo-600 text-gray-50">
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                        <td className="p-3 ">
                                            <button onClick={() => handleEdit(todo._id)} className="px-3 py-1 font-semibold rounded-md bg-indigo-600 text-gray-50">
                                                <span>Edit</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                showTask && <div className="conatiner p-2 mx-auto sm:p-4 text-gray-800">
                    <h1 className="mb-4 text-2xl font-semibold leading-tight">TODO: {title}</h1>
                    <header className="p-4 bg-gray-100 text-gray-800">
                        <div className="container flex justify-between h-16 mx-auto">
                            <form onSubmit={addTask} className="flex items-center md:space-x-4 mx-auto">
                                <div className="relative">
                                    <input required value={task} onChange={(e) => setTask(e.target.value)} type="text" name="Search" placeholder="task..." className="w-48 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 border border-gray-300 focus:bg-gray-50" />
                                </div>
                                <button type="submit" className="hidden px-6 py-2 font-semibold rounded lg:block bg-indigo-600 text-gray-50">Add Task</button>
                            </form>
                        </div>
                    </header>
                    <div className="overflow-x-auto shadow-md">
                        {
                            <table className="min-w-full text-xs text-center">
                                <colgroup>
                                    <col />
                                    <col />
                                </colgroup>
                                <thead className="bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">Task</th>
                                        <th className="p-3">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map(task => (
                                            <tr tr key={todo._id} className="border-b border-opacity-20 border-gray-300 bg-gray-50" >
                                                <td className="p-3">
                                                    <p>{task}</p>
                                                </td>
                                                <td className="p-3">
                                                    <button onClick={(e) => handleTaskDelete(e)} className="px-3 py-1 font-semibold rounded-md bg-indigo-600 text-gray-50">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Landing