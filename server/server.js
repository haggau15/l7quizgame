import express from "express";
import * as path from "path";
import {request} from "express";
import {QuestionsApi} from "./questionsApi.js";
import bodyParser from "body-parser"
const  app = express();

app.use(bodyParser.json());


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


