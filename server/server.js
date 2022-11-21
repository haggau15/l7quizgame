import express from "express";
import * as path from "path";
import {request} from "express";
import {QuestionsApi} from "./questionsApi.js";
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser';
const  app = express();


app.use(bodyParser.json());
app.use(cookieParser());

//app.use("/login","client/register.html");

app.get("/login",(req,res) => {
    const user = USERS.find(u => u.username === req.cookies.username);
    //const {username,name} = user;
    console.log("res",req.cookies);
    res.json("user");
});

const USERS = [
    {
        username: "root",
        password: "123",
        name: "smith"
    }
    ];

app.post("/login",(req,res)=>{
    const body=req.body;
    const {username,password} = body;
    if (USERS.find(u=> u.username===username).password===password){
        res.cookie("username",username);
        res.sendStatus(200);
    }else{
        res.sendStatus(401);
    }
});
app.use(express.static("../client/dist"));

app.use("/api/questions",QuestionsApi);

app.use((req,res,next)=>{
    console.log(req.path);

    if (req.path.startsWith("/api"))
    {
        next();
    }
})


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});
