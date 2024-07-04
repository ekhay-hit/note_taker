// requiring packages
// const router = require('express').Router();
const express = require("express");
const fs = require("fs");
const path = require("path");
const db =require('./db/db.json')
const util = require('util');
const uuid_Random = require("./helpers/uuid");
const notesRouter = require("./routes/notes.js");

// initializing 
const app = express();
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);


// parse json
app.use(express.json());
//allow to read queries input in URL
app.use(express.urlencoded({extended:true}));


// use any other port if port 3001 is not available 
const PORT = process.env.port || 3001;
app.use("/api", notesRouter);
// app.use('/api', require('./routes/notes'));
// statics
app.use(express.static("public"));

//./public/index.html
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get('/api/notes', (req,res)=>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

    // app.get('/api/notes', async (req, res) => {
    //     try {
    //         const data = await readFromFile('./db/db.json');
    //         res.json(JSON.parse(data));
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // });
});

// app.post('/api/notes', (req, res)=>{

//     // distructuring object 
//     console.log('I am in first line in post ');
//     console.log(req.body);

//     const {title, text} = req.body;

//     res.json(`${req.method} recieved`)
//     console.info(`I am in ${req.method} title is: ${title} content: ${text}`);

//     if(title && text){
//         const newNote ={
//             title,
//             text,
//             id: uuid_Random(),
//         }

//         //convert data to string for storage
//         const notes = JSON.stringify(newNote);
      
//         fs.readFile("./db/db.json",'utf8',(err,data)=>{
//             if (err){

//                 console.log(err)
//             }else{
//                 // parsing data and store it in parsedNote varaible
//                 const parsedNote = JSON.parse(data);
//                 // pushing the new note to parseNote
//                 parsedNote.push(newNote);
//                 console.log('I am in reading server');
//                 // write data back to db.json
//                 fs.writeFile("./db/db.json", JSON.stringify(parsedNote,null,4),(err) =>{
//                     err? console.error("ERORR data failed to write"):console.info('Notes have been updated');
//                 })
//             }
//         })
//         const response ={
//             status:"success",
//             body: newNote,   
//         }

//         console.log(response);
//         res.status(201).json(response)
//     }else{
//         res.status(500).json('error in posting notes');
//         }
      
// })


    // listening in requested port
app.listen(PORT, ()=>{
        console.log(`port ${PORT} listening`);
    });



