import React, {ChangeEvent, useState} from 'react';
import {debug} from 'util';

type AddItemFormType = {
    addItem:(newTitle:string)=>void
}

export const AddItemForm = (props: AddItemFormType) => {

    let [newTitle, setNewTitle] = useState<string>('')

    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        if (newTitle.trim()) {
            props.addItem(newTitle.trim())
        } else {
            setError('Title is required')
        }
        setNewTitle('')
    }

    return (
            <div>
                <input value={newTitle}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addItem}>+
                </button>
                {error && <span className={'errorMessage'}>{error}</span>}
            </div>

    );
};

export default AddItemForm;