// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notesapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Define Note Schema
const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', noteSchema);

// API Routes

// Get all notes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new note
app.post('/api/notes', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = req.body.title;
        note.content = req.body.content;
        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        await note.deleteOne();
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});