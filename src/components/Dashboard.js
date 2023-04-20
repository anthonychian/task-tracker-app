import React from 'react';
import AddTask from "./AddTask"
import TaskList from './TaskList';

export default function Dashboard() {
  const name = ""
  return (
    <>
      <AddTask name={name}/>
      <TaskList name={name}/>
    </>
  )
}
