import React from 'react'
import {connect} from 'react-redux'
import { toggleTodo, deleteTodo } from '../../actions'

const Todo = ({ todo, toggleTodo, deleteTodo }) => {
    const handleClick = (todo) => {
        todo.completed = !todo.completed
        toggleTodo(todo)
    }
    return (
        <div className="todo h-10 w-full rounded border-b border-gray-100 flex items-center select-none hover:bg-gray-200">
            <div className="w-4/5 p-2" onClick={() => handleClick(todo)}>
                <span
                    className={
                        todo.completed
                            ? `todo-text line-through text-mint`
                            : `todo-text`
                    }>
                    <span className={todo.completed ? `text-cool-gray` : ``}>
                        {todo.name}
                    </span>
                </span>
            </div>
            <div
                className="delete-icon w-1/5 px-2 text-cool-gray hover:text-red-500"
                onClick={() => deleteTodo(todo._id)}>
                <span
                    className="iconify float-right text-current"
                    data-icon="fa-solid:trash"
                    data-inline="true"></span>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    toggleTodo: (todo) => dispatch(toggleTodo(todo)),
    deleteTodo: (id) => dispatch(deleteTodo(id))
})
export default connect(null, mapDispatchToProps)(Todo)
