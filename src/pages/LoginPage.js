import React, { useState } from 'react';
import useLocalState from '../useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import classes from './LoginPage.module.css'

const LoginPage = () => {
  const history = useNavigate();
  const [user, setUser] = useLocalState('', 'user');
  const [username, setUsername] = useState('');

  const handleButtonClick = () => {
    setUser(username);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  useEffect(() => {
    if (user) {
        history("/",{replace:true});
    }
  }, [user]);

  return (
    <div className={classes.main}>
      <div className={classes.description}>
        <h1>Task Tracker</h1>
        <p>
          Welcome to the Task Tracker!<br/>
          You can begin tracking your tasks here.<br/>
        </p>
      </div>
      <div className={classes.login}>
        <input type='email' id='username' placeholder='username' value={username} onChange={handleUsernameChange} />
        <button onClick={handleButtonClick}>Set User</button>
      </div>
    </div>
  );
};

export default LoginPage;