import { createContext, useState } from 'react';

//create a context, with createContext api
export const TaskContext = createContext();

const TaskProvider = (props) => {

    // this state will be shared with all components 
    const [taskList,setTaskList] = useState([]);

    const [finishedTasks, setFinishedTasks] = useState(0);

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
        <TaskContext.Provider value={[taskList, handleAddTask, handleDeleteTask,handleChangeTaskName,handleTaskFinish,finishedTasks]}>
        {/* <TaskContext.Provider value={taskList}> */}
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;