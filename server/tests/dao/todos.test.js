import { ObjectId } from 'bson'
import TodosDAO from '../../src/dao/todosDAO'


const todo = {
    name: 'Insert a document',
    due: new Date(),
    owner_id: 1,
    completed: false
}
let insertedId
describe('TodoDAO', () => {
    beforeAll(async () => {
        try {
            await TodosDAO.injectDB(global.todoClient)
        } catch (e) {
            console.error(`Unable to establish connection for todos: ${e}`)
        }
    })

    afterAll(async () => {
        const collection = await global.todoClient
            .db(process.env.TODOS_NS).collection('todos')
        await collection.deleteMany({owner_id: 1})
    })

    it('can insert a document into collection', async () => {
        let result = await TodosDAO.addTodo(todo)
        let { n, ok } = result.result
        expect({n, ok}).toEqual({n:1, ok:1})
        expect(result.insertedCount).toEqual(1)
        expect(result.insertedId).not.toBeUndefined()
        console.log(`Inserted id: ${result.insertedId}`)
        insertedId = result.insertedId
    })

    it('can find a document in a collection', async () => {
        let result = await (await TodosDAO.getTodos({ query:{ _id:insertedId }})).todosList
        expect(result).not.toBeNull()
        expect(result[0].name).toEqual(todo.name)
        expect(result[0].owner_id).toEqual(todo.owner_id)
        expect(result[0].completed).toEqual(false)
    })


    it('can update a document in the collection', async () => {
        const update = { "completed": true }
        let result = await TodosDAO.updateTodo(insertedId, update)
        let resultTodo = await await TodosDAO.getTodoById(insertedId)
        const updatedTodo = Object.assign(resultTodo, update)
        let { n, ok } = result.result
        let {modifiedCount, matchedCount} = result
        expect({ n, ok , modifiedCount, matchedCount}).toEqual({ n: 1, ok: 1, modifiedCount:1, matchedCount:1 })
        expect(resultTodo).toBe(updatedTodo)
    })

    it('can delete a document in the collection', async () => {
        let result = await TodosDAO.deleteTodo(ObjectId(insertedId))
        let { n, ok } = result.result
        expect({ n, ok }).toEqual({ n: 1, ok: 1 })
        expect(result.deletedCount).toEqual(1)
    })
})
