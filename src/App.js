import React from 'react'
import { connect } from 'react-redux'
import {addTodo, fetchTodos, toggleTodo, deleteTodo } from './actions'
import './App.css'
import TodoList from './components/TodoList/TodoList.component'
import TodoForm from './components/TodoForm/TodoForm.component'

export class App extends React.Component {
    state = {
        newText:''
    }
    componentDidMount() {
       this.props.dispatch(fetchTodos())
    }
  addTodo = e => {
      if (e.key === 'Enter' && this.state.newText.trim() !== '') {
          const todo = {
              name: this.state.newText,
              due: new Date(),
              completed: false
          }
          this.props.dispatch(addTodo(todo))
          this.setState({ newText: '' })
      }
    }
    toggleTodo = id => {
        this.props.todos.map(todo => {
            if (todo._id === id) {
                todo.completed = !todo.completed
               this.props.dispatch(toggleTodo(todo))
            }
            return null
        })
    }
    deleteTodo = id => {
        this.props.dispatch(deleteTodo(id))
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
                        {this.props.todos && <TodoList
                            todos={this.props.todos}
                            toggleTodo={this.toggleTodo}
                            deleteTodo={this.deleteTodo}
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
