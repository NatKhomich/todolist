import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {ButtonFilterType} from './App';

type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string;
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    filterTask: (buttonName: ButtonFilterType) => void
    addTask: (newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    console.log(newTitle)

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)

    }

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTitle}
                           onKeyDown={onKeyDownHandler}
                           onChange={onChangeHandler}/>
                    <button onClick={addTaskHandler}> +</button>
                </div>
                <ul>
                    {props.tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => removeTaskHandler(t.id)}> X </button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => props.filterTask('All')}>All</button>
                    <button onClick={() => props.filterTask('Active')}>Active</button>
                    <button onClick={() => props.filterTask('Completed')}>Completed</button>
                </div>
            </div>
        </div>
    )

}