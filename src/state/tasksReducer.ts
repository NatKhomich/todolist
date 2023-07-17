import {TasksStateType, TasksType} from '../App';
import {v1} from 'uuid';
import {AddTodoListACType, RemoveTodoListsACType, todoListID1, todoListID2} from './todoListsReducer';

const initialState: TasksStateType = {
    [todoListID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerType): TasksStateType => {
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
            todoListID,
            taskID
        }
    } as const
}

type AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            newTitle
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
