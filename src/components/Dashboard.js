import React from 'react';
import AddTask from "./AddTask"
import TaskList from './TaskList';

export default function Dashboard() {
  const name = "Tom"
  return (
    <>
      <AddTask name={name}/>
      <TaskList name={name}/>
    </>
  )
}
