import express from "express";
import { router as userRouter } from './routes/users.routes.js'
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/users', userRouter);

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: ['GET'],
    preflightContinue: false
  })
);

//----------------------------- Listen Port -----------------------------//

app.listen(3002, function(){
    console.log("Server started at 3002");
});

//----------------------------- Server check -----------------------------//

app.get("/", function(req, res){
    res.send("Server is running");
});