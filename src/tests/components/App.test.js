import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'axios'
import App from '../../App'
import { fetchTodos } from '../../actions'

const mockStore = configureStore([thunk]);
const mockResponse = {
    todos: [
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
    entries_per_page: 10,
}
describe('App', () => {
  let store
  beforeEach(()=>{
    store = mockStore({
      newText:'',
      todos:[]
    })
  })
  test('renders Dweet header', async () => {
    mockAxios.get.mockResolvedValue({data:mockResponse})
  await store.dispatch(fetchTodos())
  const { getByText } = render( <Provider store={store}><App /></Provider>)
  const headerElement = getByText(/dweet/i)
expect(headerElement).toBeInTheDocument()
})
})

