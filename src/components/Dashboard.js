import React from 'react';
import AddTask from "./AddTask"
import TaskList from './TaskList';

export default function Dashboard() {
  return (
    <>
      <AddTask />
      <TaskList />
    </>
  )
}
