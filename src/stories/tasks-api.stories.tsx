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
        const todolistID = '5fc95bb0-7f9a-491c-be99-74bc51677f92'
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

// export const CreateTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const title = 'React'
//         todolistAPI.createTodolist(title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

// export const DeleteTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todoListID = '2c4834df-8201-4012-91eb-749dad60fe2a'
//         todolistAPI.deleteTodolist(todoListID)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

// export const UpdateTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todoListID = 'eaa83b1a-fc51-46c2-ae80-8095a6249022'
//         const newTitle = 'REDUX'
//         todolistAPI.updateTodolist(todoListID, newTitle)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

