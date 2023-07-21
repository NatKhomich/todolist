import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from './state/todoListsReducer';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './state/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {AddItemForm} from './components/AddItemForm';

export type TasksStateType = {
    [key: string]: TasksType[]
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterTaskType
}

export type FilterTaskType = 'All' | 'Active' | 'Completed'


function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    //tasks
    const removeTask = useCallback((todoListID: string, taskID: string) => {
        dispatch(RemoveTaskAC(todoListID, taskID))
    },[dispatch])
    const addTask = useCallback((todoListID: string, newTitle: string) => {
        dispatch(AddTaskAC(todoListID, newTitle))
    }, [dispatch])
    const changeTaskStatus =useCallback((todoListID: string, taskID: string, newIsDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListID, taskID, newIsDone))
    },[dispatch])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todoListID, taskID, newTitle))
    },[dispatch])

    //todolist
    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    },[dispatch])
     const addTodoList = useCallback ((newTitle: string) => {
        let action = AddTodoListAC(newTitle)
        dispatch(action)
    },[dispatch])

    const changeTodoListFilter =useCallback((todoListID: string, filter: FilterTaskType) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    },[dispatch])
    const changeTodoListTitle =useCallback((todoListID: string, changeTitle: string) => {
        dispatch(ChangeTodoListTitleAC(todoListID, changeTitle))
    },[dispatch])


    const todoListsComponents = todoLists.map(el => {

        return (
            <div className={'todo'}  key={el.id}>
                <TodoList key={el.id}
                          todoListID={el.id}
                          title={el.title}
                          tasks={tasks[el.id]}
                          filter={el.filter}

                          removeTask={removeTask}
                          addTask={addTask}
                          changeTaskStatus={changeTaskStatus}
                          changeTaskTitle={changeTaskTitle}

                          removeTodoList={removeTodoList}
                          changeTodoListFilter={changeTodoListFilter}
                          changeTodoListTitle={changeTodoListTitle}
                />
                {/*<TodoListWitchRedux id={el.id} title={el.title} filter={el.filter}/>*/}
            </div>
        )
    })

    return (

        <div className="App">
            <div className={'item'}>
                <AddItemForm addNewItem={addTodoList}/>
            </div>
            {todoListsComponents}
        </div>
    );
}

export default AppWithRedux;
