import axios from 'axios';

//объект дефолтных настроек. и от него уже делаем запрос
const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1'
    }
)

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(title: string) {
       return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title})
    },
    deleteTodolist(todoListID: string) {
      return  instance.delete<ResponseType>(`/todo-lists/${todoListID}`)
    },
    updateTodolist(todoListID: string, title: string) {
       return instance.put<ResponseType>(`/todo-lists/${todoListID}`, {title})
    }
}

type TodolistType = {
    id: string
    title: string
    addedDate: Date
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
    // fieldsErrors: string[]
}
