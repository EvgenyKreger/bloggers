import {MongoClient} from "mongodb";


const mongoUri = process.env.mongoURI || 'mongodb+srv://KEA:%23%2E8M%24T5crMKABnQ@kea-cluster.ayru5.mongodb.net/MyFirstProject?retryWrites=true&w=majority'

export const client = new MongoClient(mongoUri)

export async function runDb(){
    try {
        await client.connect();
        await client.db('learnDB').command({ping:1})
        console.log('Connected successful to mongo server')
    }catch{
        console.log('Can not connect DB')
         await client.close()
    }
}