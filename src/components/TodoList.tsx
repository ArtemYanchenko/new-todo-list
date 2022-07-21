import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
}


export const TodoList = (props: PropsType) => {
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
                        alert('you click on ' + t.id)
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;