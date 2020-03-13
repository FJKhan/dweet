import {GET_TODOS} from '../actions'
export const defaultState = {
    todos: [],
    newText:''
}

const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_TODOS: 
            return { ...state, todos: action.todos }
        default: return {...state}
    }
}

export default mainReducer 