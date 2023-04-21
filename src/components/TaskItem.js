import classes from './TaskItem.module.css';
import { doc,deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import Card from './Card';
import {useNavigate} from 'react-router-dom';

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
  const handleUpdate = () => {
    history(`/tasks/${id}`);
  };
  
  return (
      <Card>
        <div className={`${classes.content} ${classes.center}`}>
        <h2 className={classes.title}>{title}</h2>
        <div className={classes.meta}> 
        <div className={classes.duedate}>{new Date(duedate).toLocaleDateString()}</div>
        <div className={classes.status}>{status}</div>
        <p className={classes.description}>{description}</p>
      </div>
        </div>
        <div className={classes.actions}>
        <button className={`${classes.button} ${classes.left}`} onClick={handleUpdate}>
            Update
          </button>
          <button className={`${classes.deleteButton} ${classes.right}`} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Card>
  );
}

export default TaskItem;