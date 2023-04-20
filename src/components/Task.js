import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function Task({ task }) {
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
                        {task.data.isDone && <Typography> status: Completed </Typography>}
                        {!task.data.isDone && <Typography> status: In Progress </Typography>}
                        <Typography> due date: {task.data.dueDate} </Typography>
                    </>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
    </>
  )
}
