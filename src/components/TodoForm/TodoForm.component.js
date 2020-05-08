import React from 'react'

const TodoForm = ({value, handleKeyPress, handleInputChange}) => {
    return (
        <div className="w-1/3 flex flex-wrap align-middle px-2">
            <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full border-b text-2xl placeholder-gray-300"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={value}
            />
        </div>
    )
}

export default TodoForm