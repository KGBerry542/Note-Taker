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
  fsUtils
    .readFromFile('db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);
      const newNote = {
        id: generateUniqueId(),
        title: req.body.title,
        text: req.body.text,
      };
      notes.push(newNote);
      return fsUtils.writeToFile('db/db.json', JSON.stringify(notes));
    })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ error: 'Failed to save the note.' }));
});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  fsUtils
    .readFromFile('db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      return fsUtils.writeToFile('db/db.json', JSON.stringify(updatedNotes));
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to delete note.' });
    });
});

// Helper function to generate a unique ID
function generateUniqueId() {
  return Date.now().toString();
}

module.exports = router;
