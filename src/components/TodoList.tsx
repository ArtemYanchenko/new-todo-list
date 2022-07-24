import React, {ChangeEvent, useState} from 'react';
import {debug} from 'util';
import AddItemForm from './AddItemForm';

export type FilterType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [todolistID: string]: TaskType[]
}

export type TodolistType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (value: FilterType, todolistID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist:(todolistID:string)=>void
    filter: FilterType
}

export type TodolistsType = {
    id: string,
    title: string
    filter: FilterType
}


export const TodoList = (props: TodolistType) => {

    let [newTitle, setNewTitle] = useState<string>('')

    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }
    //
    // const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         addTask()
    //     }
    // }
    const addTask = (newTitle:string) => {
        if (newTitle.trim()) {
            props.addTask(props.todolistID, newTitle.trim())
        } else {
            setError('Title is required')
        }
        setNewTitle('')
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.todolistID)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todolistID)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todolistID)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    return (
        <div>

            <h3 style={{display:'inline'}}>{props.title}</h3>
            <button onClick={removeTodolistHandler}>X</button>
            {/*<div>*/}
            {/*    <input value={newTitle}*/}
            {/*           onChange={onChangeHandler}*/}
            {/*           onKeyUp={onKeyPressHandler}*/}
            {/*           className={error ? 'error' : ''}/>*/}
            {/*    <button onClick={addTask}>+*/}
            {/*    </button>*/}
            {/*    {error && <span className={'errorMessage'}>{error}</span>}*/}
            {/*</div>*/}
            <AddItemForm addItem={addTask}/>
            <ul>

                {props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(props.todolistID, t.id)
                    }
                    debugger;
                    const onChangeHandler = () => props.changeTaskStatus(props.todolistID, t.id, t.isDone)

                    return (
                        <li key={t.id} className={t.isDone === true ? 'completed-task' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;