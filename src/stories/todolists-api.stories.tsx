import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}


export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                setState(err.message)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'My Todolist'
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '84cf9645-bbda-4f6b-a420-5d0f86d9ca3c'
        todolistAPI.deleteTodolist(todoListID)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '46a167f4-9d96-46d8-9094-b3308641041f'
        const title = '<<REDUX>>'
        /*axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListID}`, {title: 'hello'}, {withCredentials: true})
            .then(res => {
                setState(res.data)
            })*/
        todolistAPI.updateTodolist(todoListID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

