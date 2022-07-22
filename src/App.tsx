import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterType, TaskType, TodolistsType} from './components/TodoList';
import {v1} from 'uuid';

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'GraphQl', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterType>('all')


    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value);
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks([...tasks.map(t => t.id === taskID ? {...t, isDone: !isDone} : t)])
    }

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }




    return (
        <div className="App">
            {todolists.map(t => {
                let tasksForTodolist = tasks;

                if (filter === 'active') {
                    tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone === true);
                }
                return <TodoList
                    key={t.id}
                    title={t.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={t.filter}/>
            })}

        </div>
    );
}

export default App;
