import React, {ChangeEvent, useEffect, useState} from 'react'
import {tasksAPI} from '../api/task-api';

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<any>('')

    const onChangeHAndler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHandler = () => {
        const todolistID = '46a167f4-9d96-46d8-9094-b3308641041f'
        tasksAPI.getTask(todolistID)
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                setState(err.message)
            })
    }

    return (
        <>
            {state ? <div>{JSON.stringify(state)}</div> : ''}

            <input value={value} onChange={onChangeHAndler} placeholder={'todolist ID'}/>
            <button onClick={onClickHandler}> GET TASKS</button>
        </>
    )
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = '46a167f4-9d96-46d8-9094-b3308641041f'
        const title = 'Task Task'
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
        const todolistID = '46a167f4-9d96-46d8-9094-b3308641041f'
        const taskID = '5bbecfeb-0506-4237-9f25-8953e0ec7da0'
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
        const todoListID = '46a167f4-9d96-46d8-9094-b3308641041f'
        const taskID = 'd48c4583-868a-40a5-af33-1b500cd9e4de'
        const title = 'TypeScript'
        tasksAPI.updateTask(todoListID, taskID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

