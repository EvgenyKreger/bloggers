import {Request, Response, Router} from "express";
import {bloggersRepository, BloggerType} from "../repositories/bloggers_db_repository";
import {bloggerPostValidationMiddleware} from "../middlewares/bloggerPostValidationMiddleware";
import {bloggerPutValidationMiddleware} from "../middlewares/bloggerPutValidationMiddleware";



export const bloggersRouter = Router({})


bloggersRouter.get('/', async (req: Request, res: Response) => {
    const getBloggers : BloggerType[] = await bloggersRepository.getAllBloggers()
    if (getBloggers)
        res.status(200).send(getBloggers)
    else {
        res.send(404)
    }
})

bloggersRouter.post('/',bloggerPostValidationMiddleware,async (req: Request, res: Response) => {
    const createBlogger : BloggerType = await bloggersRepository.createNewBlogger(req.body.name, req.body.youtubeUrl)
    if (createBlogger) {
        res.status(204).send(createBlogger)
    }
})

bloggersRouter.get('/:id', async (req: Request, res: Response) => {
    const newBloggers : BloggerType | boolean = await bloggersRepository.getBloggerById(+req.params.id)
    if (newBloggers) {
        res.status(200).send(newBloggers)
    } else {
        res.send(404)
    }
})

bloggersRouter.put('/:id', bloggerPutValidationMiddleware,async (req: Request, res: Response) => {

    const needBlogger: boolean = await bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)
    if (needBlogger) {
        res.send(204)
    } else {
        res.send(404)
    }


})

bloggersRouter.delete('/:id', async (req: Request, res: Response) => {
    const needBlogger: Boolean = await bloggersRepository.removeBlogger(+req.params.id)
    if (needBlogger) {
        res.send(204)
    } else {
        res.send(404)
    }

})
