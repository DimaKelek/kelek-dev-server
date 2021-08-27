import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import {sendMessage} from "./Features/SendMessage/send";

const app = express()
const PORT = process.env.PORT || 7777;
// app.use(cors({
//     origin: "https://dimakelek.github.io"
// }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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
        {id: "1", name: "Kelek", status: null},
        {id: "2", name: "Ira", status: null},
        {id: "3", name: "Vitalik", status: null},
        {id: "4", name: "Artur", status: null}
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
    await sendMessage(req.body)
    res.send("Ok")
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})