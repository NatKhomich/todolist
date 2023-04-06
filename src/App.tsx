import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';


export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: TasksType[]
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

    const removeTask = (todoListId: string, taskId: string) => { //удаление тасок
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }

    const addTask = (todoListId: string, newTitle: string) => { //добавление тасок
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (todoListId: string, newId: string, newIsDone: boolean) => { //изменение статуса таски
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === newId ? {...el, isDone: newIsDone} : el)
        })
    }

    const changeTodolistFilter = (todoListId: string, filter: FilterValuesType) => { //фильтрация тасок по кнопкам 'All' | 'Active'| 'Completed'
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: filter} : el))
    }

    const getFilteredTasks = (tasks: Array<TasksType>, filter: FilterValuesType): Array<TasksType> => {
        if (filter === 'Active') {
            return tasks.filter(el => !el.isDone)
        } else if (filter === 'Completed') {
            return tasks.filter(el => el.isDone)
        } else {
            return tasks
        }
    }

    const removeTodolist = (todoListId: string) => { //удаление тудулиста
        setTodoLists(todoLists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodolist = (newTitle: string) => { //добавление тудулиста
        const newID = v1()
        const newTodolist:TodolistType = {id: newID, title: newTitle, filter: 'All'}
        setTodoLists( [newTodolist,...todoLists] )
        setTasks( {...tasks, [newID]: []} )
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => { //изменение тасок по дабл клику
        setTasks( {...tasks, [todolistID]: tasks[todolistID].map( el => el.id === taskID ? {...el, title: newTitle} : el ) } )
    }

    const todoListsComponents = todoLists.map(el => {

        const filteredTasks = getFilteredTasks(tasks[el.id], el.filter)

        return (
            <div>
                <Todolist
                    key={el.id}
                    todoListId={el.id}
                    title={el.title}
                    filter={el.filter}
                    tasks={filteredTasks}

                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}

                    changeTodolistFilter={changeTodolistFilter}
                    removeTodolist={removeTodolist}

                    updateTask={updateTask}
                />
            </div>
        )
    })

    return (
        <div className="App">
            <AddItemForm
                callBack={addTodolist}

            />
            {todoListsComponents}
        </div>
    )
}

export default App;
