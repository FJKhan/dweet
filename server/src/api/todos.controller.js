import TodosDAO from '../dao/todosDAO'
import {ObjectId }from 'bson'
export default class TodosController {
    static async apiGetTodos(req, res, next) {
        const TODOS_PER_PAGE = 10
        try {
            let query = req.params ? { _id: ObjectId(req.params.id) } : {}
            const { todosList } = await TodosDAO.getTodos({query: query})
            let response = {
                todos: todosList,
                page: 0,
                filters: {},
                entries_per_page: TODOS_PER_PAGE,
            }
            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static async apiGetTodoById(req, res, next) {
        try {
            let id = req.params.id || {}
            const todo = await TodosDAO.getTodoById(id)
            if (!todo) {
                res.status(404).json({ error: 'Not found' })
                return
            }
            res.json(todo)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }
    static async apiAddTodo(req, res) {
        try {
            const { insertedId } = await TodosDAO.addTodo(req.body)
            res.json({ insertedId: insertedId })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static async apiUpdateTodo(req, res) {
        try {
            console.log(req.params)
            console.log(req.body)
            const { id } = req.params
            const update = req.body
            console.log(id, update)
            const todo = await TodosDAO.updateTodo(id, update)
            res.json(todo)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }
}
