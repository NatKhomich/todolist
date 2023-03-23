import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {ButtonFilterType} from './App';
import s from './components/Todolist.module.css'

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
    const [error, setError] = useState<string|null>('')

    const [buttonName, setButtonName] = useState<ButtonFilterType> ( 'All')

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTitle(event.currentTarget.value)

    }

    const AllChangeFilterHandler = () => {
        props.filterTask('All')
        setButtonName('All')
    }

    const ActiveChangeFilterHandler = () => {
        props.filterTask('Active')
        setButtonName('Active')
    }

    const CompletedChangeFilterHandler = () => {
        props.filterTask('Completed')
        setButtonName('Completed')
    }

    /*const superFunction = (filterValue: ButtonFilterType) => {
        props.filterTask(filterValue)
    }*/

    /*const changeIsDoneHandler = (tId: string, newIsDone: boolean )=> {
        props.changeIsDone (tId, newIsDone)
    }*/

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTitle}
                           className={error ? s.error : ''}
                           onKeyDown={onKeyDownHandler}
                           onChange={onChangeHandler}/>
                    <button onClick={addTaskHandler}> +</button>
                </div>
                {error && <div className={s.errorMessage}> {error}  </div>}
                <ul>
                    {props.tasks.map(t => { //вынести map???

                        const onClickHandler = ()=> props.removeTask(t.id)

                        const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>)=> {
                            props.changeIsDone(t.id, e.currentTarget.checked)
                        }

                        return (
                            <li className={t.isDone ? s.isDone : ''} key={t.id}>
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
                    {/*<Button name={'All'} callBack={()=>superFunction('All')} />
                    <Button name={'Active'} callBack={()=>superFunction('Active')} />
                    <Button name={'Completed'} callBack={()=>superFunction('Completed')} />*/}

                    <button className={buttonName === 'All' ?  s.activeFilter: ''} onClick={AllChangeFilterHandler}>All</button>
                    <button className={buttonName === 'Active' ?  s.activeFilter: ''} onClick={ActiveChangeFilterHandler}>Active</button>
                    <button className={buttonName === 'Completed' ?  s.activeFilter: ''} onClick={CompletedChangeFilterHandler}>Completed</button>

                   {/* <button onClick={() => props.filterTask('Completed')}>Completed</button>*/}
                </div>
            </div>
        </div>
    )
}