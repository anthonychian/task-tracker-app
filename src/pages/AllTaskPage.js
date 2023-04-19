import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import Card from '../components/Card';

function AllTaskPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const taskCollection = collection(firestore, 'tasks');
    getDocs(taskCollection)
      .then((querySnapshot) => {
        const taskList = [];
        querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            ...doc.data().taskData,
          };
          taskList.push(task);
        });
        setTasks(taskList);
      })
      .catch((error) => {
        console.log('Error getting tasks: ', error);
      });
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task.id}>{task.title} {task.description}{task.status}{task.duedate}</Card>
      ))}
    </div>
  );
}

export default AllTaskPage;