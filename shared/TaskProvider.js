import { createContext, useState } from 'react';
import XDate from 'xdate';

//create a context, with createContext api
export const TaskContext = createContext();

const TaskProvider = (props) => {

    // this state will be shared with all components 
    const [taskList,setTaskList] = useState([
        {text:"Finish portfolio website",date:"2023-02-21",progress:"TO DO",time:"12AM-12AM",dateLong:"February 21, 2023",category:"Personal",desc:"Add CSS styling to the front end and connect it to the backend",finished:false},
        {text:"Go to the gym",date:"2023-02-20",progress:"TO DO",time:"12AM-12AM",dateLong:"February 20, 2023",category:"Personal",desc:"Workout back/biceps",finished:false},
        {text:"Clean car",date:"2023-02-20",progress:"TO DO",time:"12AM-12AM",dateLong:"February 20, 2023",category:"Personal",desc:"",finished:false},
    ]);

    const [finishedTasks, setFinishedTasks] = useState(0);

    const [goalList, setGoalList] = useState([
        {name:"Read for 30 mins",progress:0,progressGoal:7,deadline:"Week",dateCreated:"2023-02-18T23:10:19.383Z"},
        {name:"Clean the washroom",progress:0,progressGoal:4,deadline:"Month",dateCreated:"2023-03-18T23:10:19.383Z"},
    ]);

    const handleAddGoal = (newGoal) => {
        // Each task has a key
        newGoal.key = Math.random().toString();
        // Prepend new task to current list of tasks, update state
        setGoalList((currentGoalList) => {
            return [newGoal, ...currentGoalList];
        })
    }

    const handleSuccessGoal = (goalIndex, value, dateCreated) => {
        let goalListCopy = [...goalList];
        let oldgoal = goalListCopy[goalIndex];
        if(oldgoal.progress+value <= oldgoal.progressGoal ) {
            oldgoal.progress += value;
        }
        setGoalList(goalListCopy);
    }


    const handleAddTask = (newTask) => {
        // Each task has a key
        newTask.key = Math.random().toString();
        // Prepend new task to current list of tasks, update state
        setTaskList((currentTaskList) => {
            return [newTask, ...currentTaskList];
        })
    }

    const handleDeleteTask = (taskIndex,taskName,taskComplete) => {
        let tasksListCopy = [...taskList];
        if(taskComplete) {
            setFinishedTasks(finishedTasks-1);
        }
        tasksListCopy.splice(taskIndex,1);
        setTaskList(tasksListCopy);
    }

    const handleChangeTaskName = (taskIndex, newName) => {
        let tasksListCopy = [...taskList];
        let oldtask = tasksListCopy[taskIndex];
        oldtask.text = newName;
        setTaskList(tasksListCopy);
    }

    // Updates task progress to COMPLETE then shifts it to the last item in the list
    const handleTaskFinish = (taskIndex,newProgress) => {
        let tasksListCopy = [...taskList];
        let updatedTask = tasksListCopy[taskIndex];
        // Remove unchanged task from the array
        // tasksListCopy.splice(taskIndex,1);
        updatedTask.progress = newProgress;
        if(newProgress == "COMPLETE") {
            updatedTask.finished = true;
            setFinishedTasks(finishedTasks+1);
        }
        else {
            updatedTask.finished = false;
            setFinishedTasks(finishedTasks-1);
        }
        // Shift updated task to last in array
        // setTaskList([...tasksListCopy,updatedTask]);
        setTaskList(tasksListCopy);
    }


    return (
        // this is the provider providing state
        <TaskContext.Provider value={[taskList, handleAddTask, handleDeleteTask,handleChangeTaskName,handleTaskFinish,finishedTasks, goalList,handleAddGoal,handleSuccessGoal]}>
        {/* <TaskContext.Provider value={taskList}> */}
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;