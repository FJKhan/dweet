import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'axios'
import * as actions from '../../actions/types'
import {
    fetchTodos,
    addTodo,
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
const error = new Error('error')
 
describe('Todo Actions', () => {
    let store
    beforeEach(() => {
        store = mockStore()
    })

    afterEach(() => {
        mockAxios.mockReset()
    });
    it('creates GET_TODOS when fetchTodos returns sucessfully', async () => {
        const expectedAction = [{ type: actions.GET_TODOS, todos: mockResponse.todos }]
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
        const id = '5422d'
        const savedTodo = {...todo, _id: id}
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


    
});