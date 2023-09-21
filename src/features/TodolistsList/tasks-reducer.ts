import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType, SetErrorActionType, setStatusAC, SetStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(el => ({...el, entityStatus: 'idle'}))}
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]].map(el => ({
                    ...el,
                    entityStatus: 'idle'
                }))
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'CHANGE-TASKS-ENTITY-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.id ? {...el, entityStatus: action.status} : el)}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
export const changeTaskEntityStatusAC = (todolistId: string, id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TASKS-ENTITY-STATUS', todolistId, id, status
} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setStatusAC('succeeded'))
        })
        .catch((e) => {
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
            handleServerNetworkError(e.message, dispatch)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.succeed) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else handleServerAppError<{ item: TaskType }>(res.data, dispatch)
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === ResultCode.succeed) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setStatusAC('succeeded'))
                } else handleServerAppError(res.data, dispatch)
            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: TasksDomainType[]
}
export type TasksDomainType = TaskType & {
    entityStatus: RequestStatusType
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetStatusActionType
    | SetErrorActionType
    | ReturnType<typeof changeTaskEntityStatusAC>