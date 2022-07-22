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
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter:FilterType
}


export const TodoList = (props: TodolistType) => {

    let [newTitle, setNewTitle] = useState<string>('')

    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (newTitle.trim()) {
            props.addTask(newTitle.trim())
        } else {
            setError('Title is required')
        }
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
                <input value={newTitle}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+
                </button>
                {error && <span className={'errorMessage'}>{error}</span>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }

                    const onChangeHandler = () => props.changeTaskStatus(t.id, t.isDone)

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
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;