import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskItem = ({ task, onUpdate, onDelete }) => {
    const navigate = useNavigate();

    const handleToggleComplete = () => {
        onUpdate(task.id, { completed: !task.completed });
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-actions">
                    <button onClick={handleToggleComplete}>
                        {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                    </button>
                    <button onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
