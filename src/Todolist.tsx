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
    changeIsDone: (id: string, newIsDone: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle)
            setNewTitle('')
        }
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
                    {props.tasks.map(t => { //вынести map???

                        const onClickHandler = ()=> props.removeTask(t.id)

                        const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>)=> {
                            console.log(e.currentTarget.checked)
                            props.changeIsDone(t.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeIsDoneHandler}

                                />
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}> X </button>
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