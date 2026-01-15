const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (for simplicity)
let posts = [
    {
        id: 1,
        title: "Getting Started with Next.js",
        content: "Next.js is a powerful React framework that makes building web applications easy and efficient.",
        author: "John Doe",
        date: new Date().toISOString()
    },
    {
        id: 2,
        title: "Understanding Redux",
        content: "Redux helps manage application state in a predictable way across your entire app.",
        author: "Jane Smith",
        date: new Date().toISOString()
    }
];

let nextId = 3;

// Routes

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

// Create post
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPost = {
        id: nextId++,
        title,
        content,
        author,
        date: new Date().toISOString()
    };

    posts.unshift(newPost);
    res.status(201).json(newPost);
});

// Update post
app.put('/api/posts/:id', (req, res) => {
    const { title, content, author } = req.body;
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    posts[postIndex] = {
        ...posts[postIndex],
        title,
        content,
        author
    };

    res.json(posts[postIndex]);
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    posts.splice(postIndex, 1);
    res.json({ message: 'Post deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});