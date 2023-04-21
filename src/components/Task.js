import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db } from '../firebase_setup/firebase';
import UpdateTask from './UpdateTask'

export default function Task({ task }) {
    async function handleDelete() {
        const docRef = doc(db, "tasks", task.id);
        deleteDoc(docRef)
            .then(() => {
                console.log("Entire Document has been deleted successfully.")
            })
            .catch(error => {
                console.log(error);
            })
    }
    const [editbox, seteditbox] = useState(false)

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={task.data.title}
                    secondary={
                        <>
                            <Typography>
                                description: {task.data.description}
                            </Typography>
                            {
                                task.data.isDone ?
                                    <Typography> status: Completed </Typography>
                                    : <Typography> status: In Progress </Typography>
                            }
                            <Typography> due date: {task.data.dueDate} </Typography>
                        </>
                    }
                />

                <Button variant="contained" onClick={handleDelete} type="submit">Delete</Button>
                <Button variant="contained" onClick={() => seteditbox(true)} type="submit">Edit</Button>
                {editbox === true && <UpdateTask task={task} seteditbox={seteditbox} />}



            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}
