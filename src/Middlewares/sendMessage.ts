import {RequestBodyType} from "../Features/SendMessage/send";

export const requestsHandler = (req: RequestBodyType, e?: any) => {
    let errors = []
    let statusCode: number
    if(e.code) {
        statusCode = 1
        if (e.responseCode === 534) {
            errors.push("Code 534-5.7.14 Access denied")
        } else if(e.responseCode === 535) {
            errors.push("Code 535-5.7.8 Username and Password mail service not accepted.")
        }
    } else {
        statusCode = 0
    }
    return {
        your_requestBody: req,
        messages: [...errors],
        statusCode
    }
}