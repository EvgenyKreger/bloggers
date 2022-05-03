import {client} from "./db";

export type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
}
export let bloggers: Array<BloggerType> = [
    {"id": 1, "name": "Nik", "youtubeUrl": "https://www.youtube.com/watch"},
    {"id": 2, "name": "Mike", "youtubeUrl": "https://www.youtube.com/watch"},
]

export const bloggersRepository = {
   async getAllBloggers() :Promise<BloggerType[]> {
       return client.db("learnDB").collection<BloggerType>("bloggers").find().toArray()
    },


   async createNewBlogger(name:string,youtubeUrl:string):Promise<BloggerType>{
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
       await client.db("learnDB").collection<BloggerType>("bloggers").insertOne(newBlogger)
        return newBlogger
    },


   async getBloggerById(id:number):Promise<BloggerType | boolean>{
   const findNeedBlogger = await client.db("learnDB").collection<BloggerType>("bloggers").findOne({id:id})
        if(findNeedBlogger){
            return findNeedBlogger
        }else{
            return false
        }
    },


    async updateBlogger(id: number, name: string, youtubeUrl: string):Promise<boolean>  {
        const bloggerFindById = await client.db("learnDB").collection<BloggerType>("bloggers")
            .updateOne({id: id},{$set :{name : name, youtubeUrl : youtubeUrl }})
            return bloggerFindById.matchedCount === 1

    },


   async removeBlogger(id:number):Promise<boolean>{
        const result = await client.db("learnDB").collection<BloggerType>("bloggers").deleteOne({id:id})
            return result.deletedCount === 1
    }
}