const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const cors = require('cors');
dotenv.config();

const userRouter = require('./routes/userRouter');
const productRouter =require('./routes/productRouter')
const categoryRouter =require('./routes/categoryRouter')
const commentRouter =require('./routes/commentRouter')

const app = express();

app.use(cors());
app.use(express.json());


connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', commentRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Không tìm thấy tài nguyên' });
});


module.exports = app;