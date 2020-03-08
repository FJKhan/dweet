import React from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList.component'

function App() {
  return (
    <div>
      <header>
        Dweet
      </header>
      <div className='container'>
        <TodoList/>
      </div>
    </div>
  );
}

export default App;
