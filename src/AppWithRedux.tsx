import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from './state/todoListsReducer';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './state/tasksReducer';

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

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoList, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    //tasks
    const removeTask = (todoListID: string, taskID: string) => {
        dispatchToTasks(RemoveTaskAC(todoListID, taskID))
    }
    const addTask = (todoListID: string, newTitle: string) => {
        dispatchToTasks(AddTaskAC(todoListID, newTitle))
    }
    const changeTaskStatus = (todoListID: string, taskID: string, newIsDone: boolean) => {
        dispatchToTasks(ChangeTaskStatusAC(todoListID, taskID, newIsDone))
    }
    const changeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {
        dispatchToTasks(ChangeTaskTitleAC(todoListID, taskID, newTitle))
    }

    //todolist
    const removeTodoList = (todoListID: string) => {
        /*setTodoList(todoList.filter(el => el.id !== todoListID))
        delete tasks[todoListID]*/
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }
    const addTodoList = (newTitle: string) => {
        /*const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: newTitle, filter: 'All'}
        setTodoList([newTodoList, ...todoList])
        setTasks({...tasks, [newTodoListID]: []})*/
        let action = AddTodoListAC(newTitle)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }
    const changeTodoListFilter = (todoListID: string, filter: FilterTaskType) => {
        dispatchToTodoList(ChangeTodoListFilterAC(todoListID, filter))
    }
    const changeTodoListTitle = (todoListID: string, changeTitle: string) => {
        dispatchToTodoList(ChangeTodoListTitleAC(todoListID, changeTitle))
    }

    const getFilteredTasksForRender = (todoLists: TasksType[], filterValue: FilterTaskType) => {
        if (filterValue === 'Active') {
            return todoLists.filter(el => !el.isDone)
        }
        if (filterValue === 'Completed') {
            return todoLists.filter(el => el.isDone)
        } else {
            return todoLists
        }
    }

    const todoListsComponents = todoList.map(el => {

        const tasksForRender: TasksType[] = getFilteredTasksForRender(tasks[el.id], el.filter)

        return (
            <TodoList key={el.id}
                      todoListID={el.id}
                      title={el.title}
                      tasks={tasksForRender}
                      filter={el.filter}

                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}

                      removeTodoList={removeTodoList}
                      changeTodoListFilter={changeTodoListFilter}
                      changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (

        <div className="App">
            <AddItemForm addNewItem={addTodoList}/>

            {todoListsComponents}
        </div>
    );
}

export default AppWithRedux;
