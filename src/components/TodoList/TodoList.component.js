import React from 'react'
import PropTypes from 'prop-types'
import Todo from '../Todo/Todo.component'

const TodoList = ({ todos, completeTodo }) => {
    return (
        <div className="w-1/3 flex flex-wrap align-middle">
            {todos && todos.map(todo => (
                <Todo key={todo._id} todo={todo} handleClick={completeTodo} />
            ))}
        </div>
    )
}
TodoList.propTypes = {
    completeTodo: PropTypes.func.isRequired,
    todos: PropTypes.array
}
export default TodoList
