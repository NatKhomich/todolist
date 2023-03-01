import React from "react";

type PropsTypeHeading = {
    heading: string;
    body?: number;
    tasks: TaskType[] //Array <PropsTypeTasks>
}

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsTypeHeading) => {
    const tasksMap = props.tasks.map((el ) => {
        return(
            <li>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>
        )
    })
    return (
        <div>
            <div>
                <h3>{props.heading}</h3>
                <h3>{props.body}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksMap}
                    {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[3].isDone}/> <span>{props.tasks[3].title}</span></li>*/}

                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )

}