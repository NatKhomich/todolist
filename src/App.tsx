import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {releaseAllKeys} from '@testing-library/user-event/dist/keyboard/keyboardImplementation';
import {v1} from 'uuid';
import {Simulate} from 'react-dom/test-utils';
import copy = Simulate.copy;

export type FilterValuesType = 'All' | 'Active' | 'Completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId1: string]: TasksType[]
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'Html&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ]
    })

    /*let [tasks, setTasks] = useState( [
            { id: v1(), title: 'Html&CSS', isDone: true},
            { id: v1(), title: 'JS', isDone: true},
            { id: v1(), title: 'ReactJS', isDone: false},
            { id: v1(), title: 'Redux', isDone: false},
        ]
    )*/

    const removeTask = (todoListId: string, taskId: string) => { //удаление тасок
        /* const tasksForUpdate = tasks[todoListId]
         const updatedTasks = tasksForUpdate.filter( el => el.id !== taskId )
         const copyTasks = { ...tasks }
         copyTasks[todoListId] = updatedTasks
         setTasks( copyTasks )*/
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
        /*setTasks( tasks.filter( (el)=> el.id !== taskId))*/
    }

    const addTask = (todoListId: string, newTitle: string) => { //добавление тасок
        const newTask = {id: v1(), title: newTitle, isDone: false}
        /*setTasks([ newTask, ...tasks ])*/
        /*const tasksForUpdate = tasks[todoListId]
        const updatedTasks = [newTask, ...tasksForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks( copyTasks )*/

        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (todoListId: string, newId: string, newIsDone: boolean) => {
        /* setTasks( tasks.map(el => el.id === newId ? {...el, isDone: newIsDone} : el) )*/
       /* const tasksForUpdate = tasks[todoListId]
        const updatedTasks = tasksForUpdate.map( el => el.id === newId ? {...el, isDone: newIsDone} : el )
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks( copyTasks )*/

        setTasks( {...tasks, [todoListId] : tasks[todoListId].map( el => el.id === newId ? {...el, isDone: newIsDone} : el )})
    }

    const changeTodolistFilter = (todoListId: string, filter: FilterValuesType) => { //фильтрация тасок по кнопкам 'All' | 'Active'| 'Completed'
        /* setFilterValue(buttonName)*/
        setTodoLists( todoLists.map( el => el.id === todoListId ? {...el, filter: filter } : el ))
    }

    const removeTodolist = (todoListId: string) => {
        setTodoLists( todoLists.filter( el => el.id !== todoListId ))
        delete tasks[todoListId]
    }

    let filteredTasks = tasks
    if (filterValue === 'Active') {
        filteredTasks = tasks.filter(el => el.isDone)
    }
    if (filterValue === 'Completed') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filterValue === 'All') {
        filteredTasks = tasks
    }

    return (
        <>
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeTodolistFilter={changeTodolistFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      todoListId={todoListId}
            />
        </>
    )
}

export default App;
