import React, { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


export default function Task({ task, handleDelete, handleEdit, title, description, 
    dueDate, isDone, setTitle, setDescription, setIsDone, setDueDate,
    }) {
    // handleOpen, handleClose, handleTitle, handleDesc, handleStatus, open, setOpen

    useEffect(() => {
        setTitle(task.data.title)
        setDescription(task.data.description)
        setDueDate(task.data.dueDate)
        setIsDone(task.data.isDone)
    }, [])



    let date_input = document.getElementById('date')
    const [buttonReady, setButtonReady] = useState(false)

    const [open, setOpen] = useState(false);
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
        if (date_input) {
            setDueDate(date_input.value)
            setButtonReady(true)
        }
    }


    
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={task.data.title}
                    secondary={
                        <>
                            <Typography component={'span'}>
                                description: {task.data.description}
                            </Typography>
                            <br/>
                            {
                                task.data.isDone ?
                                    <Typography component={'span'}> status: Completed </Typography>
                                    : <Typography component={'span'}> status: In Progress </Typography>
                            }
                            <br/>
                            <Typography component={'span'}> due date: {task.data.dueDate} </Typography>
                        </>
                    }
                />
                <IconButton aria-label="edit" onClick={handleOpen} >
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(task.id)} >
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="box">
                    <Typography variant="h4" className="boxTitle">
                        Modify Task
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
                            <input className="input2" id="date" type="date" onChange={handleDueDate} />
                        </Typography>
                        <Typography variant="subtitle1" className="input">
                            Status:
                            <input className="input2" id="status" type= "checkbox" value={isDone} onClick={handleStatus} />   
                        </Typography>
                        <div className="input">
                            {buttonReady ? 
                                <Button disabled={false} variant="contained" onClick={() => handleEdit(task.id)}>Submit</Button> :
                                <Button disabled={true} variant="contained" onClick={() => handleEdit(task.id)}>Submit</Button>
                            }
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
