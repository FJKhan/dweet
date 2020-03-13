import axios from 'axios'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_TODO_FILTER = 'SET_TODO_FILTER'
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
}

//fetches todos
export function fetchTodos () {
    return (dispatch) => {
        return axios.get(`http://localhost:5000/api/todos/`).then(response => {
            console.log(response.data)
            dispatch(getTodos(response.data.todos))
        })
    }
}

export const GET_TODOS = 'GET_TODOS'
export function getTodos(todos) {
    return {
        type: GET_TODOS,
        todos: todos
    }
}