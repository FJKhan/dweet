import React from 'react'
import './Todo.component.css'
const Todo = ({ todo, handleClick }) => {
    return (
        <div className="h-10 w-full rounded border-b border-gray-100 flex items-center">
            <div className="w-4/5">
                <span className={todo.completed ? `todo-complete` : ``}>
                    <span className={todo.completed ? `completed` : ``}>
                        {todo.name}
                    </span>
                </span>
            </div>
            <div className="w-1/5">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    className="float-right"
                    onChange={() => handleClick(todo.id)}
                ></input>
            </div>
        </div>
    )
}

export default Todo