import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
function TaskList(props) {
  const history = useNavigate();
  console.log(props.tasks);
  const handleNewTask=()=>{
    history("/new-task",{replace:true})
  }
  return (
    <ul className={classes.list}>
      {props.tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          duedate={task.duedate}
        />
      ))}
      <Card>
        <div className={classes.add} onClick={handleNewTask}>
          <div>+</div>
    <div>Add</div>
        
    </div></Card>
      
    </ul>
  );
}

export default TaskList;