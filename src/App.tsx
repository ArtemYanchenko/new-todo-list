import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterType, TaskStateType, TodolistsType} from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )


    let [tasks, setTasks] = useState<TaskStateType>(
        {
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'GraphQl', isDone: false}
            ],
            [todolistID2]: [
                {id: v1(), title: 'Bear', isDone: true},
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Milk', isDone: false},
                {id: v1(), title: 'Apples', isDone: false},
            ]
        })



    const removeTask = (todolistID:string,id: string) => {
        let todolistTask = tasks[todolistID];
        tasks[todolistID] = todolistTask.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const changeFilter = (value: FilterType, todolistID: string) => {
        let todolist = todolists.find(t => t.id === todolistID);
        if (todolist) {
            todolist.filter = value;
        }
        setTodolists([...todolists])
    }
    const changeTaskStatus = (todolistID:string,taskID: string, isDone: boolean) => {
        let todolistTask = tasks[todolistID];
        tasks[todolistID] = todolistTask.map(t=>t.id === taskID ? {...t,isDone:!isDone} : t)
        setTasks({...tasks})
    }
    const addTask = (todolistID:string,newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        let todolistTask = tasks[todolistID];
        tasks[todolistID] = [newTask,...todolistTask]
        setTasks({...tasks})
    }

    const removeTodolist = (todolistID:string) => {
        setTodolists([...todolists.filter(t=>t.id!==todolistID)]);
        delete tasks[todolistID];
        setTasks({...tasks});
    }
    const addTodolist = (newTitle:string) => {
        let todolistID = v1();
        let newTodolist:TodolistsType = {id:todolistID,title: newTitle,filter:'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({[todolistID]:[],...tasks})
    }
    return (
        <>

        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(t => {
                let allTodolistTasks = tasks[t.id]
                let tasksForTodolist = allTodolistTasks;

                if (t.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                }
                if (t.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                }
                return <TodoList
                    key={t.id}
                    todolistID={t.id}
                    title={t.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    filter={t.filter}/>
            })}
        </div>
        </>
    );
}

export default App;
