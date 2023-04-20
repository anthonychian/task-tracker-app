import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';
import classes from '../components/NewTaskForm.module.css';

function AllTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    let taskCollection;

    if (sortBy === 'date') {
      taskCollection = query(collection(firestore, 'tasks'), orderBy('duedate'));
    } else if (sortBy === 'title') {
      taskCollection = query(collection(firestore, 'tasks'), orderBy('title'));
    } else if (sortBy === 'status') {
      taskCollection = query(collection(firestore, 'tasks'), orderBy('status'));
    } else {
      taskCollection = collection(firestore, 'tasks');
    }

    getDocs(taskCollection)
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
  }, [sortBy]);

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  return (
    <>
      <div>
        <button onClick={() => handleSortBy('date')}>Sort by Date</button>
        <button onClick={() => handleSortBy('title')}>Sort by Title</button>
        <button onClick={() => handleSortBy('status')}>Sort by Status</button>
      </div>
      <TaskList tasks={tasks} />
      <Link to={`/new-task`} className={classes.button}>
        Add Task
      </Link>
    </>
  );
}

export default AllTaskPage;