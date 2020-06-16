import * as actions from '../actions/types'
//default todo state
const todoState = {
    todos: [],
    error: null
}

const todoReducer = (state = todoState, action) => {
    let index
    switch (action.type) {
        case actions.GET_TODOS_SUCCESS:
            return { ...state, todos: action.todos }
        case actions.GET_TODOS_FAILURE:
            return Object.assign({}, state, {error: action.error})
        case actions.ADD_TODO_SUCCESS:
            return Object.assign({}, state, {
                todos: [...state.todos, action.todo]
            })
        case actions.ADD_TODO_FAILURE:
            return Object.assign({}, state, { error: action.error })
        case actions.TOGGLE_TODO_SUCCESS:
            let newTodos = state.todos
            index = newTodos.findIndex((i) => i._id === action.todo._id)
            newTodos.splice(index, 1, action.todo)
            return Object.assign({}, state, { todos: [...newTodos] })
        case actions.TOGGLE_TODO_FAILURE:
            return Object.assign({}, state, { error: action.error })
        case actions.DELETE_TODO_SUCCESS:
            index = state.todos.findIndex((i) => i._id === action.todo)
            return Object.assign(state, {
                todos: [
                    ...state.todos.slice(0, index),
                    ...state.todos.slice(index + 1)
                ]
            })
        case actions.DELETE_TODO_FAILURE:
            return Object.assign(state, { error: action.error })
        default:
            return { ...state }
    }
}
export default todoReducer
