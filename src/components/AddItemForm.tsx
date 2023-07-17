import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type AddItemFormType = {
    addNewItem: (newTitle: string)=> void
}

//первый способ - обернуть компоненту в memo и каждый callback в useCallback

export const AddItemForm = memo ((props: AddItemFormType) => {
    console.log('AddItemForm')

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
        if(error) setError(null)
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
});

//второй способ - обернуть компоненту в memo и вторым параметром передать колбэк со сравнением пропсов

/*
export const AddItemForm = memo ((props: AddItemFormType) => {
    console.log('AddItemForm')

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
        if(error) setError(null)
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
}, (prevProps, nextProps) => {
    return prevProps.addNewItem !== nextProps.addNewItem
});*/
