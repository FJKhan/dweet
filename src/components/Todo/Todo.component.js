import React from 'react'
const Todo = ({ todo, handleClick, deleteTodo }) => {
    return (
        <div className="todo h-10 w-full rounded border-b border-gray-100 flex items-center select-none hover:bg-gray-200">
            <div className="w-4/5 p-2" onClick={() => handleClick(todo._id)}>
                <span
                    className={todo.completed ? ` todo-text line-through text-mint` : `todo-text`}>
                    <span className={todo.completed ? `text-cool-gray` : ``}>
                        {todo.name}
                    </span>
                </span>
            </div>
            <div
                className="w-1/5 px-2 text-cool-gray hover:text-red-500"
                onClick={() => deleteTodo(todo._id)}>
                <span
                    className="iconify float-right text-current"
                    data-icon="fa-solid:trash"
                    data-inline="true">
                </span>
            </div>
        </div>
    )
}

export default Todo