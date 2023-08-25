import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1'
})

export const tasksAPI = {
    getTask(todolistID: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistID}/tasks`, {title})
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todoListID: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListID}/tasks/${taskId}`, {title})
    }
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponse = {
    error: null | string
    totalCount: number
    items: TaskType[]
}

type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}