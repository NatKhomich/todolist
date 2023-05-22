import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValueType} from '../App';

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: TasksType[]
    filter: FilterValueType

    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, newIsDone: boolean) => void
    filteredTasks: (filterValue: FilterValueType) => void
    addTasks: (newTitle: string) => void
}

export const TodoList: React.FC<TodoListType> = (props) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string|null>(null)

    const allFilteredTasksHandler = () => {
        props.filteredTasks('All')
    }

    const activeFilteredTasksHandler = () => {
        props.filteredTasks('Active')
    }

    const completedFilteredTasksHandler = () => {
        props.filteredTasks('Completed')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       //console.log(e.currentTarget.value)
        setError(null)
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        //console.log(e.key)
        if(e.key === 'Enter') {
            addTasksHandler()
        }
    }

    const addTasksHandler = () => {
        if(newTitle.trim() !== ''){
            props.addTasks(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle}
                       onChange={onChangeHandler}
                       className={error ? 'error' : ''}
                       onKeyDown={onKeyDownHandler}

                />
                <button onClick={addTasksHandler}> + </button>
                <div className={'errorMessage'}> {error} </div>
            </div>
            <ul>
                {props.tasks.map(el => {

                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDone)
                    }

                    return (
                        <li className={el.isDone ? 'opacityTask' : ''}
                            key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={changeTaskStatus}

                            />
                            <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)}> X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'colorButton' : ''} onClick={allFilteredTasksHandler}>All
                </button>
                <button className={props.filter === 'Active' ? 'colorButton' : ''}
                        onClick={activeFilteredTasksHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'colorButton' : ''}
                        onClick={completedFilteredTasksHandler}>Completed
                </button>
            </div>
        </div>
    )
}