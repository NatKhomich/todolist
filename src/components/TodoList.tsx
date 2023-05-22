import React, {ChangeEvent} from 'react';

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskID: string)=> void
    changeTaskStatus: (taskID: string, newIsDone: boolean)=> void
}

export const TodoList: React.FC<TodoListType> = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDone)
                    }

                    return(
                        <li key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={ changeTaskStatus }

                            />
                            <span>{el.title}</span>
                            <button onClick={ ()=> props.removeTask(el.id) }> X </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}