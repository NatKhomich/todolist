import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const heading1 = 'What to learn1'

    const tasks1 = [
        { id: 1, title: 'Html&CSS', isDone: true},
        { id: 2, title: 'JS', isDone: true},
        { id: 3, title: 'ReactJS', isDone: false},
    ]
    const tasks2 = [
        { id: 1, title: 'Hello world', isDone: true},
        { id: 2, title: 'I am Happy', isDone: false},
        { id: 3, title: 'Yo', isDone: false},
        { id: 4, title: 'Yo2', isDone: false}
    ]

/*    let newArr = [1,2,3,4]*/

    return (
        <>
            <Todolist heading = {heading1} body = {100500} tasks = {tasks1}/>
            <Todolist heading = {'What to learn2'} tasks = {tasks2}/>
        </>
        )
}

export default App;
