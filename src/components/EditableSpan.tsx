import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    oldTitle: string
    callBack: (title: string) => void
}

const EditableSpan = (props: EditableSpanType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    console.log(newTitle)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)

    }

    const addTaskHandler = () => {
        props.callBack(newTitle)
    }


    const editHandler = () => {
        setEdit(!edit)
        addTaskHandler()
    }

    return (
        edit
            ? <input onBlur={editHandler}
                     autoFocus
                     value={newTitle}
                     onChange={onChangeHandler}
            />
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;