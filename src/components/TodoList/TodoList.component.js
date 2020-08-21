import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Todo from '../Todo/Todo.component'

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <div className="todo-list w-1/3 flex flex-wrap align-middle mt-10">
            {todos &&
                todos.map((todo) => (
                    <Todo key={todo._id} todo={todo} handleClick={toggleTodo} deleteTodo={deleteTodo}/>
                ))}
        </div>
    )
}
TodoList.propTypes = {
    toggleTodo: PropTypes.func.isRequired,
    todos: PropTypes.array
}
const mapStateToProps = ({todos} )=>({
    todos
})
export default connect(mapStateToProps)(TodoList)
