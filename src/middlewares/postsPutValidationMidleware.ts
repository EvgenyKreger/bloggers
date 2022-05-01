

import {NextFunction, Request, Response} from "express";


export const postsPostValidationMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const checked = (typeof (req.body.title) !== typeof (5)) && (typeof (req.body.shortDescription) !== typeof (5))
        && (typeof (req.body.content) !== typeof (5))
    if (Object.keys(req.body).length === 0) {
        res.send(400)
        return
    }
    if (Object.keys(req.body.bloggerId).length === 0) {
        res.send(400)
        return
    }


    if (!checked) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Fields Title,ShortDescription and Content  should only have a string type",
            }],
            "resultCode": 1
        })
        return
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
        return
    }

}
