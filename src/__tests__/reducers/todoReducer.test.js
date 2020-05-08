import * as actions from '../../actions/types'
import todoReducer from '../../reducers/todoReducer'
const todoState = { todos: []}
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
    
    it('should handle GET_TODOS', () => {
        expect(
            todoReducer(todoState, { type: actions.GET_TODOS, todos: [todo] })
        ).toEqual({ todos: [todo]})
    })
    
    it('should handle ADD_TODO_SUCCESS', () => {
        const action = {type: actions.ADD_TODO_SUCCESS, todo: todo}
        expect(todoReducer(todoState, action)).toEqual({todos:[todo]})
    });
    it('should handle TOGGLE_TODO_SUCCESS', () => {
        const updatedTodo = Object.assign(todo, {completed:true})
        const action = { type: actions.TOGGLE_TODO_SUCCESS, todo: updatedTodo }
        expect(todoReducer(todoState, action)).toEqual({todos:[updatedTodo]})
    })
});