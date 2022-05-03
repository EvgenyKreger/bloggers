import {Request, Response, Router} from "express";
import {postsRepository, PostsType} from "../repositories/posts_repository";
import {postsPostValidationMiddleware} from "../middlewares/postsPostValidationMidleware";
import {postsPutValidationMiddleware} from "../middlewares/postsPutValidationMidleware";
export const postsRouter = Router({})


postsRouter.get('/', async (req: Request, res: Response) => {
    const posts : PostsType[] = await postsRepository.getAllPosts()
    if (posts)
        res.status(200).send(posts)

})

postsRouter.post('/',postsPostValidationMiddleware, async (req: Request, res: Response) => {
    const createNewPost : PostsType | boolean = await postsRepository.createPosts(+req.body.bloggerId, req.body.title, req.body.shortDescription, req.body.content)
    if (createNewPost) {
        res.status(201).send(createNewPost)
    } else {
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

})

postsRouter.get('/:id', (req: Request, res: Response) => {
    const findPostById = postsRepository.getPostById(+req.params.id)
    if (findPostById) {
        res.status(200).send(findPostById)
    } else {
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
})

postsRouter.put('/:id', postsPutValidationMiddleware, (req: Request, res: Response) => {

    const updateNeedPost: Boolean = postsRepository.updatePost(+req.params.id, req.body.bloggerId, req.body.title,
        req.body.shortDescription, req.body.content)
    if (updateNeedPost) {
        res.send(204)
    } else {
        res.send(404)
    }
})

postsRouter.delete('/:id', (req: Request, res: Response) => {
    const removePostById = postsRepository.removePost(+req.params.id)
    if (removePostById) {
        res.send(204)
    } else {
        res.send(404)
    }


})