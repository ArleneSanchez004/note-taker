const  router = require("express").Router();
const storage = require("../db/storage");

//GET 
router.get("/notes", (req,res) => {
    console.log(res);
    storage.getNotes()
        .then((notes) => res.json(notes)).catch(err => {
            res.status(500).json(err);
        })
});

//POST
router.post("/notes", (req,res) => {
    console.log(req.body)
    storage.addNote(req.body)
        .then((note) => res.json(note)).catch(err => {
            res.status(500).json(err);
        })
});

//DELETE
router.delete("/notes/:id", (req,res) =>{
    storage.removeNote(req.params.id)
        .then(() => res.json({ ok: true}));
});

module.exports = router;