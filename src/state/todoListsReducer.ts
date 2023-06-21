import {FilterTaskType, TodoListType} from '../App';
import {v1} from 'uuid';

export const todoListsReducer = (state: TodoListType[], action: TodoListsReducerType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(el => el.id !== action.payload.id)

        case 'ADD-TODOLIST' :
            const newTodoListID = v1()
            const newTodoList: TodoListType = {id: newTodoListID, title: action.payload.title, filter: 'All'}
            return [newTodoList, ...state]

        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.changeTitle} : el)

        //без payload, обычная типизация (без ReturnType)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.newFilter} : el)

        default:
            return state
    }
}

type TodoListsReducerType = RemoveTodoListsACType |
    AddTodoListACType |
    ChangeTodoListTitleACType |
    ChangeTodoListFilter

type RemoveTodoListsACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (id: string, changeTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            changeTitle
        }
    } as const
}

/*type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>*/

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
}
