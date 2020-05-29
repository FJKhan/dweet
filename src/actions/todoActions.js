import axios from 'axios'
import * as actions from './types'

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
}
const API_URL = process.env.REACT_APP_API_URL
//fetches todos
export function fetchTodos() {
    return dispatch => {
        return axios.get(`${API_URL}`).then(response => {
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
        return axios.post(`${API_URL}/add`, todo).then(response => {
            todo = Object.assign(todo, {_id: response.data.insertedId})
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

export function toggleTodo(todo) {
    const { _id, ...update } = todo
    return dispatch => {
        return axios.post(`${API_URL}/id/${_id}`, update)
            .then(response => dispatch(toggleTodoSuccess(todo)))
            .catch(e=> dispatch(toggleTodoFailure(e)))
    }
}

function toggleTodoSuccess(todo) {
    return {type: actions.TOGGLE_TODO_SUCCESS, todo:todo}
}

function toggleTodoFailure(e) {
    return { type: actions.TOGGLE_TODO_FAILURE, error: e }
}

export function deleteTodo(id) {
    return dispatch => {
        return axios.delete(`${API_URL}/id/${id}`)
            .then(response => dispatch(deleteTodoSuccess(id)))
        .catch(e=> dispatch(deleteTodoFailure(e)))
   }
}

function deleteTodoSuccess(id) {
    return {type:actions.DELETE_TODO_SUCCESS, todo:id}
}

function deleteTodoFailure(e) {
    return{type: actions.DELETE_TODO_FAILURE, error:e}
}