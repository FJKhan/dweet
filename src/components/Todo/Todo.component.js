import React from 'react'

const Todo = ({ todo, handleClick }) => {
    return (
        <div className="h-10 w-full rounded border-b border-gray-100 flex items-center">
            <div className="w-4/5">{todo.name}</div>
            <div className="w-1/5">
                <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    className="float-right"
                    onChange={() =>handleClick(todo.id)}
                ></input>
            </div>
        </div>
    )
}

export default Todo