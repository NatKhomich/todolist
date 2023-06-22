import {TasksStateType, TasksType} from '../App';
import {v1} from 'uuid';
import {AddTodoListACType, RemoveTodoListsACType} from './todoListsReducer';


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

        case 'ADD-TODOLIST': {
            return {
                ...state, [action.payload.todoListID] : []
            }
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.todoListID]
            return copyState
            //или
           /* let {[action.payload.todoListID] : [], ...rest} = state
            return rest*/
        }

        default:
            return state
    }
}

type TasksReducerType =
    RemoveTaskACType | AddTaskACType
    | ChangeTaskStatusACType | ChangeTaskTitleACType
    | AddTodoListACType | RemoveTodoListsACType

type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export const RemoveTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            todoListID
        }
    } as const
}

type AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            newTitle,
            todoListID
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListID,
            taskID,
            isDone
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export const ChangeTaskTitleAC = (todoListID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListID,
            taskID,
            title
        }
    } as const
}
