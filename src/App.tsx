import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterType, TaskType} from './components/TodoList';
import {v1} from 'uuid';

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'GraphQl', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    let [check, setCheck] = useState<boolean>(false)

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value);
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks([...tasks.map(t => t.id === taskID ? {...t, isDone:!isDone} : t)])}

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }


    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            filter={filter}/>
        </div>
    );
}

export default App;
