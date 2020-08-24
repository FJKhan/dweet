import * as actions from '../actions/types'
import { TodosFilters } from '../actions/todoActions'
//default todo state
const todoState = {
    todos: [],
    error: null,
    filter: TodosFilters.SHOW_ALL
}

const todoReducer = (state = todoState, action) => {
    let index
    switch (action.type) {
        case actions.GET_TODOS_SUCCESS:
            return { ...state, todos: action.todos }
        case actions.GET_TODOS_FAILURE:
            return { ...state, error: action.error }
        case actions.ADD_TODO_SUCCESS:
            return { ...state, todos: [...state.todos, action.todo] }
        case actions.ADD_TODO_FAILURE:
            return { ...state, error: action.error }
        case actions.TOGGLE_TODO_SUCCESS:
            return {...state,  todos: state.todos.map(todo => {
                if(todo._id !== action.todo._id) {
                    return todo
                }
                return {...todo, ...action.todo}
            })}
        case actions.TOGGLE_TODO_FAILURE:
            return { ...state, error: action.error }
        case actions.DELETE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter((i) => i._id !== action.todo)
            }
        case actions.DELETE_TODO_FAILURE:
            return { ...state, error: action.error }
        case actions.SET_TODO_FILTER_SUCCESS:
            return { ...state, todos: action.todos, filter: action.filter }
        case actions.SET_TODO_FILTER_FAILURE:
            return { ...state, error: action.error }
        default:
            return { ...state }
    }
}
export default todoReducer
