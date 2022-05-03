
import {BloggerType} from "./bloggers_repository";

export type PostsType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}
export let bloggers: Array<BloggerType> = [
    {"id": 1, "name": "Nik", "youtubeUrl": "https://www.youtube.com/watch"},
    {"id": 2, "name": "Mike", "youtubeUrl": "https://www.youtube.com/watch"},
]


export let posts: Array<PostsType> = [
    {
        "id": 1, "title": "cars", "shortDescription": "about Tesla and BMW", "content": "transport",
        "bloggerId": 1, "bloggerName": "Nik"
    },
    {
        "id": 2, "title": "euro", "shortDescription": "about euro ", "content": "finance",
        "bloggerId": 2, "bloggerName": "Mike"
    }
]

export const postsRepository = {

   async getAllPosts() :Promise<PostsType[]> {
        return posts
    },

   async createPosts(bloggerId: number, title: string, shortDescription: string, content: string):Promise<PostsType | boolean> {
        const needBloggerById = bloggers.find((el: BloggerType) => el.id === bloggerId)
        if(!needBloggerById){
            return false
        } else{
            const newPost = {
                id: +(new Date()),
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                bloggerName: needBloggerById.name
            }
            posts.push(newPost)
            return newPost
        }
    },

    getPostById (id:number) {
      const findPost =  posts.find((el) => el.id === id)
        if(findPost){
            return findPost
        }else{
            return false
        }
    },

    updatePost(id: number, bloggerId: number, title: string, shortDescription: string, content: string) {
        const needBlogger = bloggers.find((el: any) => el.id === bloggerId)
        if(needBlogger){
            const needPost = posts.find((el) => el.id === id)
            if(needPost){
                needPost.title = title
                needPost.shortDescription = shortDescription
                needPost.content = content
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    },

    removePost (id:number){
        const needPost = posts.find((el) => el.id === id)
        if (needPost) {
            posts = posts.filter((el) => el.id !== id)
            return true
        } else{
            return false
        }
    }
}