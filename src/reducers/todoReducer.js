import * as actions from '../actions/types'
//default todo state
const todoState = { todos: [] }
const todoReducer = (state = todoState, action) => {
    switch (action.type) {
        case actions.GET_TODOS:
            return { ...state, todos: action.todos }
        case actions.ADD_TODO_SUCCESS:
            return { todos: [...state.todos, action.todo] }
        case actions.TOGGLE_TODO_SUCCESS:
            let newTodos = state.todos
            let index = newTodos.findIndex(i => i._id === action.todo._id)
            newTodos.splice(index, 1, action.todo)
            return { todos: [...newTodos] }
        default:
            return { ...state }
    }
}
export default todoReducer
