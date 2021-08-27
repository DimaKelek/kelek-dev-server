import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import {sendMessage} from "./Features/SendMessage/send";
import {requestsHandler} from "./Middlewares/sendMessage";
import {v1} from "uuid";

const app = express()
app.use(cors({origin: "https://dimakelek.github.io"}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 7777;

type UserType = {
    id: string
    name: string
    status: string | null
}
type UsersType = {
    users: UserType[]
}
const USERS: UsersType = {
    users: [
        {id: v1(), name: "Kelek", status: null},
        {id: v1(), name: "Ira", status: null},
        {id: v1(), name: "Vitalik", status: null},
        {id: v1(), name: "Artur", status: null}
    ]
}

app.get('/', (req, res) => {
    res.send(
        `<h2>Welcome to test server by Kelek</h2>
         <div>My contacts: </div>
         <div>Email: kelekofficial@gmail.com</div> 
         <div>Telegram: <a href="https://t.me/KelekOfficial">https://t.me/KelekOfficial</a></div>`
    )
})
app.get('/users', (req, res) => {
    res.status(200).json(USERS)
    res.send(USERS)
})
app.get(`/users/:userID`, (req, res) => {
    const user = USERS.users.find(u => u.id === req.params.userID)
    if(user) {
        res.status(200).json(user)
        res.send(user)
    } else {
        res.send("User not found!!")
    }
})

app.post('/send', async (req, res) => {
    try {
        await sendMessage(req.body)
        res.status(200).json(requestsHandler(req.body))
    } catch (e) {
        res.status(200).json(requestsHandler(req.body, e))
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})