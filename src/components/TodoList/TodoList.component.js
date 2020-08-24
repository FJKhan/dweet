import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Todo from '../Todo/Todo.component'

const TodoList = ({todos}) => {

        return todos ? (
        <div className="todo-list w-1/3 flex flex-wrap align-middle mt-10">
            {todos.map((todo) => (
                <Todo
                    key={todo._id}
                    todo={todo}
                />
            ))}
        </div>
    ) : null
}
TodoList.propTypes = {
    todos: PropTypes.array
}
const mapStateToProps = ({ todos }) => ({
    todos
})

export default connect(mapStateToProps)(TodoList)
