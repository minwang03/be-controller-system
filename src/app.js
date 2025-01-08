const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const cors = require('cors');
dotenv.config();

const userRouter = require('./routes/userRouter');

const app = express();

app.use(cors());
app.use(express.json());


connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api', userRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Không tìm thấy tài nguyên' });
});


module.exports = app;