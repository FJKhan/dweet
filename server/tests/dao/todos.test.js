import { MongoClient } from 'mongodb'

let client
describe('TodoDAO', () => {
    beforeAll(async () => {
        try {
            client = await global.todoClient
                .db(process.env.TODO_NS)
                .collection('todos')
        } catch (e) {
            console.error(`Unable to establish connection for todos: ${e}`)
        }
    })

    it('can insert a document into collection', async () => {
        let date = new Date()
        let todo = {
            name: 'Insert a document',
            due: date,
            owner_id:1
        }
        let result = await client.insertOne(todo)
        let { n, ok } = result.result
        expect({n, ok}).toEqual({n:1, ok:1})
        expect(result.insertedCount).toEqual(1)
        expect(result.insertedId).not.toBeUndefined()
        console.log(`Inserted id: ${result.insertedId}`)

        //find inserted document
        let insertedTodo = await client.findOne({ _id: result.insertedId })
        expect(insertedTodo).toEqual(todo)
    })
})
