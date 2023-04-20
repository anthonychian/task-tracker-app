import React, {useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase_setup/firebase';
import './AddTask.css'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

export default function AddTask() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isDone, setIsDone] = useState(false)
    const [dueDate, setDueDate] = useState("")
    const [open, setOpen] = useState(false);

    const buttonReady = title && description && dueDate

    let date_input = document.getElementById('date')
    let status_input = document.getElementById('status')

    
    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDesc = (e) => {
        setDescription(e.target.value)
    }
    const handleStatus = () => {
        setIsDone(!isDone)
    }
    const handleDueDate = () => {
        setDueDate(date_input.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const docRef = await addDoc(collection(db, "tasks"), {
            title,
            description,
            isDone,
            dueDate
        });
        console.log("Document written with ID: ", docRef.id);
        
        setTitle("")
        setDescription("")
        setIsDone(false)
        setDueDate("")
        date_input.value = null
        status_input.checked = false
        window.location.reload(false);
    }

    return (
        <>
            <div className='button'>
                <Button variant="contained" onClick={handleOpen}>Add Task</Button>
            </div>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="box">
                    <Typography variant="h4" className="boxTitle">
                        Add New Task
                    </Typography>
                    <form className="inputContainer">
                        <div className="input">
                            <TextField
                                label="Title"
                                id="outlined-size-small"
                                size="small"
                                value={title}
                                onChange={handleTitle}
                                className="input"
                            />
                        </div>
                        <div className="input">
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                value={description}
                                onChange={handleDesc}
                                className="input"
                            />
                        </div>
                        
                        <Typography variant="subtitle1" className="input">
                            Due Date:
                            <input className="input2" id="date" type= "date" onChange={handleDueDate} />
                        </Typography>
                        <Typography variant="subtitle1" className="input">
                            Status:
                            <input className="input2" id="status" type= "checkbox" value={isDone} onClick={handleStatus} />   
                        </Typography>
                        <div className="input">
                            {buttonReady ? 
                                <Button disabled={false} variant="contained" onClick={handleSubmit} type="submit">Submit</Button> :
                                <Button disabled={true} variant="contained"onClick={handleSubmit} type="submit">Submit</Button>
                            }
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
