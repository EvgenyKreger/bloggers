import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts_repository";
import {postsPostValidationMiddleware} from "../middlewares/postsPostValidationMidleware";
export const postsRouter = Router({})


postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getAllPosts()
    if (posts)
        res.status(200).send(posts)

})

postsRouter.post('/', postsPostValidationMiddleware, (req: Request, res: Response) => {
    const createNewPost = postsRepository.createPosts(+req.body.bloggerId, req.body.title, req.body.shortDescription, req.body.content)
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

postsRouter.put('/:id', postsPostValidationMiddleware, (req: Request, res: Response) => {

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