import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {ButtonFilterType} from './App';
import {Button} from './components/Button';

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

   /* const AllChangeFilterHandler = () => {
        props.filterTask('All')
    }

    const ActiveChangeFilterHandler = () => {
        props.filterTask('Active')
    }

    const CompletedChangeFilterHandler = () => {
        props.filterTask('Completed')
    }*/

    const superFunction = (filterValue: ButtonFilterType) => {
        props.filterTask(filterValue)
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
                    <Button name={'All'} callBack={()=>superFunction('All')} />
                    <Button name={'Active'} callBack={()=>superFunction('Active')} />
                    <Button name={'Completed'} callBack={()=>superFunction('Completed')} />

                    {/*<button onClick={()=>superFunction('All')}>All</button>
                    <button onClick={()=>superFunction('Active')}>Active</button>
                    <button onClick={()=>superFunction('Completed')}>Completed</button>*/}

                   {/* <button onClick={() => props.filterTask('Completed')}>Completed</button>*/}
                </div>
            </div>
        </div>
    )
}