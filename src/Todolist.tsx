import React from "react";

type PropsType = {
    shapka: string;
    body?: number;
    tasks: TaskType[] //или Array<TaskType
}

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    return (
        <div className="App">
            <div>
                <h3>{props.shapka}</h3>
                <h3>{props.body}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {

                        return (
                            <li>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })}


                    {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
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
