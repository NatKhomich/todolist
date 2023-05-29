import React, {ChangeEvent, FC} from 'react';
import {FilterTaskType, TaskPropsType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import styled from 'styled-components';

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
    changeTodoListTitle: (todoListID: string, changeTitle: string)=> void
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

                <ButtonDelete onClick={() => props.removeTask(props.todoListID, el.id)}> X</ButtonDelete>
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
            props.filterTasks(props.todoListID, filter)
    }*/ // общая функция для трех кнопок фильтрации

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={ (changeTitle)=> props.changeTodoListTitle(props.todoListID, changeTitle) } />
            <ButtonDelete onClick={ removeTodoListHandler }> X </ButtonDelete>
            </h3>

            <AddItemForm addNewItem={(newTitle)=> props.addTask(props.todoListID, newTitle)}/>

            <ul>
                {MappedTask}
            </ul>
            <div>
                <ButtonFilter color={props.filter==='All' ? 'aqua' : 'gray'}
                        onClick={allFilterTasksHandler}>All</ButtonFilter>
                <ButtonFilter color={props.filter==='Active' ? 'aqua' : 'gray'}
                        onClick={activeFilterTasksHandler}>Active</ButtonFilter>
                <ButtonFilter color={props.filter==='Completed' ? 'aqua' : 'gray'}
                        onClick={completedFilterTasksHandler}>Completed</ButtonFilter>

               {/*<Button name={'All'} callBack={()=> filteredTaskButton('All')} />
                <Button name={'Active'} callBack={()=> filteredTaskButton('Active')} />
                <Button name={'Completed'} callBack={()=> filteredTaskButton('Completed')} />*/}

            </div>
        </div>
    )
}

const ButtonFilter = styled.button`
  border-radius: 3px;
  background-color: ${props => {
      if(props.color === 'aqua'){
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

const ButtonDelete = styled.button`
  border-radius: 3px;
  background-color: gray;
  color: black;
  border: 1px solid black;
  margin-right: 5px;
  height: 20px;
  width: 27px;
`