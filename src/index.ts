import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {bloggersRouter} from "./routers/bloggers_router";
import {postsRouter} from "./routers/posts_router";
import {runDb} from "./repositories/db";



const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5001

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

const startApp = async ()=>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()


