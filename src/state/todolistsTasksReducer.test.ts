import {TasksStateType, TodoListType} from '../App';
import {tasksReducer} from './tasksReducer';
import {AddTodoListAC, todoListsReducer} from './todoListsReducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todoListID)
    expect(idFromTodoLists).toBe(action.payload.todoListID)
})
