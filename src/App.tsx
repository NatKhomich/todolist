import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {releaseAllKeys} from '@testing-library/user-event/dist/keyboard/keyboardImplementation';
import { v1 } from 'uuid';

export type ButtonFilterType = 'All' | 'Active'| 'Completed'

function App() {

    let [tasks, setTasks] = useState(
        [
            { id: v1(), title: 'Html&CSS', isDone: true},
            { id: v1(), title: 'JS', isDone: true},
            { id: v1(), title: 'ReactJS', isDone: false},
            { id: v1(), title: 'Redux', isDone: false},
        ]
    )

    let [filterValue, setFilterValue] = useState( 'All' )

    const removeTask = (taskId: string) => { //удаление тасок
        setTasks( tasks.filter( (el)=> el.id !== taskId))
        /*tasks = tasks.filter( (el) => el.id !== taskId )
        setTasks(tasks)*/
    }

    const addTask = (newTitle: string) => { //добавление тасок
        const newTask = { id: v1(), title: newTitle, isDone: false}
        setTasks([ newTask, ...tasks ])
        /*const newObj = [ newTask, ...tasks ]
       setTasks(newObj)*/
    }

    const filterTask = (buttonName: ButtonFilterType) => { //фильтрация тасок по кнопкам 'All' | 'Active'| 'Completed'
        setFilterValue(buttonName)
    }

    let filteredTasks = tasks
    if (filterValue === 'Active') {
        filteredTasks = tasks.filter( el => el.isDone )
    }
    if (filterValue === 'Completed') {
        filteredTasks = tasks.filter( el => !el.isDone )
    }
    if (filterValue === 'All') {
        filteredTasks = tasks
    }

    return (
        <>
            <Todolist title = 'What to learn'
                      tasks = {filteredTasks}
                      removeTask = {removeTask}
                      filterTask = {filterTask}
                      addTask={addTask}
            />
        </>
        )
}

export default App;
