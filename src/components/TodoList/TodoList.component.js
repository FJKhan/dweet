import React from "react";
import Todo from '../Todo/Todo.component'

class TodoList extends React.Component {
    state = {
        todos: [
            {
                id: 1,
                name: "finish this shit",
                due: new Date("2020-03-07"),
                completed: false
            },
            {
                id: 2,
                name: "finish this ugh",
                due: new Date("2020-03-08"),
                completed: false
            },
            {
                id: 3,
                name: "finish that shit",
                due: new Date("2020-03-09"),
                completed: false
            }
        ]
    };

    removeTodo = (id) => {
        const incomplete = this.state.todos.filter(todo => todo.id !== id);
        this.setState({todos: incomplete})
    }
    render() {
        return (
            <div className="w-1/3 flex flex-wrap align-middle">
                {this.state.todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        handleClick={this.removeTodo}
                    />
                ))}
            </div>
        )
    }
}

export default TodoList;
