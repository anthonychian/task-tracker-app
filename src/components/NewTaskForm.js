import { useRef } from "react";
import classes from './NewTaskForm.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from './Card';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function NewTaskForm(props) {
  const history = useNavigate();
  const titleInputRef = useRef();
  const statusInputRef = useRef();
  const descriptionInputRef = useRef();
  const [dueDate, setDueDate] = useState(new Date());

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDuedate = dueDate.toLocaleDateString('en-US');
    const enteredStatus = statusInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const TaskData = {
      title: enteredTitle,
      duedate: enteredDuedate,
      status: enteredStatus,
      description: enteredDescription,
      user: window.localStorage.getItem('user')
    };
    props.onAddTask(TaskData);
  }
  const backHandler =() =>{
    history("/",{replace:true})
  }
  return (
    
      <form className={classes.form} onSubmit={submitHandler}>
        <h1>Add New Task</h1>
        <div className={classes.control}>
          <label htmlFor="title"> Task Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
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
          <select id="status" ref={statusInputRef} required className={classes.dropdown}>
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
          />
        </div>
        <div className={classes.actions}>
          <button>Add Task</button>
          <button type="button" onClick={backHandler}>Exit</button>
        </div>
      </form>
  );
}
export default NewTaskForm;