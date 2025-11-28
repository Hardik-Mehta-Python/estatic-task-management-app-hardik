import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                setTasks([]);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setTasks([]);
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });
            const updatedTask = await response.json();
            setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
            });
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Your Tasks</h1>
                <button className="create-task-btn" onClick={() => navigate('/add-task')}>
                    Create Task
                </button>
            </div>

            <div className="task-list">
                {tasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>No task pending</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdate={handleUpdateTask}
                            onDelete={handleDeleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
