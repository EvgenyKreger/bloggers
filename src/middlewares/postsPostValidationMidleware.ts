

import {NextFunction, Request, Response} from "express";


export const postsPostValidationMiddleware = (req:Request, res:Response, next:NextFunction)=>{

    const check = (typeof (req.body.title) !== typeof (5)) && (typeof (req.body.shortDescription) !== typeof (5))
    //     && (typeof (req.body.content) !== typeof (5))
    // if (needBloggerById && check) {
    //     newPost = {
    //         id: +(new Date()),
    //         title: req.body.title,
    //         shortDescription: req.body.shortDescription,
    //         content: req.body.content,
    //         bloggerId: +req.body.bloggerId,
    //         bloggerName: needBloggerById.name
    //     }
    // }
    // if (newPost && check && req.body.title.trim().length < 30 && req.body.title.trim().length > 0
    //     && req.body.shortDescription.trim().length < 100 && req.body.shortDescription.trim().length > 0
    //     && req.body.content.trim().length < 1000 && req.body.content.trim().length > 0) {
    //     posts.push(newPost)
    //     res.status(201).send(newPost)
    // }
    if (Object.keys(req.body).length === 0){
        res.send(400)
        return
    }
    // if (!needBloggerById) {
    //     res.status(400).send({
    //         "data": {},
    //         "errorsMessages": [
    //             {
    //                 "message": "Invalid 'bloggerId': such blogger doesn't exist",
    //                 "field": "bloggerId"
    //             }
    //         ],
    //         "resultCode": 1
    //     })
    // }
    if (!check) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Fields Title,ShortDescription and Content  should only have a string type",
            }],
            "resultCode": 1
        })
        return
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
        return
    }else{
        next()
    }

}
