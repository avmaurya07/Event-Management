// index.js
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('./db'); // Import the db.js file to establish MongoDB connection

const app = express();

const corsOptions = {
    origin: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(`<h1>You are on Event Management Server...</h1>`);
});

// Import the routes
app.use("/api/events", require("./routes/events"));
app.use("/api/register", require("./routes/register"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});