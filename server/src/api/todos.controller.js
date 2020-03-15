import TodosDAO from '../dao/todosDAO'

export default class TodosController {
    static async apiGetTodos(req, res, next) {
        const TODOS_PER_PAGE = 10
        try {
            const {todosList} = await TodosDAO.getTodos()
        let response = {
            todos: todosList,
            page: 0,
            filters: {},
            entries_per_page: TODOS_PER_PAGE
        }
            res.json(response)
        } catch (e) {
            res.status(500).json({ e })
        }
    }

    static async apiAddTodo(req, res) {
        try {
            const { insertedId } = await TodosDAO.addTodo(req.body)
            res.json({insertedId: insertedId})
        } catch (e) {
            res.status(500).json({ e })
       }
    }
}
