import {useState} from 'react';
import {todoListID1, todoListID2} from '../id-utils';
import {FilterTaskType, TodoListType} from '../AppWithCustomHooks';
import {v1} from 'uuid';

export const useTodoList = (onTodoListRemoved: (todoListID: string) => void,
                            addTasksForTodoList: (todoListID: string) => void
) => {

    let [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ])

    const addTodoList = (newTitle: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: newTitle, filter: 'All'}
        setTodoList([newTodoList, ...todoList])
        addTasksForTodoList(newTodoListID)
    }

    const removeTodoList = (todoListID: string) => {
        setTodoList(todoList.filter(el => el.id !== todoListID))
        onTodoListRemoved(todoListID)
    }

    const changeTodoListFilter = (todoListID: string, filter: FilterTaskType) => {
        setTodoList(todoList.map(el => el.id === todoListID ? {...el, filter: filter} : el))
    }

    const changeTodoListTitle = (todoListID: string, changeTitle: string) => {
        setTodoList(todoList.map(el => el.id === todoListID ? {...el, title: changeTitle} : el))
    }

    return {
        todoList,
        changeTodoListFilter,
        changeTodoListTitle,
        removeTodoList,
        addTodoList
    }
}