import React from 'react'
import './Todo.component.css'
const Todo = ({ todo, handleClick }) => {
    return (
        <div className="h-10 w-full rounded border-b border-gray-100 flex items-center select-none">
            <div
                className="w-full p-2 hover:bg-gray-200"
                onClick={() => handleClick(todo._id)}
            >
                <span className={todo.completed ? `todo-complete` : ``}>
                    <span className={todo.completed ? `completed` : ``}>
                        {todo.name}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Todo