import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
app.use(cors())

const port = process.env.PORT || 5000

let bloggers = [
    {"id": 1, "name": "Nik", "youtubeUrl": "https://www.youtube.com/watch"},
    {"id": 2, "name": "Mike", "youtubeUrl": "https://www.youtube.com/watch"},
]

let posts = [
    {
        "id": 1, "title": "cars", "shortDescription": "about Tesla and BMW", "content": "transport",
        "bloggerId": 1, "bloggerName": "Nik"
    },
    {
        "id": 2, "title": "euro", "shortDescription": "about euro ", "content": "finance",
        "bloggerId": 2, "bloggerName": "Mike"
    }
]
app.use(bodyParser.json())

//////// BLOGGERS API

app.get('/bloggers', (req: Request, res: Response) => {
    if (bloggers)
        res.status(200).send(bloggers)
})

app.post('/bloggers', (req: Request, res: Response) => {
    const newBlogger = {
        id: +(new Date()),
        name: req.body.name.trim(),
        youtubeUrl: req.body.youtubeUrl.trim()
    }
    const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$');
    const check = regex.test(newBlogger.youtubeUrl)

    if (check && newBlogger.name) {
        bloggers.push(newBlogger)
        res.status(201).send(newBlogger)
    }
    if (!newBlogger.youtubeUrl && !newBlogger.name) {
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
    if (newBlogger.youtubeUrl && !check && newBlogger.name) {
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
    if (newBlogger.name && !newBlogger.youtubeUrl) {
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
    if (!newBlogger.name && check) {
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
    if (!newBlogger.name && !check) {
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
    } else {
        res.send(404)
    }

})

/////// POSTS API



app.get('/posts', (req: Request, res: Response) => {
    if (posts)
        res.status(200).send(posts)
})

app.post('/posts', (req: Request, res: Response) => {
    const needId = +req.body.bloggerId
    const needBlogger = bloggers.find((el) => el.id === needId)
    let newPost = null
    if (needBlogger) {
            newPost = {
            id: +(new Date()),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            bloggerId: needBlogger.id,
            bloggerName: needBlogger.name
        }
    }
    if(needBlogger && newPost && newPost.title.trim() && newPost.shortDescription.trim() && newPost.content.trim()){
        posts.push(newPost)
        res.status(201).send(newPost)
    }
    if(!needBlogger){
        res.send(404)
    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})