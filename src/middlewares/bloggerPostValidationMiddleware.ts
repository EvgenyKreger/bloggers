import {NextFunction,Request,Response} from "express";



export const bloggerPostValidationMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$');
    const check = regex.test(req.body.youtubeUrl)
    const isString = (typeof (req.body.name) !== typeof (5)) && (typeof (req.body.youtubeUrl) !== typeof (5))

    // if (check && isString && newBlogger.name && req.body.name.trim().length > 0 && req.body.name.trim().length < 15
    //     && req.body.youtubeUrl.trim().length > 0 && req.body.youtubeUrl.trim().length < 100 && isString) {
    //     bloggers.push(newBlogger)
    //     res.status(201).send(newBlogger)
    // }
    if (!check) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Youtube url is not correct",
            }],
            "resultCode": 1
        })
        return
    }
    if (Object.keys(req.body).length === 0){
        res.send(400)
        return
    }
    if (!isString) {
        res.status(400).send({
            "data": {},
            "errorsMessages": [{
                "message": "Fields Title,ShortDescription and Content  should only have a string type",
            }],
            "resultCode": 1
        })
        return
    }

    if (!check && !req.body.youtubeUrl.trim() || req.body.youtubeUrl.trim().length > 100 || !req.body.name.trim()
        || req.body.name.trim().length > 15) {
        let notifications = []

        req.body.name.trim().length < 1 ? notifications.push(`{"message": "The Title field is required.", 
        "field": "title"}`) : ''
        req.body.youtubeUrl.trim() < 1 ? notifications.push(`{"message": "The Title field is required.", 
        "field": "title"}`) : ''

        req.body.youtubeUrl.trim().length > 100 ? notifications.push(`{"message": "The field YoutubeUrl must be 
        a string or array type with a maximum length of '100'.",
            "field": "youtubeUrl" }`) : ''
        req.body.name.trim().length > 15 ? notifications.push(`{"message": "The field Name must be a string or array type with a maximum length of '15'.",
         "field": "name" }`) : ''
        !check ? notifications.push(`{"message": "The field YoutubeUrl must match the regular expression " +
                    "'^https://([a-zA-Z0-9_-]+\\\\.)+[a-zA-Z0-9_-]+(\\\\/[a-zA-Z0-9_-]+)*\\\\/?$'.",
                "field": "youtubeUrl" }`) : ''

        res.status(400).send(`{
            "data": {},
            "errorsMessages":[ ${notifications}],
            "resultCode": 1
        }`)
        return
    }else{
        next()
    }

}