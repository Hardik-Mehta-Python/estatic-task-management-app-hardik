const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(bodyParser.json());

// Helper functions for file I/O
const readTasks = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading tasks:', err);
        return [];
    }
};

const writeTasks = (tasks) => {
    try {
        console.log('Writing tasks to file:', DATA_FILE);
        fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
        console.log('Successfully wrote to file.');
    } catch (err) {
        console.error('Error writing tasks:', err);
    }
};

// Initialize currentId based on existing tasks
const getNextId = (tasks) => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(t => t.id)) + 1;
};

// Routes

// GET all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// GET task by ID
app.get('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
});

// POST new task
app.post('/api/tasks', (req, res) => {
    console.log('Received POST request:', req.body);
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const tasks = readTasks();
    const newTask = {
        id: getNextId(tasks),
        title,
        description: description || '',
        completed: false
    };

    tasks.push(newTask);
    writeTasks(tasks);
    console.log('Task added. Total tasks:', tasks.length);
    res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    const { title, description, completed } = req.body;
    const task = tasks[taskIndex];

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    writeTasks(tasks);
    res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

    tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Server using file-based persistence.');
});
