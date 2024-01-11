import React, { useState, useEffect } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Task 1',
      description: 'Description for Task 1',
      time: '00:00:00',
      isRunning: false,
    },
    {
      id: 2,
      name: 'Task 1',
      description: 'Description for Task 1',
      time: '00:00:00',
      isRunning: false,
    },
    // Add more tasks as needed
  ]);

  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (activeTask !== null && activeTask.isRunning) {
        const taskIndex = tasks.findIndex((task) => task.id === activeTask.id);
        const updatedTasks = [...tasks];
        const [hours, minutes, seconds] = updatedTasks[taskIndex].time.split(':').map(Number);
        updatedTasks[taskIndex].time = `${hours}:${minutes}:${seconds + 1}`;
        setTasks(updatedTasks);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activeTask, tasks]);

  const startTimer = (taskId) => {
    setActiveTask({ id: taskId, isRunning: true });
  };

  const pauseTimer = () => {
    setActiveTask({ ...activeTask, isRunning: false });
  };

  const stopTimer = () => {
    const taskIndex = tasks.findIndex((task) => task.id === activeTask.id);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].isRunning = false;
    setTasks(updatedTasks);
    setActiveTask(null);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {tasks.map((task) => (
        <div key={task.id} className='my-4'>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
          <p>Time: {task.time}</p>
          {!task.isRunning ? (
            <button onClick={() => startTimer(task.id)}>Start</button>
          ) : (
            <button onClick={pauseTimer}>Pause</button>
          )}
        </div>
      ))}
      {activeTask && (
        <button onClick={stopTimer}>Stop</button>
      )}
    </div>
  );
};

export default TaskManager;
