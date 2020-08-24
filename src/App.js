import React from 'react'
import { connect } from 'react-redux'
import { addTodo, fetchTodos, TodosFilters } from './actions'
import './App.css'
import TodoList from './components/TodoList/TodoList.component'
import TodoForm from './components/TodoForm/TodoForm.component'
import FilterButton from './components/FilterButton/FilterButton.component'

export class App extends React.Component {
    state = {
        newText: ''
    }
    handleAddTodo = (e) => {
        if (e.key === 'Enter' && this.state.newText.trim() !== '') {
            const todo = {
                name: this.state.newText,
                due: new Date(),
                completed: false
            }
            this.props.addTodo(todo)
            this.setState({ newText: '' })
        }
    }
    handleInputChange = (e) => {
        const text = e.target.value
        this.setState({ newText: text })
    }
    componentDidMount () {
        this.props.fetchTodos()
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
                            handleKeyPress={this.handleAddTodo}
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
                        <TodoList />
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

const mapStateToProps = ({ error }) => ({
    error: error
})
const mapDispatchToProps = (dispatch) => ({
    addTodo: (todo) => dispatch(addTodo(todo)),
    fetchTodos: () => dispatch(fetchTodos())
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
