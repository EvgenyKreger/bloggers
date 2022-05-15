import {MongoClient} from "mongodb";


const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017/'

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
