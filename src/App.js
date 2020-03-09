import React from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList.component'
import TodoForm from './components/TodoForm/TodoForm.component'

class App extends React.Component {
    state = {
        newText: '',
        todos: [
            {
                id: 1,
                name: 'finish this shit',
                due: new Date('2020-03-07'),
                completed: false,
            },
            {
                id: 2,
                name: 'finish this ugh',
                due: new Date('2020-03-08'),
                completed: false,
            },
            {
                id: 3,
                name: 'finish that shit',
                due: new Date('2020-03-09'),
                completed: false,
            },
        ],
    }
  addTodo = e => {
      if (e.key === 'Enter') {
          const todo = {
              id: this.state.todos.length + 1,
              name: this.state.newText,
              due: new Date(),
              completed: false,
          }
          this.setState(prevState => {
              return { todos: [...prevState.todos, todo], newText:'' }
          })
      }
    }
    completeTodo = id => {
        const todos = this.state.todos.map(todo => {
            if (todo.id === id) todo.completed = !todo.completed
            return todo
        })
        this.setState({ todos: todos })
    }
    handleInputChange = e => {
        const text = e.target.value
        this.setState({ newText: text })
    }
    render() {
        return (
            <div>
                <header className="h-16 bg-lilac text-white text-4xl flex justify-center items-center">
                    <div>Dweet</div>
                </header>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full mt-4 mb-8 flex justify-center">
                        <TodoForm
                            handleKeyPress={this.addTodo}
                            handleInputChange={this.handleInputChange}
                            value={this.state.newText}
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <TodoList
                            todos={this.state.todos}
                            completeTodo={this.completeTodo}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
