import React from 'react'

const Todo = ({name, due, completed}) => {
    return (
        <div>
            <div>{due.toDateString()}</div>
            <div>{name}</div>
            <div><input type='checkbox' checked={completed}></input></div>
        </div>
    );
}

export default Todo