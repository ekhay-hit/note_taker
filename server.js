// requiring packages
// const router = require('express').Router();
const express = require("express");
const fs = require("fs");
const path = require("path");
const db =require('./db/db.json')
const uuid_Random = require("./helpers/uuid");
const notesRouter = require("./routes/notes.js");

// initializing 
const app = express();

// parse json
app.use(express.json());
//allow to read queries input in URL
app.use(express.urlencoded({extended:true}));


// use any other port if port 3001 is not available 
const PORT = process.env.port || 3001;
app.use("/api", notesRouter);

// statics
app.use(express.static("public"));

//./public/index.html
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
   
});

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

    // listening in requested port
app.listen(PORT, ()=>{
        console.log(`port ${PORT} listening`);
    });



