const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    //read method for reading files from db
    read(){
        return readFileAsync("db/db.json", "utf8");
    }

    //write method to write notes to the db
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    //getNotes method to get all notes in db by using read method, and then parsing for readability
    getNotes(){
        return this.read().then(notes => {
            let parsed = [].concat(JSON.parse(notes));
            return parsed;
        }) 
    };

    //Takes the note and add an id, then add it to the array of notes, then return the newNote
    addNote(note){
        const title = note.title;
        const text = note.text;
        const newNote = {title, text, id: uuid()};

        return this.getNotes()
            .then(currentNotes => [...currentNotes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id){
        return this.getNotes()
            //take the notes and filter out a new array with everything but the note we want to remove
            .then(notes => notes.filter(note => note.id !== id))
            //take the mfiltered notes and write them over the db
            .then(filtered => this.write(filtered));
    }
}//end storage class

module.exports = new Storage();
