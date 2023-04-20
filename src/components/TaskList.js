import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase_setup/firebase';

import List from '@mui/material/List';
import Task from './Task';
import '../css/TaskList.css'

export default function TaskList({ name }) {
    const [tasks, setTasks] = useState([])

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

    const getTasksForCurrentUser = () => {
        return tasks.filter(task => {
            if (name !== "") {
                return task.data.name === name;
            }
        });
    }

    return (
        <div className="TaskList">
            <div className="titleContainer">
                <h1 className="title">{name}'s Tasks</h1>
            </div>
            <div className="listContainer">
                <List className="list">
                    {getTasksForCurrentUser().map((task, idx) =>
                        <Task key={idx} task={task} />
                    )}
                </List>
            </div>
        </div>
    )
}
