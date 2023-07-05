import React from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import AddItemForm from './components/AddItemForm';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from './state/todoListsReducer';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './state/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

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

    /*let todoListID1 = v1()
    let todoListID2 = v1()*/

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    /*let [todoList, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ])*/

    /*let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })*/

    //tasks
    const removeTask = (todoListID: string, taskID: string) => {
        dispatch(RemoveTaskAC(todoListID, taskID))
    }
    const addTask = (todoListID: string, newTitle: string) => {
        dispatch(AddTaskAC(todoListID, newTitle))
    }
    const changeTaskStatus = (todoListID: string, taskID: string, newIsDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListID, taskID, newIsDone))
    }
    const changeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todoListID, taskID, newTitle))
    }

    //todolist
    const removeTodoList = (todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }
    const addTodoList = (newTitle: string) => {
        let action = AddTodoListAC(newTitle)
        dispatch(action)
    }
    const changeTodoListFilter = (todoListID: string, filter: FilterTaskType) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }
    const changeTodoListTitle = (todoListID: string, changeTitle: string) => {
        dispatch(ChangeTodoListTitleAC(todoListID, changeTitle))
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

    const todoListsComponents = todoLists.map(el => {

        const tasksForRender: TasksType[] = getFilteredTasksForRender(tasks[el.id], el.filter)

        return (

            <div className={'todo'}  key={el.id}>
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

                {/*<TodoListWitchRedux id={el.id}
                                    title={el.title}
                                    filter={el.filter}

                />*/}
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
