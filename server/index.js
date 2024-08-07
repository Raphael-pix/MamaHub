const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser')

const authRoutes = require("./routes/auth.js");

const app = express();

/* DATABASE */
const PORT = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
});
client.connect(process.env.MONGO_URL)
.then (() => console.log('Database connected!'))
.catch((err)=>console.log(err.message))

require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));