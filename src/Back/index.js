const express = require("express");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { AuthRouter } = require("./routes/authRouter");
const { UserRouter } = require("./routes/userRouter");
const {
    GameRouter_2,
} = require("./routes/gamesRouter(not guarded)");
const { GameRouter } = require("./routes/gameRouter");
const http_errors = require("http-errors");
// const ew=require("../src/index.html");
const path = require("path");

const app = express();
app.use(morgan("common"));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname+'../../Steam'))
app.get('/',function(req,res){
    let str=__dirname.replace("\\BackEnd","");
    console.log(path.join(str+"/src/index.html"))
     res.status(200).sendFile(path.join(str+"/src/index.html"))
});
app.use("/api/", AuthRouter);
app.use("/api/user/me", UserRouter);
app.use("/api/me/games", GameRouter);
app.use("/api/games", GameRouter_2);
mongoose
    .connect(
        "mongodb+srv://Sanya:456jkl89@cluster0.kggex.mongodb.net/Steam?retryWrites=true&w=majority",
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    )
    .then(
        () => {
            console.log("Connected to db");
            app.listen(8080);
        },
        (err) => {
            console.log("Error connect to MongoDb", err);
        }
    );
app.use((req, res, next) => {
    next(http_errors(400, "Invalid path"));
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});
