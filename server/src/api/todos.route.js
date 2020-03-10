import { Router } from 'express'
import TodosController from './todos.controller'
const router = new Router()

router.route('/').get(TodosController.apiGetTodos)

export default router