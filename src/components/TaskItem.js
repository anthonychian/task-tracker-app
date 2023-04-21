import { Link } from 'react-router-dom';
import classes from './TaskItem.module.css';
import { doc,deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import Card from './Card';
import {useNavigate} from 'react-router-dom'
function TaskItem(props) {
  const history = useNavigate();
  const { id, title, description, status, duedate } = props;
  const handleDelete = () => {
    const docRef = doc(firestore, 'tasks', id);
  deleteDoc(docRef)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log('Error deleting task: ', error);
    });
    
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Status: {status}</p>
          <p>Due Date: {duedate}</p>
        </div>
        <div className={classes.actions}>
          <Link to={`/tasks/${id}`} className={classes.button}>
            Update
          </Link>
          
        </div>
        <div className={classes.actions}>
        <button onClick={handleDelete}>Delete</button>
        </div>
      </Card>
    </li>
  );
}

export default TaskItem;