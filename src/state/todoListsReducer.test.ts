import {v1} from 'uuid';
import {FilterTaskType, TodoListType} from '../App';
import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from './todoListsReducer';

let todoListID1: string
let todoListID2: string

let startState: TodoListType[]

beforeEach( ()=> {
    todoListID1 = v1()
    todoListID2 = v1()

    startState = [
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ]
})


test('correct todoList should be removed', ()=> {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterTaskType = 'Completed'

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todoListID2, newFilter) )

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})
