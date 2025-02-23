const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors")

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const itemRoute = require('./routes/item');
app.use(itemRoute);

const PORT = 4000;
const DB_URL = "mongodb+srv://5thDimension:5thDimension@richmobile.o6bgx.mongodb.net/RichMobileDB?retryWrites=true&w=majority&appName=RichMobile";

mongoose.connect(DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB: ", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
