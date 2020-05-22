const  router = require("express").Router();
const storage = require("../db/storage");

//GET 
router.get("/notes", (req,res) => {
    storage.getNotes()
        .then(notes => res.json(notes));
});

//POST
router.post("/notes", (req,res) => {
    storage.addNote(req.body)
        .then((note) => res.json(note));
});

//DELETE
router.delete("/notes/:id", (req,res) =>{
    storage.removeNote(req.params.id)
        .then(() => res.json({ ok: true}));
});

module.exports = router;