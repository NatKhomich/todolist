import React from 'react';
import {FilterTaskType, TasksType} from '../App';
import EditableSpan from './EditableSpan';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from '../state/tasksReducer';
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from '../state/todoListsReducer';
import {AddItemForm} from './AddItemForm';

export type TodoListType = {
    id: string
    title: string
    filter: FilterTaskType
}

export const TodoListWitchRedux: React.FC<TodoListType> = (props) => {

    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    const MappedTask = tasks.map(el => {
        return (
            <li key={el.id} className={el.isDone ? 'opacityTask' : ''}>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={(e) => onChangeTaskStatusHandler(el.id, e.currentTarget.checked)}
                />
                {/*<CheckBox checked={el.isDone} callBack={(newChecked)=> onChangeTaskStatusHandler(el.id, newChecked)}/>*/}
                <EditableSpan title={el.title}
                              onChange={(changeTitle) => changeTaskTitleHandler(el.id, changeTitle) }/>

                <ButtonDelete onClick={removeTaskHandler(el.id)}> X </ButtonDelete>
            </li>
        )
    })

    const removeTaskHandler = (taskID: string) => () => {
        dispatch(RemoveTaskAC(props.id, taskID))
    }

    const changeTaskTitleHandler = (taskID: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(props.id, taskID, newTitle))
    }

    if (props.filter === 'Active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'Completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    const addTaskHandler = (newTitle: string) => {
        dispatch(AddTaskAC(props.id, newTitle))
    }

    const onChangeTaskStatusHandler = (taskID: string, newIsDone: boolean) => {
        dispatch(ChangeTaskStatusAC(props.id, taskID, newIsDone))
    }

    const removeTodoListHandler = () => {
        dispatch(RemoveTodoListAC(props.id))
    }

    /* const allFilterTasksHandler = () => {
         props.changeTodoListFilter(props.todoListID, 'All')
     }
     const activeFilterTasksHandler = () => {
         props.changeTodoListFilter(props.todoListID, 'Active')
     }
     const completedFilterTasksHandler = () => {
         props.changeTodoListFilter(props.todoListID, 'Completed')
     }*/

    const changeTodoListTitleHandler = (changeTitle: string) => {
        dispatch(ChangeTodoListTitleAC(props.id, changeTitle))
    }

    const filteredTaskButton = (filter: FilterTaskType) => () => {
        dispatch(ChangeTodoListFilterAC(props.id, filter))
    } // общая функция для трех кнопок фильтрации



    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              onChange={(changeTitle) => changeTodoListTitleHandler(changeTitle)}/>
                <ButtonDelete onClick={removeTodoListHandler}> X </ButtonDelete>
            </h3>

            <AddItemForm addNewItem={(newTitle) => addTaskHandler(newTitle)}/>

            <ul>
                {MappedTask}
            </ul>
            <div>

                <ButtonFilter color={props.filter === 'All' ? 'aqua' : 'gray'}
                              onClick={filteredTaskButton('All')}>All</ButtonFilter>
                <ButtonFilter color={props.filter === 'Active' ? 'aqua' : 'gray'}
                              onClick={filteredTaskButton('Active')}>Active</ButtonFilter>
                <ButtonFilter color={props.filter === 'Completed' ? 'aqua' : 'gray'}
                              onClick={filteredTaskButton('Completed')}>Completed</ButtonFilter>

                {/*<Button name={'All'} callBack={()=> filteredTaskButton('All')} />
                <Button name={'Active'} callBack={()=> filteredTaskButton('Active')} />
                <Button name={'Completed'} callBack={()=> filteredTaskButton('Completed')} />*/}

                {/*<ButtonFilter color={props.filter === 'All' ? 'aqua' : 'gray'}
                              onClick={allFilterTasksHandler}>All</ButtonFilter>
                <ButtonFilter color={props.filter === 'Active' ? 'aqua' : 'gray'}
                              onClick={activeFilterTasksHandler}>Active</ButtonFilter>
                <ButtonFilter color={props.filter === 'Completed' ? 'aqua' : 'gray'}
                              onClick={completedFilterTasksHandler}>Completed</ButtonFilter>*/}
            </div>
        </div>
    )
}

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

const ButtonDelete = styled.button`
  border-radius: 3px;
  background-color: gray;
  color: black;
  border: 1px solid black;
  margin-right: 5px;
  height: 20px;
  width: 27px;
`