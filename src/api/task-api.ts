import axios from 'axios';

//объект дефолтных настроек. и от него уже делаем запрос
const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1'
    })

export const tasksAPI = {
    getTask(todolistID: string) {
        return instance.get(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post(`/todo-lists/${todolistID}/tasks`, {title})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todoListID: string, taskId: string, newTitle: string) {
        return instance.put(`/todo-lists/${todoListID}/tasks/${taskId}`, newTitle)
    }
}

type TaskType = {
    error: null
    items: []
    totalCount: 0
}

// type TodolistType = {
//     id: string
//     title: string
//     addedDate: Date
//     order: number
// }
//
// type ResponseType<T = {}> = {
//     resultCode: number
//     messages: string[]
//     data: T
//     // fieldsErrors: string[]
// }

