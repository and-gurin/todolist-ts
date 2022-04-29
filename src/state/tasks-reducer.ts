import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type removeTaskACType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}
export type addTaskACActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeTaskStatusACType = {
    type: 'CHANGE-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}

export type changeTaskTitleACType = {
    type: 'CHANGE-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsType = removeTaskACType |
    addTaskACActionType |
    changeTaskStatusACType |
    changeTaskTitleACType |
    AddTodolistActionType |
    RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task=> task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]:[{id:v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST' : {
                const stateCopy = {...state}
            stateCopy[action.id] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId:string, todolistId: string): removeTaskACType => {
    return { type: 'REMOVE-TASK', taskId,  todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId:string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return { type: 'CHANGE-STATUS', taskId,isDone, todolistId}
}
export const changeTaskTitleAC = (taskId:string, title: string, todolistId: string): changeTaskTitleACType => {
    return { type: 'CHANGE-TITLE', taskId, title, todolistId}
}