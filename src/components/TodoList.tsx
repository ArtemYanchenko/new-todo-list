import React from 'react';

export type FilterType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(id:number)=>void
    changeFilter:(value:FilterType)=>void
}


export const TodoList = (props: TodolistType) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => {
                        props.removeTask(t.id)
                    }
                    return (
                        <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;