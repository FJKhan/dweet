import React from 'react'
import { connect } from 'react-redux'
import {addTodo, fetchTodos } from './actions'
import './App.css'
import TodoList from './components/TodoList/TodoList.component'
import TodoForm from './components/TodoForm/TodoForm.component'

export class App extends React.Component {
    componentDidMount() {
       this.props.dispatch(fetchTodos())
    }
  addTodo = e => {
      if (e.key === 'Enter') {
          const todo = {
              name: this.state.newText,
              due: new Date(),
              completed: false
          }
          this.props.dispatch(addTodo(todo))
          this.setState({ newText: '' })
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
                            value={this.props.newText}
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        {this.props.todos && <TodoList
                            todos={this.props.todos}
                            completeTodo={this.completeTodo}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}
export default connect(mapStateToProps)(App)
