import app from './server'
import {MongoClient} from 'mongodb'
import TodosDAO from './dao/todosDAO'


const port = process.env.PORT || 5000

MongoClient.connect(
    process.env.TODO_DB_URI,
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await TodosDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port: ${port}`)
        })
    })