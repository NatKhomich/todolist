import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addNewItem: (newTitle: string)=> void
}

const AddItemForm = (props: AddItemFormType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
           props.addNewItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <div>
                <input className={error ? 'error' : ''}
                       onChange={onChangeTitleHandler}
                       value={newTitle}
                       onKeyDown={onKeyDownHandler}

                />
                <button onClick={addTaskHandler}> +</button>
                <div className={error ? 'errorMessage' : ''}> {error} </div>
            </div>
        </div>
    );
};

export default AddItemForm;