import express from 'express'
import cors from 'cors'
import todos from './api/todos.route'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/todos', todos)
app.use('*', (req, res) =>
    res.status(404).json({ error: 'Invalid request. Resource not found.' })
)

export default app
