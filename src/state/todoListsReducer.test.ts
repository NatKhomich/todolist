import {v1} from 'uuid';
import {TodoListPropsType} from '../App';
import {addTodoListAC, removeTodoListAC, todoListsReducer} from './todoListsReducer';

test('correct todoList should be removed', ()=> {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let startState: TodoListPropsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'All'},
        {id: todoListID2, title: 'What to buy', filter: 'All'},
    ]

   /* const endState = todoListsReducer(startState, {type: 'REMOVE-TODOLIST'})*/
    const endState = todoListsReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'
    const newTodoListID = v1()

    const startState: TodoListPropsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    /*const endState = todoListsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})*/

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle, newTodoListID))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
