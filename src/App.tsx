import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const shapka1 = 'What to learn'

    const tasks1 = [
        { id: 1, title: 'Html&CSS', isDone: true},
        { id: 2, title: 'JS', isDone: true},
        { id: 3, title: 'ReactJS', isDone: false},
    ]
    const tasks2 = [
        { id: 1, title: 'Hello world', isDone: true},
        { id: 2, title: 'I am Happy', isDone: false},
        { id: 3, title: 'Yo', isDone: false},
        { id: 4, title: 'Yo2', isDone: false},
    ]


    return (
        <div>
            <Todolist shapka = {shapka1} body = {100200} tasks = {tasks1}/>
            <Todolist shapka = {'What to learn'} tasks = {tasks2} />
        </div>
        )
}

export default App;
