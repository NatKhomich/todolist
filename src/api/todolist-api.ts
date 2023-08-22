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
    updateTodolist(todoListID: string, newTitle: string) {
       return instance.put<ResponseType>(`/todo-lists/${todoListID}`, newTitle)
    }
}

type TodolistType = {
    id: string
    title: string
    addedDate: Date
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    // fieldsErrors: string[]
}

/*type CreateTodolistResponseType<T> = {
    resultCode: number
    messages: string[],
    data: T
}

type DeleteTodolistResponseType<T> = {
    resultCode: number
    messages: string[]
        data: T
}

type UpdateTodolistResponseType<T> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}*/
