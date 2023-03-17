import React, {useState, KeyboardEvent} from 'react';
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

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTitle} onKeyDown={onKeyDownHandler}
                           onChange={(event) => setNewTitle(event.currentTarget.value)}/>
                    <button onClick={addTaskHandler}> +</button>

                    {/*<button onClick={(event) => {
                        props.addTask(newTitle)
                        setNewTitle('')
                    }}> + </button>*/}

                </div>
                <ul>
                    {props.tasks.map(el => {
                        return (
                            <li key={el.id}>
                                <button onClick={() => props.removeTask(el.id)}> +</button>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })}
                    {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}

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