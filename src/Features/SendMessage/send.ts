import nodemailer from "nodemailer";

export type RequestBodyType = {
    name: string
    email: string
    subject: string
    message?: string
}

const smtp_login = process.env.SMTP_LOGIN || "fenixpwtera@gmail.com"
const smtp_pass = process.env.SMTP_PASS || "7122054arnold"

const transport = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: smtp_login,
        pass: smtp_pass
    }
})

export const sendMessage = async (body: RequestBodyType) => {
    const {name, email, subject, message} = body
    await transport.sendMail({
        from: name,
        to: "kelekofficial@gmail.com",
        subject: "HR WANTS ME!!",
        html: `<div style="width: 300px; height: 400px; background-color: #9890C7; padding: 25px;">
                <div style="height: 100%;">
                    <h3 style="color: #0c0c0c; text-align: center;">New Message!!</h3>
                    <span style="display: block; margin-bottom: 20px;">Name: ${name}</span>
                    <span style="display: block; margin-bottom: 20px;">Subject: ${subject}</span>
                    <span style="display: block; margin-bottom: 20px;">Email: ${email}</span>
                    <p style="color: #0c0c0c;">Message: ${message}</p>
                </div>
            </div>`
    })
}