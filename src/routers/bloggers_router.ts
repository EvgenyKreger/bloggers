import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers_repository";
import {bloggerPostValidationMiddleware} from "../middlewares/bloggerPostValidationMiddleware";
import {bloggerPutValidationMiddleware} from "../middlewares/bloggerPutValidationMiddleware";



export const bloggersRouter = Router({})


bloggersRouter.get('/', (req: Request, res: Response) => {
    const getBloggers = bloggersRepository.getAllBloggers()
    if (getBloggers)
        res.status(200).send(getBloggers)
    else{
        res.send(404)
    }
})

bloggersRouter.post('/',bloggerPostValidationMiddleware,(req: Request, res: Response) => {
const createBlogger = bloggersRepository.createNewBlogger(req.body.name, req.body.youtubeUrl)
    if(createBlogger){
        res.status(204).send(createBlogger)
    }
})

bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const newBloggers = bloggersRepository.getBloggerById(+req.params.id)
    if (newBloggers) {
        res.status(200).send(newBloggers)
    } else {
        res.send(404)
    }
})

bloggersRouter.put('/:id', bloggerPutValidationMiddleware,(req: Request, res: Response) => {

    const needBlogger:Boolean = bloggersRepository.updateBlogger(+req.params.id, req.body.name, req.body.youtubeUrl)
      if(needBlogger){
          res.send(204)
      }else{
          res.send(404)
      }


})

bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const needBlogger:Boolean = bloggersRepository.removeBlogger(+req.params.id)
    if (needBlogger) {
        res.send(204)
    }
  else {
        res.send(404)
    }

})
