import {TodoListPropsType} from '../App';

export const todoListsReducer = (state: TodoListPropsType[], action: TodoListsReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST' : {
            //const newTodoListID = v1()
            const newTodoList: TodoListPropsType = {id: action.payload.newTodoListID, title: action.payload.title, filter: 'All'}
            return  [newTodoList, ...state]

        }
        default: return state
    }
}

type TodoListsReducerType = RemoveTodoListsACType | AddTodoListACType

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

export const addTodoListAC = (title: string, newTodoListID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodoListID
        }
    } as const
}