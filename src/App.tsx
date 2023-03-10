import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {releaseAllKeys} from '@testing-library/user-event/dist/keyboard/keyboardImplementation';

function App() {

    /*let tasks1 = [
        { id: 1, title: 'Html&CSS', isDone: true},
        { id: 2, title: 'JS', isDone: true},
        { id: 3, title: 'ReactJS', isDone: false},
    ]*/

    let [tasks1, setTasks] = useState(
        [
            { id: 1, title: 'Html&CSS', isDone: true},
            { id: 2, title: 'JS', isDone: true},
            { id: 3, title: 'ReactJS', isDone: false},
        ]
    )

    let [filterValue, setFilterValue] = useState( 'All' )

    const removeTask = (taskId: number) => { //удаление тасок
        setTasks( tasks1.filter( (el)=> el.id !== taskId))
        /*tasks1 = tasks1.filter( (el) => el.id !== taskId )
        setTasks(tasks1)*/
    }
    const filterTask = (buttonName: string) => {
        setFilterValue(buttonName)
    }

    let filteredTasks = tasks1
    if (filterValue === 'Active') {
        filteredTasks = tasks1.filter( el => el.isDone )
    }
    if (filterValue === 'Completed') {
        filteredTasks = tasks1.filter( el => !el.isDone )
    }
    if (filterValue === 'All') {
        filteredTasks = tasks1
    }

    return (
        <>
            <Todolist title = 'What to learn'
                      tasks = {filteredTasks}
                      removeTask = {removeTask}
                      filterTask = {filterTask}
            />
        </>
        )
}

export default App;
