import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'axios'
import * as actions from '../../actions/types'
import {
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    setTodosFilter,
    TodosFilters
} from '../../actions/'

const mockStore = configureStore([thunk])
const mockResponse = {todos: [
        {
            _id: '5e66c8c77f23da61e22b3803',
            owner_id: 1,
            name: 'Test item',
            due: '2020-03-07T00:00:00.000Z',
            completed: false
        },
    ],
    page: 0,
    filters: {},
    entries_per_page: 10
}
const todo = {
    owner_id: 1,
    name: 'Test item',
    due: new Date(),
    completed: false
}
const id = '5422d'
const savedTodo = Object.assign(todo, {_id: id })
const updatedTodo = Object.assign(savedTodo, { completed: true })
const todos = [
    {
      "_id": "5ee9140c0aaf450b315be0b6",
      "name": "Insert a document",
      "due": "2020-06-01T00:00:00.000Z",
      "owner_id": 1,
      "completed": false
    },
    {
      "_id": "5ee9141b0aaf450b315be0b7",
      "name": "Insert another document",
      "due": "2020-06-01T00:00:00.000Z",
      "owner_id": 1,
      "completed": true
    }
  ]
const error = new Error('error')
 
describe('Todo Actions', () => {
    let store
    beforeEach(() => {
        store = mockStore()
    })

    afterEach(() => {
        mockAxios.mockReset()
    })

    it('creates GET_TODOS when fetchTodos returns sucessfully', async () => {
        const expectedAction = [{ type: actions.GET_TODOS_SUCCESS, todos: mockResponse.todos }]
        mockAxios.get.mockResolvedValueOnce({ data: mockResponse })
        await store.dispatch(fetchTodos())
        expect(store.getActions()).toEqual(expectedAction)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    })

    it('creates GET_TODOS_FAILURE when fetch fails', async () => {
        const expectedAction = [{ type: actions.GET_TODOS_FAILURE, error:error }]
        mockAxios.get.mockRejectedValueOnce(error)
        await store.dispatch(fetchTodos())
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates ADD_TODO_SUCCESS when addTodo is sucessful', async () => { 
        const expectedAction = [{ type: actions.ADD_TODO_SUCCESS, todo: savedTodo}]
        mockAxios.post.mockResolvedValueOnce({data: {insertedId: id}})
        await store.dispatch(addTodo(todo))
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates ADD_TODO_FAILURE when addTodo fails', async () => {
        const expectedAction = [{ type: actions.ADD_TODO_FAILURE, error: error }]
        mockAxios.post.mockRejectedValueOnce(error)
        await store.dispatch(addTodo(todo))
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates TOGGLE_TODO_SUCCESS when toggleTodo is sucessful', async () => {
        const expectedAction = [
            { type: actions.TOGGLE_TODO_SUCCESS, todo: updatedTodo },
        ]
        mockAxios.post.mockResolvedValueOnce({data: {n: 1, ok:1}})
        await store.dispatch(toggleTodo(todo))
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates TOGGLE_TODO_FAILURE when addTodo fails', async () => {
        const expectedAction = [
            { type: actions.TOGGLE_TODO_FAILURE, error: error },
        ]
        mockAxios.post.mockRejectedValueOnce(error)
        await store.dispatch(toggleTodo(updatedTodo))
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates DELETE_TODO_SUCCESS when deleteTodo is successful', async () => {
        const expectedAction = [{ type: actions.DELETE_TODO_SUCCESS, todo: savedTodo._id }]
        mockAxios.delete.mockResolvedValueOnce({ data: { n: 1, ok: 1 } })
        await store.dispatch(deleteTodo(todo._id))
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates DELETE_TODO_FAILURE when deleteTodo fails',async () =>{
        const expectedAction = [{type: actions.DELETE_TODO_FAILURE, error: error}]
        mockAxios.delete.mockRejectedValueOnce(error)
        await store.dispatch(deleteTodo(todo._id))
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates SET_TODO_FILTER when setTodosFilter is successful', async()=>{
        const expectedAction=[{type: actions.SET_TODO_FILTER_SUCCESS, todos: mockResponse.todos, filter: TodosFilters.SHOW_ALL}]
        mockAxios.post.mockResolvedValueOnce({ data: mockResponse })
        await store.dispatch(setTodosFilter(TodosFilters.SHOW_ALL))
        expect(store.getActions()).toEqual(expectedAction)
    })

    it('creates SET_TODO_FAILURE whent setTodosFilter fails', async()=>{
        const expectedAction=[{type: actions.SET_TODO_FILTER_FAILURE, error:error}]
        mockAxios.post.mockRejectedValueOnce(error)
        await store.dispatch(setTodosFilter(TodosFilters.SHOW_COMPLETED))
        expect(store.getActions()).toEqual(expectedAction)
    })
    
});