import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';
import classes from '../components/NewTaskForm.module.css';

function AllTaskPage() {
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

  return (
    <>
      <div>
        <button onClick={() => handleSortBy('date')}>Sort by Date</button>
        <button onClick={() => handleSortBy('title')}>Sort by Title</button>
        <button onClick={() => handleSortBy('status')}>Sort by Status</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <TaskList tasks={tasks} />
      <Link to={`/new-task`} className={classes.button}>
        Add Task
      </Link>
      
    </>
  );
}

export default AllTaskPage;