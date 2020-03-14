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
const API_URL='http://localhost:5000/api'
//fetches todos
export function fetchTodos() {
    return dispatch => {
        return axios.get(`${API_URL}/todos/`).then(response => {
            dispatch(getTodos(response.data.todos))
        })
    }
}

export const GET_TODOS = 'GET_TODOS'
export function getTodos(todos) {
    return {
        type: GET_TODOS,
        todos: todos,
    }
}
