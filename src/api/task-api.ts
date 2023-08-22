import axios from 'axios';

//объект дефолтных настроек. и от него уже делаем запрос
const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1'
    }
)

export const tasksAPI = {
    getTask(todolistID: string) {
        return instance.get(`/todo-lists/${todolistID}/tasks`)
    },
    // createTask(title: string) {
    //    return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title})
    // },
    // deleteTask(todoListID: string) {
    //   return  instance.delete<ResponseType>(`/todo-lists/${todoListID}`)
    // },
    // updateTask(todoListID: string, newTitle: string) {
    //    return instance.put<ResponseType>(`/todo-lists/${todoListID}`, newTitle)
    // }
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

