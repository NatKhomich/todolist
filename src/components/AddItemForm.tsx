import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css';

type AddItemFormType = {
    callBack: (newTitle: string)=> void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>('')

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTitle(event.currentTarget.value)

    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (

        <div>
            <input value={newTitle}
                   className={error ? s.error : ''}
                   onKeyDown={onKeyDownHandler}
                   onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}> + </button>
            {error && <div className={s.errorMessage}> {error}  </div>}
        </div>

    );
};
