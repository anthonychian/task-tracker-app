import React, { useState } from 'react';
import useLocalState from '../useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
    <div>
      <label htmlFor='username'>Username</label>
      <input type='email' id='username' value={username} onChange={handleUsernameChange} />
      <button onClick={handleButtonClick}>Set User</button>
    </div>
  );
};

export default LoginPage;