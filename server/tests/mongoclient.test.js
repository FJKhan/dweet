import {MongoClient} from 'mongodb'

describe('MongoClient', async() => {
    test('Client initialized with URI', async () =>{
        let testClient 
       try { testClient = await MongoClient.connect(process.env.TODO_DB_URI, {
                 useNewUrlParser: true,
                 useUnifiedTopology: true
             })
        expect(testClient).not.toBeNull()

        //get client options
        const clientOptions = testClient.s.options
        expect(clientOptions).not.toBeUndefined()

        //expect connection to be SSL enabled
        if(typeof clientOptions.ssl !== 'undefined') {
            expect(clientOptions).toHaveProperty('ssl')
            expect(clientOptions.ssl).toBe(true)
        }

        //expect user to auth against admin db
        expect(clientOptions).toHaveProperty('authSource')
        expect(clientOptions.authSource).toBe('admin')
    } catch(e) {
        expect(e).toBeNull()
    } finally{
        if (testClient) testClient.close()
    }
    })

    test('Client initializes with URI and options', async () => {
        let testClient 
        try {
            testClient = await MongoClient.connect(process.env.TODO_DB_URI, {
                useNewUrlParser: true,
                connectTimeoutMS: 200,
                retryWrites: true,
                useUnifiedTopology: true,
            })
            //get client options
            const clientOptions = testClient.s.options
            expect(clientOptions.connectTimeoutMS).toBe(200)
            expect(clientOptions.useNewUrlParser).toBe(true)
            expect(clientOptions.retryWrites).toBe(true)
        } catch (e) {
            expect(e).toBeNull()
        }finally {
            if (testClient)testClient.close()
        }
    })

    
    test('database handle is created from mongoclient', async() => {
        let testClient
        try {
            testClient = await MongoClient.connect(process.env.TODO_DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            const todoDB = testClient.db(process.env.TODOS_NS)
            const collections = await todoDB.listCollections().toArray()
            const collectionNames = collections.map(col => col.name)
            const expectedCollectionNames = ['todos']
            expectedCollectionNames.map(col =>
                expect(collectionNames).toContain(col))
        } catch (e) {
            expect(e).toBeNull()
        } finally {
            if (testClient) testClient.close()
        }
    })
    
})