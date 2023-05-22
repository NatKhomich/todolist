import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';

function App() {

    const [tasks, setTasks] = useState( [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'RestAPI', isDone: false}
    ] )

    const removeTask = (taskID: string) => {
        //console.log(taskID)
        setTasks( tasks.filter(el => el.id !== taskID))
    }

    const changeTaskStatus = (taskID: string,newIsDone: boolean) => {
        //console.log(newIsDone)
        setTasks( tasks.map(el => el.id === taskID ? {...el, isDone: newIsDone} : el))
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasks}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}

            />
        </div>
    );
}

export default App;
