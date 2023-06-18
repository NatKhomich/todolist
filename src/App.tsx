import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';

export type TasksStateType = {
    [key: string]: TaskPropsType[]
}

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodoListPropsType = {
    id: string
    title: string
    filter: FilterTaskType
}

export type FilterTaskType = 'All' | 'Active' | 'Completed'

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoList, setTodoList] = useState<TodoListPropsType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }
    const addTask = (todoListID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const onChangeTaskStatus = (todoListID: string, taskID: string, newIsDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: newIsDone} : el)
        })
    }
    const changeTaskTitle = (todoListID: string, taskID: string, changeTitle: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: changeTitle} : el)
        })
    }

    //todolist
    const removeTodoList = (todoListID: string) => {
        setTodoList(todoList.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (newTitle: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListPropsType = {id: newTodoListID, title: newTitle, filter: 'All'}
        setTodoList([newTodoList, ...todoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodoListFilter = (todoListID: string, filter: FilterTaskType) => {
        setTodoList(todoList.map(el => el.id === todoListID ? {...el, filter: filter} : el))
    }
    const changeTodoListTitle = (todoListID: string, changeTitle: string) => {
        setTodoList(todoList.map(el => el.id === todoListID ? {...el, title: changeTitle} : el))
    }

    const getFilteredTasksForRender = (todoLists: TaskPropsType[], filterValue: FilterTaskType) => {
        if(filterValue === 'Active') {
            return todoLists.filter(el => !el.isDone)
        }
        if(filterValue === 'Completed') {
            return todoLists.filter(el => el.isDone)
        } else {
            return todoLists
        }
    }

    const todoListsComponents = todoList.map(el => {

            /*let filteredTasks = tasks[el.id]
            if (el.filter === 'Active') {
                filteredTasks = tasks[el.id].filter(el => !el.isDone)
            }
            if (el.filter === 'Completed') {
                filteredTasks = tasks[el.id].filter(el => el.isDone)
            }*/
            const tasksForRender: TaskPropsType[] = getFilteredTasksForRender(tasks[el.id], el.filter)

            return (
                <TodoList key={el.id}
                          todoListID={el.id}
                          title={el.title}
                          tasks={tasksForRender}
                          filter={el.filter}

                          removeTask={removeTask}
                          addTask={addTask}
                          onChangeTaskStatus={onChangeTaskStatus}
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

export default App;
