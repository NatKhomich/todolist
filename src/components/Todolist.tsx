import React, {useState, ChangeEvent} from 'react';
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

    updateTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [buttonName, setButtonName] = useState<FilterValuesType>('All')

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

    const addTaskHandler = (newTitle: string) => { //функция посредник
        props.addTask(props.todoListId, newTitle)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todoListId)
    }

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        props.updateTask(props.todoListId, taskID, newTitle)
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolistTitle(props.todoListId, newTitle)
    }

    return (
        <div className="todoList">

            <h3>
                <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
                <button onClick={removeTodolistHandler}> X</button>
            </h3>

            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListId, t.id)
                    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked)
                    }

                    return (
                        <li className={t.isDone ? s.isDone : ''} key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeIsDoneHandler}

                            />
                            <EditableSpan oldTitle={t.title}
                                          callBack={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
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