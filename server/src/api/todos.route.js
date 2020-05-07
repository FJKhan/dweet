import { Router } from 'express'
import TodosController from './todos.controller'
const router = new Router()

router.route('/').get(TodosController.apiGetTodos)
router.route('/id/:id').get(TodosController.apiGetTodos)
router.route('/').post(TodosController.apiAddTodo)
router.route('/id/:id').post(TodosController.apiUpdateTodo)
export default router