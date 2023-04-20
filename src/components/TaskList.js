import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase_setup/firebase';

import List from '@mui/material/List';
import Task from './Task';
import '../css/TaskList.css'

export default function TaskList({ name }) {
    const [tasks, setTasks] = useState([])
    // console.log(task.data.name)
    console.log(name)

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            let databaseInfo = [];
            querySnapshot.forEach((doc) => {
                databaseInfo.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setTasks(databaseInfo)
        }
        getData()
    },[])

    return (
        <div className="container">
            <List className="task-list">
                {tasks.map((task, idx) => (
                    <>
                        {task.data.name === name && name != "" && <Task key={idx} task={task} />}
                        {name === "" && <Task key={idx} task={task} />}
                    </>
                ))}
            </List>
        </div>
    )
}
