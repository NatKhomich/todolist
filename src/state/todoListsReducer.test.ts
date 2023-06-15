import {v1} from 'uuid';
import {FilterTaskType, TodoListPropsType} from '../App';
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './todoListsReducer';

test('correct todoList should be removed', ()=> {
    //входные данные
    let todoListID1 = v1()
    let todoListID2 = v1()

    let startState: TodoListPropsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ]
    //изменения
   /* const endState = todoListsReducer(startState, {type: 'REMOVE-TODOLIST'})*/
    const endState = todoListsReducer(startState, removeTodoListAC(todoListID1))
    //ожидается
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodoListPropsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    /*const endState = todoListsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})*/

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListPropsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

   /* const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }*/

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterTaskType = 'Completed'

    const startState: Array<TodoListPropsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter) )

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})
