import {RequestBodyType} from "../Features/SendMessage/send";

export const requestsHandler = (req: RequestBodyType, e?: any) => {
    let errors = []
    let statusCode: number
    if(e.code) {
        statusCode = 1
        // if (e.code === "EAUTH") {
        //     errors.push("535-5.7.8 Username and Password not accepted.")
        // }
        errors.push(e)
    } else {
        statusCode = 0
    }
    return {
        your_requestBody: req,
        messages: [...errors],
        statusCode
    }
}