// requiring packages
const express = require("express");
const fs = require("fs");
const path = require("path");

// initializing 
const app = express();
const PORT = 3001;

// statics
app.use(express.static("public"));
// parse json
app.use(express.json());
//allow to read queries input in URL
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "/index.html"))

});

    // listening in requested port
app.listen(PORT, ()=>{
        console.log(`port ${PORT} listening`);
    });



