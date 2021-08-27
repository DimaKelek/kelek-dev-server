import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import {sendMessage} from "./Features/SendMessage/send";

const app = express()
const PORT = process.env.PORT || 7777;

// let allowedOrigins = ["https://localhost:3000", "https://dimakelek.github.io"];
// app.use(cors(/*{
//     origin: function(origin, callback){
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.indexOf(origin) === -1){
//             let msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
// }*/));
// app.options('*', cors());
app.use(cors({
    origin: "http://localhost:3000"
}));
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
    res.status(200).json({})
    res.send("Ok")
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})