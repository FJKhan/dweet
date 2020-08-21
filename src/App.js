import React from 'react'
import { connect } from 'react-redux'
import {
    addTodo,
    fetchTodos,
    toggleTodo,
    deleteTodo,
    setTodosFilter,
    TodosFilters
} from './actions'
import './App.css'
import TodoList from './components/TodoList/TodoList.component'
import TodoForm from './components/TodoForm/TodoForm.component'
import FilterButton from './components/FilterButton/FilterButton.component'

export class App extends React.Component {
    state = {
        newText: ''
    }
    componentDidMount() {
        this.props.dispatch(fetchTodos())
    }
    addTodo = (e) => {
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
    toggleTodo = (id) => {
        this.props.todos.map((todo) => {
            if (todo._id === id) {
                todo.completed = !todo.completed
                this.props.dispatch(toggleTodo(todo))
            }
            return null
        })
    }
    deleteTodo = (id) => {
        this.props.dispatch(deleteTodo(id))
    }
    handleInputChange = (e) => {
        const text = e.target.value
        this.setState({ newText: text })
    }
    handleFilterChange = (filter) => {
        const filterQuery = this.setFilter(filter)
        this.props.dispatch(setTodosFilter(filter, filterQuery))
    }
    setFilter = (filter) => {
        switch (filter) {
            case TodosFilters.SHOW_COMPLETED:
                return { completed: true }
            case TodosFilters.SHOW_ACTIVE:
                return { completed: false }
            default:
                return
        }
    }
    render() {
        return (
            <div className="h-screen">
                <header className="h-16 bg-lilac text-white text-4xl flex justify-center items-center">
                    <div>Dweet</div>
                </header>
                <div className="flex flex-wrap justify-center pt-10">
                    <div className="w-full mt-4 mb-8 flex justify-center">
                        <TodoForm
                            handleKeyPress={this.addTodo}
                            handleInputChange={this.handleInputChange}
                            value={this.state.newText}
                        />
                    </div>
                    <div className="w-1/3 flex align-middle items-center px-2 py-4">
                        <FilterButton
                            filter={TodosFilters.SHOW_ALL}
                            text="All"
                        />
                        <FilterButton
                            filter={TodosFilters.SHOW_ACTIVE}
                            text="Active"
                        />
                        <FilterButton
                            filter={TodosFilters.SHOW_COMPLETED}
                            text="Completed"
                        />
                    </div>
                    <div className="w-full flex justify-center">
                            <TodoList
                                toggleTodo={this.toggleTodo}
                                deleteTodo={this.deleteTodo}
                            />
                    </div>
                </div>
                {this.props.error && (
                    <div className="w-full flex justify-center items-center fixed bottom-0">
                        <div className="error w-1/3 p-2 mb-4 rounded-sm border border-red-400 bg-red-200 text-red-600">
                            <span>
                                {this.props.error.toString() ||
                                    'Error occurred'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({error, filter}) => ({
    error: error,
    filter: filter
})
export default connect(mapStateToProps)(App)
