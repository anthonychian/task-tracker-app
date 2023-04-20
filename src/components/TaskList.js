import React, { useState, useEffect } from 'react'
import { collection, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase_setup/firebase';

import List from '@mui/material/List';
import Task from './Task';
import '../css/TaskList.css'

export default function TaskList({ name }) {
    const [tasks, setTasks] = useState([])
    const [changedTasks, setChangedTasks] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isDone, setIsDone] = useState(false)
    const [dueDate, setDueDate] = useState("")
    

    useEffect(() => {
        getData()
    },[changedTasks])

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    // const handleTitle = (e) => {
    //     setTitle(e.target.value)
    // }
    // const handleDesc = (e) => {
    //     setDescription(e.target.value)
    // }
    // const handleStatus = () => {
    //     setIsDone(!isDone)
    // }

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

    const handleEdit = async (id) => {
        console.log(id)
        const docRef = doc(db, "tasks", id);
        await updateDoc(docRef, {
            title,
            description,
            isDone,
            dueDate,
        })
        .then(() => {
            console.log(`document ${id} has been modified`)
        })
        .catch(error => {
            console.log(error);
        })
        setChangedTasks(changedTasks + 1)
        window.location.reload(false);
    }

    const handleDelete = async (id) => {
        const docRef = doc(db, "tasks", id);

        await deleteDoc(docRef)
        .then(() => {
            console.log(`document ${id} has been deleted`)
        })
        .catch(error => {
            console.log(error);
        })
        setChangedTasks(changedTasks + 1)
    }

    const getTasksForCurrentUser = () => {
        return tasks.filter(task => {
            return task.data.name === name;
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
                        <Task key={idx} 
                            task={task} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                            // handleOpen={handleOpen}
                            // handleClose={handleClose}
                            // handleTitle={handleTitle}
                            // handleDesc={handleDesc}
                            // handleStatus={handleStatus}
                            // open={open}
                            title={title}
                            description={description}
                            dueDate={dueDate}
                            isDone={isDone}
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setDueDate={setDueDate}
                            setIsDone={setIsDone}
                        />
                    )}
                </List>
            </div>
        </div>
    )
}
