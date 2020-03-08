import React from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList.component'
import TodoForm from './components/TodoForm/TodoForm.component'

function App() {
    return (
        <div>
            <header className="h-16 bg-lilac text-white text-4xl flex justify-center items-center">
                <div>Dweet</div>
            </header>
            <div className="flex flex-wrap justify-center">
                <div className="w-full mt-4 mb-8 flex justify-center">
                    <TodoForm />
                </div>
                <div className="w-full flex justify-center">
                    <TodoList />
                </div>
            </div>
        </div>
    )
}

export default App
