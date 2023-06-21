import {TasksStateType, TasksType} from '../App';
import {v1} from 'uuid';


export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {...state, [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)}

        case 'ADD-TASK':
            const newTask: TasksType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return  {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}

        default:
            return state
    }
}

type TasksReducerType = RemoveTaskACType | AddTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskID: string, todoListID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            todoListID
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (newTitle: string, todoListID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            newTitle,
            todoListID
        }
    } as const
}
