import React, {memo, useCallback} from 'react';
import {FilterTaskType, TasksType} from '../App';
import EditableSpan from './EditableSpan';
import styled from 'styled-components';
import {AddItemForm} from './AddItemForm';
import {Task} from './Task';

export type TodoListType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    filter: FilterTaskType

    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, newTitle: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, newIsDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void

    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (todoListID: string, filter: FilterTaskType) => void
    changeTodoListTitle: (todoListID: string, changeTitle: string) => void
}

export const TodoList: React.FC<TodoListType> = memo((props) => {

    let tasks = props.tasks
    if (props.filter === 'Active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'Completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    const MappedTask = tasks.map(el => {
        return (
            <Task task={el}
                  todoListID={props.todoListID}
                  changeTaskStatus={props.changeTaskStatus}
                  removeTask={props.removeTask}
                  changeTaskTitle={props.changeTaskTitle}
            />
        )
    })

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const allFilterTasksHandler = () => {
        props.changeTodoListFilter(props.todoListID, 'All')
    }
    const activeFilterTasksHandler = () => {
        props.changeTodoListFilter(props.todoListID, 'Active')
    }
    const completedFilterTasksHandler = () => {
        props.changeTodoListFilter(props.todoListID, 'Completed')
    }

    /*const filteredTaskButton = (filter: FilterTaskType) => {
            props.filterTasks(props.todoListID, filter)
    }*/ // общая функция для трех кнопок фильтрации

    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(props.todoListID, newTitle)
    }, [props.addTask, props.todoListID])

    const changeTodoListTitleHandler = useCallback((changeTitle: string) => {
        props.changeTodoListTitle(props.todoListID, changeTitle)
    }, [props.changeTodoListTitle, props.todoListID])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              onChange={changeTodoListTitleHandler}/>
                <ButtonDelete onClick={removeTodoListHandler}> X </ButtonDelete>
            </h3>

            <AddItemForm addNewItem={addTaskHandler}/>

            <ul>
                {MappedTask}
            </ul>
            <div>
                <ButtonFilter color={props.filter === 'All' ? 'aqua' : 'gray'}
                              onClick={allFilterTasksHandler}>All</ButtonFilter>
                <ButtonFilter color={props.filter === 'Active' ? 'aqua' : 'gray'}
                              onClick={activeFilterTasksHandler}>Active</ButtonFilter>
                <ButtonFilter color={props.filter === 'Completed' ? 'aqua' : 'gray'}
                              onClick={completedFilterTasksHandler}>Completed</ButtonFilter>
            </div>
        </div>
    )
})


/*
export const TodoList: React.FC<TodoListType> = memo((props) => {
    return( <div>  </div> )
    },
    (prevProps, nextProps) => {
        if (prevProps.tasks !== nextProps.tasks) return false
        if (prevProps.filter !== nextProps.filter) return false
        return true
    })
*/


const ButtonFilter = styled.button`
  border-radius: 3px;
  background-color: ${props => {
    if (props.color === 'aqua') {
      return 'aqua'
    } else {
      return 'gray'
    }
  }
  };
  color: black;
  font-size: 15px;
  border: 1px solid black;
  margin-right: 5px;
  height: 30px;
  min-width: 50px;
`

export const ButtonDelete = styled.button`
  border-radius: 3px;
  background-color: gray;
  color: black;
  border: 1px solid black;
  margin-right: 5px;
  height: 20px;
  width: 27px;
`