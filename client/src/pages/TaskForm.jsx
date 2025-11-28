import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // If id exists, we are in edit mode

    useEffect(() => {
        if (id) {
            fetchTask();
        }
    }, [id]);

    const fetchTask = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
            } else {
                console.error('Failed to fetch task');
            }
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        const taskData = { title, description };
        const url = id
            ? `http://localhost:5000/api/tasks/${id}`
            : 'http://localhost:5000/api/tasks';
        const method = id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                navigate('/home');
            } else {
                console.error('Failed to save task');
            }
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div className="task-form-container">
            <h2>{id ? 'Edit Task' : 'Create New Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        rows="4"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">{id ? 'Update Task' : 'Add Task'}</button>
                    <button type="button" onClick={() => navigate('/home')} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
