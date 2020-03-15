import * as actions from '../actions/types'
export const defaultState = {
    todos: [],
    newText:''
}

const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actions.GET_TODOS: 
            return { ...state, todos: action.todos }
        case actions.ADD_TODO:
            return { todos:[...state.todos, action.todo]}
        default: return {...state}
    }
}

export default mainReducer 