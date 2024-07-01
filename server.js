// requiring packages
const express = require("express");
const fs = require("fs");
const path = require("path");

// initializing 
const app = express();
// use any other port if port 3001 is not available 
const PORT = process.env.port || 3001;

// statics
app.use(express.static("public"));
// parse json
app.use(express.json());
//allow to read queries input in URL
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "/notes.html"))

});
app.get('/index.html', (req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"))

});

app.post('/api/notes', (req, res)=>{

    // distructuring object 
    const {title, content} = req.body;
    res.json(`${req.method} recieved`)
    console.info(`I am in ${req.method} title is: ${title} content: ${content}`);
    if(title && content){
        const newNote ={
            title,
            content,
        }

        //convert data to string for storage
        const notes = JSON.stringify(newNote);

        fs.readFile("./db.json",'utf8',(err,data)=>{
            if (err){

                console.log(err)
            }else{
                // parsing data and store it in parsedNote varaible
                const parsedNote = JSON.parse(data);
                // pushing the new note to parseNote
                parsedNote.push(newNote);
                // write data back to db.json
                fs.writeFile("./db.json", parsedNote, null, 4),(err) =>{
                    err? console.error("ERORR data failed to write"):console.info('Notes have been updated');
                }
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


    // listening in requested port
app.listen(PORT, ()=>{
        console.log(`port ${PORT} listening`);
    });



