import TodosDAO from '../dao/todosDAO'

export default class TodosController {
    static async apiGetTodos(req, res, next) {
        const TODOS_PER_PAGE = 10
        const { todosList } = await TodosDAO.getTodos()
        let response = {
            todos: todosList,
            page: 0,
            filters: {},
            entries_per_page: TODOS_PER_PAGE
        }
        res.json(response)
    }
}
