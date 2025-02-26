const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json()); // Allow JSON data
app.use(cors()); // Allow frontend to send requests

const COMMENTS_FILE = "comments.json";

// Load comments from file
const loadComments = () => {
    if (!fs.existsSync(COMMENTS_FILE)) return [];
    const data = fs.readFileSync(COMMENTS_FILE);
    return JSON.parse(data);
};

// Save comments to file
const saveComments = (comments) => {
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
};

// Get all comments
app.get("/comments", (req, res) => {
    res.json(loadComments());
});

// Add a new comment
app.post("/comments", (req, res) => {
    const comments = loadComments();
    const newComment = req.body;
    comments.push(newComment);
    saveComments(comments);
    res.status(201).json(newComment);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
