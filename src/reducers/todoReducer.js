import * as actions from '../actions/types'
//default todo state
const todoState = { todos: [] }

const todoReducer = (state = todoState, action) => {
    let index
    switch (action.type) {
        case actions.GET_TODOS:
            return { ...state, todos: action.todos }
        case actions.ADD_TODO_SUCCESS:
            return { todos: [...state.todos, action.todo] }
        case actions.TOGGLE_TODO_SUCCESS:
            let newTodos = state.todos
            index = newTodos.findIndex(i => i._id === action.todo._id)
            newTodos.splice(index, 1, action.todo)
            return { todos: [...newTodos] }
        case actions.DELETE_TODO_SUCCESS:
            index = state.todos.findIndex(i => i._id === action.todo)
            return { todos:[...state.todos.slice(0, index), ...state.todos.slice(index+1)]}
        default:
            return { ...state }
    }
}
export default todoReducer
