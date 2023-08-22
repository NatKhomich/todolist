import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from '../api/todolist-api';
import {tasksAPI} from '../api/task-api';

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const todolistID = '5fc95bb0-7f9a-491c-be99-74bc51677f92'
        const todolistID = 'eaa83b1a-fc51-46c2-ae80-8095a6249022'
        tasksAPI.getTask(todolistID)
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                setState(err.message)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '6de26003-91a6-4e8c-be01-b74b93cc3a89'
        const title = 'REDUX'
        tasksAPI.createTask(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '74971926-7a42-42cb-92f9-8dc421cf5693'
        const taskID = 'a3578810-f9f9-4ccb-abdc-ef92d07f499f'
        tasksAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '6de26003-91a6-4e8c-be01-b74b93cc3a89'
        const taskID = '0a4dad41-a718-4dac-94d5-7a9b0e1f9925'
        const newTitle = 'TypeScript'
        tasksAPI.updateTask(todoListID, taskID, newTitle)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

