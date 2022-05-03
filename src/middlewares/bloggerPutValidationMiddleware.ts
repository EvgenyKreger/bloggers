import {NextFunction, Request, Response} from "express";


export const bloggerPutValidationMiddleware = (req:Request, res:Response, next:NextFunction)=>{

    const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$');
    const check = regex.test(req.body.youtubeUrl)
    if (Object.keys(req.body).length === 0){
        res.send(400)
        return
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
        return
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
        return
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
        return
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
        return
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
        return
    }else{
        next()
    }
}