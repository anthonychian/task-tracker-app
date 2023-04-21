import React from 'react'
import {useNavigate} from 'react-router-dom'
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import classes from '../components/NewTaskForm.module.css'
import { useRef, useEffect,useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTaskPage = () => {
  const history = useNavigate();
  const titleInputRef = useRef();
  const statusInputRef = useRef();
  const descriptionInputRef = useRef();
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const docRef = doc(firestore,'tasks',window.location.pathname.split('/').pop());
  const backHandler =() =>{
    history("/",{replace:true})
  }

  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()){
        const task= docSnap.data();
        setTitle(task.title)
        setDescription(task.description)
        setStatus(task.status)
        setDueDate(new Date(Date.parse(task.duedate)))
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }, []);

  function updateHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredStatus = statusInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`;
    const TaskData = {
      title: enteredTitle,
      duedate: enteredDate,
      status: enteredStatus,
      description: enteredDescription,
    };
    updateDoc(docRef,TaskData).then(history("/",{replace:true}))
  };

  return (
    <form className={classes.form} onSubmit={updateHandler}>
      <h2>Update The Task</h2>
      <div className={classes.control}>
        <label htmlFor="title"> Task Title</label>
        <input type="text" required id="title" ref={titleInputRef} defaultValue={title} />
      </div>
      <div className={classes.control}>
        <label htmlFor="duedate"> Task Due Date</label>
        <DatePicker
          id="duedate"
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="MM/dd/yyyy"
          className={classes.datepicker}
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="status">Task Status</label>
        <select
          id="status"
          ref={statusInputRef}
          required
          className={classes.dropdown}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">Select status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="not-started">Not Started</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="description"> Description</label>
        <textarea
          id="description"
          required
          rows="5"
          ref={descriptionInputRef}
          defaultValue={description}
        />
      </div>
      <div className={classes.actions}>
        <button>Update Task</button>
        <button type="button" onClick={backHandler}>Exit</button>
      </div>
    </form>
  )
}

export default UpdateTaskPage