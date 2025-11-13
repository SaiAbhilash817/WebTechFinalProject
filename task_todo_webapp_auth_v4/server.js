require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const MONGO = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task_todo_auth';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error', err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
