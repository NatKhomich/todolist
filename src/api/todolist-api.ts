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
        return instance.get('/todo-lists')
    },
    createTodolist(title: string) {
       return instance.post('/todo-lists', {title})
    },
    deleteTodolist(todoListID: string) {
      return  instance.delete(`/todo-lists/${todoListID}`)
    },
    updateTodolist(todoListID: string, newTitle: string) {
       return instance.put(`/todo-lists/${todoListID}`, newTitle)
    }
}
