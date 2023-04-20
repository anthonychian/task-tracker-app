import TaskItem from "./TaskItem";
import classes from "./TaskList.module.css";

function TaskList(props) {
  console.log(props.tasks);
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
    </ul>
  );
}

export default TaskList;