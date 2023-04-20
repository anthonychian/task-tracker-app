import React from 'react'
import { firestore } from '../firebase';
import {addDoc,collection} from "@firebase/firestore"
import {useNavigate} from 'react-router-dom'
import NewTaskForm from '../components/NewTaskForm';
const NewTaskPage = () => {

        const history = useNavigate();
        const ref = collection(firestore,"tasks")
        function addTaskHandler(taskData){
            try{
                addDoc(ref,taskData).then(history("/",{replace:true}));
                
            }catch{
                console.log("error");
            }
        }
        
      return <section>
        <h1>Add New Task</h1>
         <NewTaskForm onAddTask={addTaskHandler}/>
      </section>;
    }

export default NewTaskPage