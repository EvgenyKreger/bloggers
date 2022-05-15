import {MongoClient} from "mongodb";


const mongoUri = process.env.mongoURI || "http://localhost:5001"

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
