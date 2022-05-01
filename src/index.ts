import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {bloggersRouter} from "./routers/bloggers_router";
import {postsRouter} from "./routers/posts_router";



const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5001

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




