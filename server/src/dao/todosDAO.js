let todos

// const DEFAULT_SORT=[['due', -1]]

export default class TodosDAO {
    static async injectDB(conn) {
        if (todos) return
        
        try { 
            todos = await conn.db(process.env.TODOS_NS).collection('todos')
        }
        catch (e) {
            console.error(`Unable to establish connection in todosDAO: ${e}`)
        }
    }

    static async addTodo(todo) {
        try{
            return await todos.insertOne(todo)
        }
        catch(err) {
            console.error(`Could not save todo: ${todo}. Error: ${err.stack}`)
        }
    }

    static async getTodos({
        query ={}, filters = null, page = 0, todosPerPage = 10
    } = {}) {
        let cursor
        try {
            cursor = await todos.find(query)
         }
        catch (e) {
            console.error(`error: ${e.stack}`)
            return { todosList: [] }
        }
        const displayCursor = cursor.skip(page * todosPerPage)
        .limit(todosPerPage)
        try {
            const todosList = await displayCursor.toArray()
            return {todosList}
        }
        catch(e) {
            console.error(`Unable to convert cursor to array: ${e}`)
            return { todosList: [] }
        }
    }

    static async deleteTodo(id) {
        try {
            return await todos.deleteOne({_id: id})
        } catch (err) {
            console.error(`error: ${err.stack}`)
            return { todosList: [] }
        }
    }
}