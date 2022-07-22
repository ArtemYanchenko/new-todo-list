import React, {ChangeEvent, useState} from 'react';

export type FilterType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (taskID:string,isDone:boolean) => void
}


export const TodoList = (props: TodolistType) => {

    let [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = ( e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        newTitle && props.addTask(newTitle.trim())
        setNewTitle('')
    }

   const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyUp={onKeyPressHandler}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                    return (
                        <li key={t.id}><input type="checkbox" onChange={()=>props.changeTaskStatus(t.id,t.isDone)} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;