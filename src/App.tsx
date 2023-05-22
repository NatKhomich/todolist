import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState( [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'RestAPI', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>('All')

    const removeTask = (taskID: string) => {
        //console.log(taskID)
        setTasks( tasks.filter(el => el.id !== taskID))
    }

    const changeTaskStatus = (taskID: string,newIsDone: boolean) => {
        //console.log(newIsDone)
        setTasks( tasks.map(el => el.id === taskID ? {...el, isDone: newIsDone} : el))
    }

    let filterTask = tasks

    if(filter === 'Active'){
        filterTask = tasks.filter(el => !el.isDone)
    }
    if(filter === 'Completed'){
        filterTask = tasks.filter(el => el.isDone)
    }

    const filteredTasks = (filterValue: FilterValueType) => {
        //console.log(filterValue)
        setFilter(filterValue)
    }

    const addTasks = (newTitle: string) => {
       const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={filterTask}
                      filter={filter}

                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      filteredTasks={filteredTasks}
                      addTasks={addTasks}

            />
        </div>
    );
}

export default App;
