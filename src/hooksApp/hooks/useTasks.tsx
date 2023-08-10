import {useState} from 'react';
import {todoListID1, todoListID2} from '../id-utils';
import {v1} from 'uuid';
import {TasksStateType} from '../AppWithCustomHooks';

export const useTasks = () => {

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

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }

    const addTask = (todoListID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const changeTaskStatus = (todoListID: string, taskID: string, newIsDone: boolean) => {
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

    const removeTasksForTodoList = (todoListID: string) => {
        delete tasks[todoListID]
    }

    const addTasksForTodoList = (todoListID: string) => {
        setTasks({...tasks, [todoListID]: []})
    }

    return {
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        removeTasksForTodoList,
        addTasksForTodoList
    }
}