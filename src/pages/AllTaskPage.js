import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import TaskList from '../components/TaskList';

import { useNavigate } from 'react-router-dom';

import classes from './AllTaskPage.module.css';

function AllTaskPage() {
  const history = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  useEffect(() => {
    const user = window.localStorage.getItem('user');
    const taskCollection = query(collection(firestore, 'tasks'), where('user', '==', user));
  
    let sortedCollection;
    if (sortBy === 'date') {
      sortedCollection = query(taskCollection, orderBy('duedate', sortOrder));
    } else if (sortBy === 'title') {
      sortedCollection = query(taskCollection, orderBy('title', sortOrder));
    } else if (sortBy === 'status') {
      sortedCollection = query(taskCollection, orderBy('status', sortOrder));
    } else {
      sortedCollection = taskCollection;
    }
  
    getDocs(sortedCollection)
      .then((querySnapshot) => {
        const taskList = [];
        querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            ...doc.data(),
          };
          taskList.push(task);
        });
        setTasks(taskList);
      })
      .catch((error) => {
        console.log('Error getting tasks: ', error);
      });
  }, [sortBy, sortOrder]);

  const handleSortBy = (value) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(value);
      setSortOrder('asc');
    }
  };
  const handleLogout = () => {
    window.localStorage.setItem("user", '""')
    window.location.reload();
  }
  const handleNewTask=()=>{
    history("/new-task",{replace:true})
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <button className={classes.button} onClick={() => handleSortBy('date')}>Sort by Date</button>
          <button className={classes.button} onClick={() => handleSortBy('title')}>Sort by Title</button>
          <button className={classes.button} onClick={() => handleSortBy('status')}>Sort by Status</button>
          </div>
          <div>
          <button className={classes.logout} onClick={handleLogout}>Logout</button>
          </div>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default AllTaskPage;