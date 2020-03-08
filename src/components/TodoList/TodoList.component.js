import React from "react";
import Todo from '../Todo/Todo.component'

class TodoList extends React.Component {
    state = {
        tasks: [
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

    render() {
        return (
            <div>
                {this.state.tasks.map(({id, ...task})=> <Todo key={id} {...task}/>)}
            </div>
        );
    }
}

export default TodoList;
