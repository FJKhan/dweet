import React from 'react'

const TodoForm = () => {
    return (
        <div className="w-1/3 flex flex-wrap align-middle">
            <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full border-b text-2xl placeholder-gray-300"
            />
        </div>
    )
}

export default TodoForm