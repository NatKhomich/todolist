import React, {ChangeEvent, FC} from 'react';
import {FilterTaskType, TaskPropsType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

export type TodoListType = {
    todoListID: string
    title: string
    tasks: TaskPropsType[]
    filter: FilterTaskType

    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, newTitle: string) => void
    filterTasks: (todoListID: string, filter: FilterTaskType) => void
    onChangeTaskStatus: (todoListID: string, taskID: string, newIsDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskID: string, changeTitle: string)=> void


    removeTodoList: (todoListID: string) => void
}

export const TodoList: FC<TodoListType> = (props) => {

    const MappedTask = props.tasks.map(el => {
        return (
            <li key={el.id} className={el.isDone ? 'opacityTask' : ''}>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={(e) => onChangeTaskStatusHandler(el.id, e)}
                />

                <EditableSpan title={el.title} onChange={(changeTitle)=> props.changeTaskTitle(props.todoListID, el.id, changeTitle)} />

                <button onClick={() => props.removeTask(props.todoListID, el.id)}> X</button>
            </li>
        )
    })

    const onChangeTaskStatusHandler = (taskID: string, e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeTaskStatus(props.todoListID, taskID, e.currentTarget.checked)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const allFilterTasksHandler = () => {
        props.filterTasks(props.todoListID, 'All')
    }
    const activeFilterTasksHandler = () => {
        props.filterTasks(props.todoListID, 'Active')
    }
    const completedFilterTasksHandler = () => {
        props.filterTasks(props.todoListID, 'Completed')
    }

    /*const filteredTaskButton = (filter: FilterTaskType) => {
        if (filter === 'All') {
            props.filterTasks(props.todoListID, 'All')
        }
        if (filter === 'Active') {
            props.filterTasks(props.todoListID, 'Active')
        }
        if (filter === 'Completed') {
            props.filterTasks(props.todoListID, 'Completed')
        }
    }*/ // общая функция для трех кнопок фильтрации

    return (
        <div>
            <h3>{props.title}
            <button onClick={ removeTodoListHandler }> X </button>
            </h3>

            <AddItemForm addNewItem={(newTitle)=> props.addTask(props.todoListID, newTitle)}/>

            <ul>
                {MappedTask}
            </ul>
            <div>
                <button className={props.filter==='All' ? 'colorButton' : ''}
                        onClick={allFilterTasksHandler}>All</button>
                <button className={props.filter==='Active' ? 'colorButton' : ''}
                        onClick={activeFilterTasksHandler}>Active</button>
                <button className={props.filter==='Completed' ? 'colorButton' : ''}
                        onClick={completedFilterTasksHandler}>Completed</button>
               {/*<Button name={'All'} callBack={()=> filteredTaskButton('All')} />
                <Button name={'Active'} callBack={()=> filteredTaskButton('Active')} />
                <Button name={'Completed'} callBack={()=> filteredTaskButton('Completed')} /> */}
            </div>
        </div>
    )
}