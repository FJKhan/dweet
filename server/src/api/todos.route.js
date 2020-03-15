import { Router } from 'express'
import TodosController from './todos.controller'
const router = new Router()

router.route('/').get(TodosController.apiGetTodos)
router.route('/').post(TodosController.apiAddTodo)
export default router