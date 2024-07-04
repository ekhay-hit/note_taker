const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const db =require('../db/db.json')
const uuid_Random = require("../helpers/uuid");



router.post('/notes', (req, res)=>{

    // distructuring object 
    console.log('I am in first line in post ');
    console.log(req.body);

    const {title, text} = req.body;

    res.json(`${req.method} recieved`)
    // console.info(`I am in ${req.method} title is: ${title} content: ${text}`);

    if(title && text){
        const newNote ={
            title,
            text,
            id: uuid_Random(),
        };

        //convert data to string for storage
        // const notes = JSON.stringify(newNote);
      
        fs.readFile("./db/db.json",'utf8',(err,data)=>{
            if (err){

                console.log(err)
            }else{
                // parsing data and store it in parsedNote varaible
                const parsedNote = JSON.parse(data);
                console.log(data);
                // pushing the new note to parseNote
                parsedNote.push(newNote);
                console.log('I am in reading server');
                // write data back to db.json
                fs.writeFile("./db/db.json", JSON.stringify(parsedNote,null,4),(error) =>{
                    error? console.error("ERORR data failed to write"):console.info('Notes have been updated');
                })
            }
        })
        const response ={
            status:"success",
            body: newNote,   
        }

        console.log(response);
        res.status(201).json(response)
    }else{
        res.status(500).json('error in posting notes');
        }
      
})

module.exports = router;