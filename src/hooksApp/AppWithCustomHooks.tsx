import React from 'react';
import '../App.css';
import {TodoList} from '../components/TodoList';
import {AddItemForm} from '../components/AddItemForm';
import {useTodoList} from './hooks/useTodoLists';
import {useTasks} from './hooks/useTasks';

export type TasksStateType = {
    [key: string]: TasksType[]
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterTaskType
}

export type FilterTaskType = 'All' | 'Active' | 'Completed'


function AppWithCustomHooks() {

    let {
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTaskTitle,
        removeTasksForTodoList,
        addTasksForTodoList
    } = useTasks()

    let {
        todoList,
        changeTodoListTitle,
        changeTodoListFilter,
        removeTodoList,
        addTodoList
    } = useTodoList(removeTasksForTodoList, addTasksForTodoList)

    const todoListsComponents = todoList.map(el => {

        return (
            <TodoList key={el.id}
                      todoListID={el.id}
                      title={el.title}
                      tasks={tasks[el.id]}
                      filter={el.filter}

                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}

                      removeTodoList={removeTodoList}
                      changeTodoListFilter={changeTodoListFilter}
                      changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (

        <div className="App">
            <AddItemForm addNewItem={addTodoList}/>

            {todoListsComponents}

        </div>
    );
}

export default AppWithCustomHooks;
