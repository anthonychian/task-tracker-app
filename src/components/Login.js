import { Typography, Button, TextField, Stack } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('typing');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
            // check for username existance in the database and pull data
            setStatus('success');
            navigate(`/${username}`);
        } catch (err) {
            setStatus('typing');
        }
    }

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2} 
            mx="30%"
            my="15%"
        >
            <Typography variant='h2' noWrap={true}>Task-Tracker-App</Typography>
            <Typography variant='body1' noWrap={true}>Welcome! Please enter your username to begin</Typography>
            <TextField
                fullWidth
                size="small"
                placeholder='username'
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value.trim());
                }}
                disabled={status === 'submitting'}>
            </TextField>
            <Button
                fullWidth
                variant='contained'
                disabled={username.length === 0 || status === 'submitting'}
                onClick={handleSubmit}
                disableElevation
            >
                Submit
            </Button>
        </Stack>
    );
}

export default Login;