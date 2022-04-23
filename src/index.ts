import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

type BloggerType = {
    id: number
    name: string
    youtubeUrl: string
}
type PostsType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}


const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5000

let bloggers: Array<BloggerType> = [
    {"id": 1, "name": "Nik", "youtubeUrl": "https://www.youtube.com/watch"},
    {"id": 2, "name": "Mike", "youtubeUrl": "https://www.youtube.com/watch"},

]

let posts: Array<PostsType> = [
    {
        "id": 1, "title": "cars", "shortDescription": "about Tesla and BMW", "content": "transport",
        "bloggerId": 1, "bloggerName": "Nik"
    },
    {
        "id": 2, "title": "euro", "shortDescription": "about euro ", "content": "finance",
        "bloggerId": 2, "bloggerName": "Mike"
    }
]


//////// BLOGGERS API

app.get('/bloggers', (req: Request, res: Response) => {
    if (bloggers)
        res.status(200).send(bloggers)
})

app.post('/bloggers', (req: Request, res: Response) => {

    const newBlogger = {
        id: +(new Date()),
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$');
    const check = regex.test(newBlogger.youtubeUrl)

    const isString = (typeof (req.body.name) !== typeof (5)) && (typeof (req.body.youtubeUrl) !== typeof (5))

    if (check && isString && newBlogger.name && req.body.name.trim().length > 0 && req.body.name.trim().length < 15
        && req.body.youtubeUrl.trim().length > 0 && req.body.youtubeUrl.trim().length < 100 && isString) {
        bloggers.push(newBlogger)
        res.status(201).send(newBlogger)
    }
    if (Object.keys(req.body).length === 0){
        res.send(400)
    }
    if (!isString) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Fields Title,ShortDescription and Content  should only have a string type",
            }],
            "resultCode": 1
        })
    }
    if (!check) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Youtube url is not correct",
            }],
            "resultCode": 1
        })
    }

    if (!check && !req.body.youtubeUrl.trim() || req.body.youtubeUrl.trim().length > 100 || !req.body.name.trim()
        || req.body.name.trim().length > 15) {
        let notifications = []

        req.body.name.trim().length < 1 ? notifications.push(`{"message": "The Title field is required.", 
        "field": "title"}`) : ''
        req.body.youtubeUrl.trim() < 1 ? notifications.push(`{"message": "The Title field is required.", 
        "field": "title"}`) : ''

        req.body.youtubeUrl.trim().length > 100 ? notifications.push(`{"message": "The field YoutubeUrl must be 
        a string or array type with a maximum length of '100'.",
            "field": "youtubeUrl" }`) : ''



        req.body.name.trim().length > 15 ? notifications.push(`{"message": "The field Name must be a string or array type with a maximum length of '15'.",
         "field": "name" }`) : ''
       !check ? notifications.push(`{"message": "The field YoutubeUrl must match the regular expression " +
                    "'^https://([a-zA-Z0-9_-]+\\\\.)+[a-zA-Z0-9_-]+(\\\\/[a-zA-Z0-9_-]+)*\\\\/?$'.",
                "field": "youtubeUrl" }`) : ''

        res.status(400).send(`{
            "data": {},
            "errorsMessages":[ ${notifications}],
            "resultCode": 1
        }`)
    }

})

app.get('/bloggers/:id', (req: Request, res: Response) => {
    const newBloggers = bloggers.find(v => v.id === +req.params.id)
    if (newBloggers) {
        res.status(200).send(newBloggers)
    } else {
        res.status(404).send({
            "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
            "title": "Not Found",
            "status": 404,
            "traceId": "00-feff32b848e50a6125ccd38588ad1f12-33c2ba9a5f344c12-00"
        })
    }

})

app.put('/bloggers/:id', (req: Request, res: Response) => {
    const needId = +req.params.id
    const needBlogger = bloggers.find((el) => el.id === needId)
    const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$');
    const check = regex.test(req.body.youtubeUrl)

    if (needBlogger && req.body.name.trim() && check) {
        needBlogger.name = req.body.name
        needBlogger.name = req.body.youtubeUrl
        res.status(204)
    }
    if (Object.keys(req.body).length === 0){
        res.send(400)
    }
    if (!needBlogger) {
        res.status(404).send({
            "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
            "title": "Not Found",
            "status": 404,
            "traceId": "00-37c92023a8765bdb56d379c1045529ef-8fc3f505b99db116-00"
        })
    }
    if (!req.body.name && !req.body.youtubeUrl) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "The Name field is required.",
                    "field": "name"
                },
                {
                    "message": "The YoutubeUrl field is required.",
                    "field": "youtubeUrl"
                }

            ],
            "resultCode": 1
        })
    }
    if (req.body.name && !req.body.youtubeUrl) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "The YoutubeUrl field is required.",
                    "field": "youtubeUrl"
                }

            ],
            "resultCode": 1
        })
    }
    if (!req.body.name && check) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "The Name field is required.",
                    "field": "name"
                }

            ],
            "resultCode": 1
        })
    }
    if (!req.body.name && !check) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "The Name field is required.",
                    "field": "name"
                },
                {
                    "message": "The field YoutubeUrl must match the regular expression " +
                        "'^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'.",
                    "field": "youtubeUrl"
                }

            ],
            "resultCode": 1
        })
    }
    if (req.body.name && !check) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "The field YoutubeUrl must match the regular expression " +
                        "'^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$'.",
                    "field": "youtubeUrl"
                }

            ],
            "resultCode": 1
        })
    }

})

app.delete('/bloggers/:id', (req: Request, res: Response) => {
    const needId = +req.params.id
    const needBlogger = bloggers.find((el) => el.id === needId)
    if (needBlogger) {
        bloggers = bloggers.filter((el) => el.id !== needId)
        res.send(204)
    }
    if (!needBlogger) {
        res.send(404)
    }

})


/////// POSTS API


app.get('/posts', (req: Request, res: Response) => {
    if (posts)
        res.status(200).send(posts)

})

app.post('/posts', (req: Request, res: Response) => {
    const needBloggerById = bloggers.find((el) => el.id === +req.body.bloggerId)
    let newPost = null
    const check = (typeof (req.body.title) !== typeof (5)) && (typeof (req.body.shortDescription) !== typeof (5))
        && (typeof (req.body.content) !== typeof (5))
    if (needBloggerById && check) {
        newPost = {
            id: +(new Date()),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: +req.body.bloggerId,
            bloggerName: needBloggerById.name
        }
    }
    if (newPost && check && req.body.title.trim().length < 30 && req.body.title.trim().length > 0
        && req.body.shortDescription.trim().length < 100 && req.body.shortDescription.trim().length > 0
        && req.body.content.trim().length < 1000 && req.body.content.trim().length > 0) {
        posts.push(newPost)
        res.status(201).send(newPost)
    }
    if (Object.keys(req.body).length === 0){
        res.send(400)
    }
    if (!needBloggerById) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "Invalid 'bloggerId': such blogger doesn't exist",
                    "field": "bloggerId"
                }
            ],
            "resultCode": 1
        })
    }
    if (!check) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Fields Title,ShortDescription and Content  should only have a string type",
            }],
            "resultCode": 1
        })
    }
    if (!req.body.title.trim() || !check || !req.body.shortDescription.trim() || !req.body.content.trim()
        || req.body.title.trim().length > 30 || req.body.shortDescription.trim().length > 100
        || req.body.content.trim().length > 1000) {

        let general = []
        !req.body.title.trim() ? general.push(`{"message": "The Title field is required.", 
        "field": "title"}`) : ''
        !req.body.shortDescription.trim() ? general.push(`{ "message": "The ShortDescription field is required.",
            "field": "shortDescription" }`) : ''
        !req.body.content.trim() ? general.push(`{ "message": "The Content field is required.",
            "field": "content"}`) : ''
        req.body.title.trim().length > 30 ? general.push(`{"message": "The field Title must be a string or array type 
        with a maximum length of '30'.",
            "field": "title" }`) : ''
        req.body.shortDescription.trim().length > 100 ? general.push(`{"message": "The ShortDescription Title must be a string or array type 
        with a maximum length of '100'.",
            "field": "shortDescription" }`) : ''
        req.body.content.trim().length > 1000 ? general.push(`{"message": "The Content Title must be a string or array type 
        with a maximum length of '1000'.",
            "field": "content" }`) : ''
        res.status(400).send(`{
            "data": {},
            "errorsMessages":[ ${general}],
            "resultCode": 1
        }`)
    }


})

app.get('/posts/:id', (req: Request, res: Response) => {

    const findPost = posts.find((el) => el.id === +req.params.id)
    if (findPost)
        res.status(200).send(findPost)
    else {
        res.status(404).send({
            "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
            "title": "Not Found",
            "status": 404,
            "traceId": "00-f45468eec40d1852a5a52c4a8b808d52-ea51fa0200654c1a-00"
        })

    }


})

app.put('/posts/:id', (req: Request, res: Response) => {

    let needBlogger = bloggers.find((el) => el.id === +req.body.bloggerId)
    let needPost = posts.find((el) => el.id === +req.params.id)
    const checked = (typeof (req.body.title) !== typeof (5)) && (typeof (req.body.shortDescription) !== typeof (5))
        && (typeof (req.body.content) !== typeof (5))
    if (needBlogger && needPost && checked && req.body.title.trim().length < 30 && req.body.title.trim().length > 0
        && req.body.shortDescription.trim().length < 100 && req.body.shortDescription.trim().length > 0
        && req.body.content.trim().length < 1000 && req.body.content.trim().length > 0) {

        needPost.title = req.body.title
        needPost.shortDescription = req.body.shortDescription
        needPost.content = req.body.content
        res.send(204)
    }
    if (!needPost) {
        res.status(404).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "post not found",
                    "field": "bloggerId"
                }
            ],
            "resultCode": 1
        })
    }
    if (Object.keys(req.body).length === 0){
        res.send(400)
    }
    if (Object.keys(req.body.bloggerId).length === 0){
        res.send(400)
    }
    if (!needBlogger) {
        res.status(404).send({
            "data": {},
            "errorsMessages": [
                {
                    "message": "Invalid 'bloggerId': such blogger doesn't exist",
                    "field": "bloggerId"
                }
            ],
            "resultCode": 1
        })
    }

    if (!checked) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Fields Title,ShortDescription and Content  should only have a string type",
            }],
            "resultCode": 1
        })
    }
    if (!req.body.title.trim() || !checked || !req.body.shortDescription.trim() || !req.body.content.trim()
        || req.body.title.trim().length > 30 || req.body.shortDescription.trim().length > 100
        || req.body.content.trim().length > 1000) {

        let all = []
        !req.body.title.trim() ? all.push(`{"message": "The Title field is required.", 
        "field": "title"}`) : ''
        !req.body.shortDescription.trim() ? all.push(`{ "message": "The ShortDescription field is required.",
            "field": "shortDescription" }`) : ''
        !req.body.content.trim() ? all.push(`{ "message": "The Content field is required.",
            "field": "content"}`) : ''
        req.body.trim().length > 30 ? all.push(`{"message": "The field Title must be a string or array type 
        with a maximum length of '30'.",
            "field": "title" }`) : ''
        req.body.shortDescription.trim().length > 100 ? all.push(`{"message": "The ShortDescription Title must be a string or array type 
        with a maximum length of '100'.",
            "field": "shortDescription" }`) : ''
        req.body.content.trim().length > 1000 ? all.push(`{"message": "The Content Title must be a string or array type 
        with a maximum length of '1000'.",
            "field": "content" }`) : ''
        res.status(400).send(`{
            "data": {},
            "errorsMessages":[ ${all}],
            "resultCode": 1
        }`)
    }


})

app.delete('/posts/:id', (req: Request, res: Response) => {

    const needPost = posts.find((el) => el.id === +req.params.id)
    if (needPost) {
        posts = posts.filter((el) => el.id !== +req.params.id)
        res.send(204)
    }
    if (!needPost) {
        res.send(404)
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})