import * as actions from '../actions/types'
//default todo state
const todoState = { todos: []}
const todoReducer = (state = todoState, action) => {
       switch (action.type) {
           case actions.GET_TODOS:
               return { ...state, todos: action.todos }
           case actions.ADD_TODO_SUCCESS:
               return { todos: [...state.todos, action.todo] }
           default:
               return { ...state }
       }
}
export default todoReducer