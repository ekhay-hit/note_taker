// requiring router from express
const util = require('util');
const router = require("express").Router();
const fs = require("fs");
const uuid_Random = require("../helpers/uuid");
const readFromFile = util.promisify(fs.readFile);


// get request to get data from db.json
router.get('/notes', (req,res)=>{
   
    readFromFile('./db/db.json').then((data) => {
        if (!data) {
            res.json([]);
        } else {
            res.json(JSON.parse(data));
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });

});

// post request to add new notes 
router.post('/notes', (req, res)=>{

    // distracturing the object 
    const {title, text} = req.body;

    res.json(`${req.method} recieved`)
  
    // creating the new note
    if(title && text){
        const newNote ={
            title,
            text,
            id: uuid_Random(),
        };

      // reading data from db.json
        fs.readFile("./db/db.json",'utf8',(err,data)=>{
            if (err){

                console.log(err)
            }else{
                // parsing data and store it in parsedNote varaible
                const parsedNote = JSON.parse(data);
              
                // pushing the new note to parseNote
                parsedNote.push(newNote);
                console.log('I am in reading server');
                // write data back to db.json
                fs.writeFile("./db/db.json", JSON.stringify(parsedNote,null,4),(error) =>{
                    error? console.error("ERORR data failed to write"):console.info('Notes have been updated');
                })
            }
        });

        const response ={
            status:"success",
            body: newNote,   
        }

        console.log(response);
       
    }else{
        res.status(500).json('error in posting notes');
        }
      
})

// Delet Post request
router.delete('/notes/:id',(req, res)=>{
   
    // distructing the object of the url to pull the id
   const { params: {id}}  = req;
    
   // read the file json
   fs.readFile("./db/db.json",'utf8', (error, data)=>{
    if(error){
     console.log(error);
    }else{

        // parsing the data in the file of db.json
        const parsedNoteForDelete= JSON.parse(data);

        // finding the index of the note base on the id requested to delete 
        const findNoteIndex = parsedNoteForDelete.findIndex((note) => note.id === id);
        
        // if no id send bad status of 404, not found
        if(findNoteIndex === -1) return res.sendStatus(404);
        
        // after finding the index, delete the not from the file
        parsedNoteForDelete.splice(findNoteIndex,1);
       
        // write the data back to the db.json after deleting the requested note.
        fs.writeFile("./db/db.json", JSON.stringify(parsedNoteForDelete,null,4),(error) =>{
            error? console.error("ERORR data failed to write"):console.info('Note has been deleted');
        })
        
    }  
        
   })

})
module.exports = router;