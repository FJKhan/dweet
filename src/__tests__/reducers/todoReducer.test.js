import * as actions from '../../actions/types'
import todoReducer from '../../reducers/todoReducer'
const todoState = { todos: [], error:null}
const todo = {
    _id:'5422d',
    name: 'Add test item',
    due: '2020-03-07T00:00:00.000Z',
    completed: false,
}
describe('todo reducer', () => {
    it('should return initial state', () => {
        expect(todoReducer(undefined, {})).toEqual(todoState)
    })
    
    it('should handle GET_TODOS_FAILURE', ()=>{
        const error = `Could not get todos`
        const action= { type: actions.GET_TODOS_FAILURE, error: error}
        expect(todoReducer(todoState, action)).toEqual(Object.assign({}, todoState, {error: action.error}))
    })

    it('should handle GET_TODOS', () => {
        expect(
            todoReducer(todoState, { type: actions.GET_TODOS, todos: [todo] })
        ).toEqual({ todos: [todo], error:null})
    })
    
    it('should handle ADD_TODO_FAILURE', ()=>{
        const error = `Unable to add todo: ${todo.toString()}`
        const action = {type: actions.ADD_TODO_FAILURE, error: error}
        expect(todoReducer(todoState, action)).toEqual(Object.assign({}, todoState, {error: error}))
    })

    it('should handle ADD_TODO_SUCCESS', () => {
        const action = {type: actions.ADD_TODO_SUCCESS, todo: todo}
        expect(todoReducer(todoState, action)).toEqual({todos:[todo], error: null})
    })

    it('should handle TOGGLE_TODO_FAILURE', () => {
        const error = `Could not toggle todo: ${todo.toString()}`
        const action = {type: actions.TOGGLE_TODO_FAILURE, error: error}
        expect(todoReducer({todos:[todo], error: null}, action)).toEqual({todos:[todo], error: error})
    })

    it('should handle TOGGLE_TODO_SUCCESS', () => {
        const updatedTodo = Object.assign(todo, {completed:true})
        const action = { type: actions.TOGGLE_TODO_SUCCESS, todo: updatedTodo }
        expect(todoReducer(todoState, action)).toEqual({todos:[updatedTodo], error: null})
    })
    
    it('should handle DELETE_TODO_FAILURE',()=> {
        const error = `Could not delete todo: ${todo.toString()}`
        const action = { type: actions.DELETE_TODO_FAILURE, error:error }
        expect(todoReducer({todos: [todo], error: null}, action)).toEqual({todos:[todo], error: error})
    })

    it('should handle DELETE_TODO_SUCCESS', () => {
        const action = { type: actions.DELETE_TODO_SUCCESS, todo: todo._id }
        expect(todoReducer(todoState, action)).toEqual({ todos: [] , error: null})
    })
});