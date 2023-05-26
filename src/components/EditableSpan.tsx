import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (changeTitle: string)=> void
}

const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [changeTitle, setChangeTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(!editMode)
        setChangeTitle(props.title)
        props.onChange(changeTitle)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeTitle(e.currentTarget.value)
    }

    return (
        editMode
        ? <input type="text"
                 value={changeTitle}
                 autoFocus
                 onBlur={activateEditMode}
                 onChange={ onChangeTitleHandler }

            />
        : <span onDoubleClick={activateEditMode}> {props.title} </span>
    );
};

export default EditableSpan;