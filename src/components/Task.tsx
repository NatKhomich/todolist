import EditableSpan from './EditableSpan';
import React, {ChangeEvent, FC, useCallback} from 'react';
import {ButtonDelete} from './TodoList';
import {TasksType} from '../App';


type TaskPropsType = {
    todoListID: string
    task: TasksType
    changeTaskStatus: (todoListID: string, taskID: string, newChecked: boolean) => void
    removeTask: (todoListID: string, taskID: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
}

export const Task: FC<TaskPropsType> = React.memo((props) => {

    const removeTaskHandler = () => {
        props.removeTask(props.todoListID, props.task.id)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListID, props.task.id, e.currentTarget.checked)
    }

    const changeTaskTitleHandler = useCallback ((changeTitle: string) => {
        props.changeTaskTitle(props.todoListID, props.task.id, changeTitle)
    }, [props.todoListID, props.task.id,  props.changeTaskTitle])

    return (
        <div>
            <li className={props.task.isDone ? 'opacityTask' : ''}>
                <input type="checkbox"
                       checked={props.task.isDone}
                       onChange={changeTaskStatusHandler}
                />
                <EditableSpan title={props.task.title}
                              onChange={changeTaskTitleHandler}/>

                <ButtonDelete onClick={removeTaskHandler}> X </ButtonDelete>
            </li>
        </div>
    )
})