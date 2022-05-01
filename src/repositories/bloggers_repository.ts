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
    getAllBloggers() {
       return bloggers
    },
    createNewBlogger(name:string,youtubeUrl:string){
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    getBloggerById(id:number){
     const findNeedBlogger = bloggers.find(el => el.id === id)
        if(findNeedBlogger){
            return findNeedBlogger
        }else{
            return false
        }
    },
    updateBlogger(id:number, name:string,youtubeUrl:string) {
        const bloggerFindById = bloggers.find((el) => el.id === id)
        if (bloggerFindById) {
            bloggerFindById.name = name
            bloggerFindById.youtubeUrl = youtubeUrl
            return true
        }else{
            return false
        }
    },
    removeBlogger(id:number){
        const needBlogger = bloggers.find((el) => el.id === id)
        if (needBlogger) {
            bloggers = bloggers.filter((el) => el.id !== id)
            return true
        }else{
            return false
        }
    }
}