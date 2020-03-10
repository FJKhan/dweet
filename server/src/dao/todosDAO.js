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

    static async getTodos({
        filters = null, page = 0, todosPerPage = 10
    } = {}) {
        let query = {owner_id:''} 
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
}