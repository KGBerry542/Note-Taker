const express = require('express');
const fsUtils = require('../helpers/fsUtils');

const router = express.Router();

router.get('/notes', (req, res) => {
  fsUtils
    .readFromFile('db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);
      res.json(notes);
    })
    .catch((err) =>
      res.status(500).json({ error: 'Failed to read notes data.' })
    );
});

router.post('/notes', (req, res) => {
  fsUtils.readFromFile('db/db.json')
    .then(data => {
      const notes = JSON.parse(data);
      const newNote = req.body;
      notes.push(newNote);
      return fsUtils.writeToFile('db/db.json', JSON.stringify(notes));
    })
    .then(() => res.json(req.body))
    .catch(err => res.status(500).json({ error: 'Failed to save the note.' }));
});

module.exports = router;
