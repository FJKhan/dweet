import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import App from '../../App'



const mockStore = configureStore([thunk]);
describe('App', () => {
  let store
  beforeEach(()=>{
    store = mockStore({
      newText:'',
      todos:[]
    })
  })
test('renders Dweet header', () => {
  const { getByText } = render( <Provider store={store}><App /></Provider>)
  const headerElement = getByText(/dweet/i)
expect(headerElement).toBeInTheDocument()
})
})

