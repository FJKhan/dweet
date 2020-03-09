import React from 'react'
import Todo from '../Todo/Todo.component'

const TodoList = ({ todos, completeTodo }) => {
    return (
        <div className="w-1/3 flex flex-wrap align-middle">
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} handleClick={completeTodo} />
            ))}
        </div>
    )
}

export default TodoList
