import React from 'react';
import {ButtonFilterType} from './App';

type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string;
    tasks: Array <TasksType>
    removeTask: (taskId: number)=> void
    filterTask: (buttonName: ButtonFilterType) => void
}

export const Todolist = (props: TodolistPropsType) => {

       return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map(el => {
                        return (
                            <li key={el.id}>
                                <button onClick={ () => props.removeTask(el.id) }> + </button>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })}
                   {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}

                </ul>
                <div>
                    <button onClick={ ()=> props.filterTask('All') }>All</button>
                    <button onClick={ ()=> props.filterTask('Active') }>Active</button>
                    <button onClick={ ()=> props.filterTask('Completed') }>Completed</button>
                </div>
            </div>
        </div>
    )

}