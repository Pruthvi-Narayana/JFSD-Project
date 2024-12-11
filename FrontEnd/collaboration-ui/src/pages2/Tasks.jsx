import React from 'react';
import Dashboard from '../components/Dashboard';
import TaskList from '../components/TaskList';

const Tasks = () => {
  return (
    <Dashboard>
      <TaskList />
    </Dashboard>
  );
};

export default Tasks;