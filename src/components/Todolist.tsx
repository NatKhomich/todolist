import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from '../App';
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';


type TodolistPropsType = {
    todoListId: string
    title: string;
    filter: FilterValuesType
    tasks: TasksType[]

    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, newTitle: string) => void
    changeTaskStatus: (todoListId: string, id: string, newIsDone: boolean) => void

    changeTodolistFilter: (todoListId: string, filter: FilterValuesType) => void
    removeTodolist: (todoListId: string) => void

    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    //const [newTitle, setNewTitle] = useState('')
    //const [error, setError] = useState<string | null>('')

    const [buttonName, setButtonName] = useState<FilterValuesType>('All')

    /*const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(props.todoListId, newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }*/
    /* const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
         if (event.key === 'Enter') {
             addTaskHandler()
         }
     }*/
    /*const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTitle(event.currentTarget.value)

    }*/

    const AllChangeFilterHandler = () => {
        props.changeTodolistFilter(props.todoListId, 'All')
        setButtonName('All')
    }

    const ActiveChangeFilterHandler = () => {
        props.changeTodolistFilter(props.todoListId, 'Active')
        setButtonName('Active')
    }

    const CompletedChangeFilterHandler = () => {
        props.changeTodolistFilter(props.todoListId, 'Completed')
        setButtonName('Completed')
    }

    const addTaskHandler = (title: string) => { //функция посредник
        props.addTask(props.todoListId, title)
    }


    /*const superFunction = (filterValue: ButtonFilterType) => {
        props.filterTask(filterValue)
    }*/

    return (
        <div className="todoList">
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.todoListId)}> X</button>
            </h3>

            <AddItemForm callBack={addTaskHandler}/>
            {/* <div>
                <input value={newTitle}
                       className={error ? s.error : ''}
                       onKeyDown={onKeyDownHandler}
                       onChange={onChangeHandler}/>
                <button onClick={addTaskHandler}> +</button>
            </div>
            {error && <div className={s.errorMessage}> {error}  </div>}*/}
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListId, t.id)
                    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked)
                    }

                    const updateTaskHandler = (newTitle: string) => {
                        props.updateTask(props.todoListId, t.id, newTitle)
                    }


                    return (
                        <li className={t.isDone ? s.isDone : ''} key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeIsDoneHandler}

                            />
                            <EditableSpan oldTitle={t.title} callBack={updateTaskHandler}/>
                            <button onClick={onClickHandler}> X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                {/*<Button name={'All'} callBack={()=>superFunction('All')} />
                    <Button name={'Active'} callBack={()=>superFunction('Active')} />
                    <Button name={'Completed'} callBack={()=>superFunction('Completed')} />*/}

                <button className={buttonName === 'All' ? s.activeFilter : ''}
                        onClick={AllChangeFilterHandler}>All
                </button>
                <button className={buttonName === 'Active' ? s.activeFilter : ''}
                        onClick={ActiveChangeFilterHandler}>Active
                </button>
                <button className={buttonName === 'Completed' ? s.activeFilter : ''}
                        onClick={CompletedChangeFilterHandler}>Completed
                </button>
            </div>
        </div>
    )
}