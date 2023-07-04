import {FilterTaskType, TodoListType} from '../App';
import {v1} from 'uuid';

export const todoListsReducer = (state: TodoListType[], action: ActionTodoListsType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(el => el.id !== action.payload.todoListID)

        case 'ADD-TODOLIST' :
            const newTodoList: TodoListType = {
                id: action.payload.todoListID,
                title: action.payload.title,
                filter: 'All'
            }
            return [newTodoList, ...state]

        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(el => el.id === action.payload.todoListID ? {
                ...el,
                title: action.payload.changeTitle
            } : el)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.todoListID ? {...el, filter: action.payload.newFilter} : el)

        default:
            return state
    }
}

export type ActionTodoListsType = RemoveTodoListsACType |
    AddTodoListACType |
    ChangeTodoListTitleACType |
    ChangeTodoListFilterACType

export type RemoveTodoListsACType = ReturnType<typeof RemoveTodoListAC>
export const RemoveTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListID
        }
    } as const
}

export type AddTodoListACType = ReturnType<typeof AddTodoListAC>
export const AddTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todoListID: v1()
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
export const ChangeTodoListTitleAC = (todoListID: string, changeTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListID,
            changeTitle
        }
    } as const
}

type ChangeTodoListFilterACType = ReturnType<typeof ChangeTodoListFilterAC>
export const ChangeTodoListFilterAC = (todoListID: string, newFilter: FilterTaskType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListID,
            newFilter
        }
    } as const
}


/*/!*type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>*!/
export type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    newFilter: FilterTaskType
}

//типизировать можно через return type либо обычная типизация
export const changeTodoListFilterAC = (id: string, newFilter: FilterTaskType): ChangeTodoListFilter => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        newFilter: newFilter
    }
}*/
