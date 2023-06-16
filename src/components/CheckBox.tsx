import React, {ChangeEvent} from 'react';

type CheckBoxType = {
    checked: boolean
    callBack: (newChecked: boolean)=> void
}

export const CheckBox: React.FC<CheckBoxType> = ({checked, callBack}) => {

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox"
               checked={checked}
               onChange={onChangeTaskStatusHandler}
        />
    );
};