import axios from 'axios'
import * as actions from './types'

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
        }).catch(e => dispatch(getTodosFailure(e)))
    }
}


function getTodos(todos) {
    return {
        type: actions.GET_TODOS,
        todos: todos,
    }
}

function getTodosFailure(e) {
    return {
        type: actions.GET_TODOS_FAILURE,
        error: e
    }
}

export function addTodo(todo) {
    return dispatch => {
        return axios.post(`${API_URL}/todos/`, todo).then(response => {
            todo = Object.assign(todo, {_id: response.insertedId})
            dispatch(addTodoSucess(todo))
        }).catch(e=>dispatch(addTodoFailure(e))) 
    }
}

function addTodoSucess(todo) {
    return {
        type: actions.ADD_TODO_SUCCESS,
        todo: todo
    }
}

function addTodoFailure(e) {
    return { type: actions.ADD_TODO_FAILURE, error: e}
}