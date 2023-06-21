import {TasksStateType, TasksType} from '../App';
import {v1} from 'uuid';


export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)}
        }

        case 'ADD-TASK': {
            const newTask: TasksType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return  {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        }

        case 'CHANGE-TASK-STATUS': {
            return {...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                    ? {...el, isDone: action.payload.isDone}
                    : el)}
        }

        case 'CHANGE-TASK-TITLE': {
            return {...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                    ? {...el, title: action.payload.title}
                    : el)}
        }

        default:
            return state
    }
}

type TasksReducerType =
    RemoveTaskACType | AddTaskACType |
    ChangeTaskStatusACType | ChangeTaskTitleACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            todoListID
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            newTitle,
            todoListID
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListID,
            taskID,
            isDone
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListID,
            taskID,
            title
        }
    } as const
}
