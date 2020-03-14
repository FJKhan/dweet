import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'axios'
import { GET_TODOS, fetchTodos } from '../../actions/'

const mockStore = configureStore([thunk])
const mockResponse = {todos: [
        {
            _id: '5e66c8c77f23da61e22b3803',
            owner_id: '',
            name: 'Test item',
            due: '2020-03-07T00:00:00.000Z',
            completed: false,
        },
    ],
    page: 0,
    filters: {},
    entries_per_page: 10
}
 
describe('Todo Actions', () => {
    let store
    beforeEach(() => {
        store = mockStore()
    });
    it('creates GET_TODOS when fetchTodos is done', async () => {
        const expectedActions = [
            { type: GET_TODOS, todos: mockResponse.todos },
        ]
        mockAxios.get.mockResolvedValue({ data: mockResponse})
        await store.dispatch(fetchTodos())
        expect(store.getActions()).toEqual(expectedActions)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
    });
});