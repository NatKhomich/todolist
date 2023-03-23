import React from 'react';
import {ButtonFilterType} from '../App';
import s from './Todolist.module.css'

type ButtonType = {
    name: ButtonFilterType
    callBack: ()=> void
}

//универсальная кнопка
export const Button = (props: ButtonType) => {

    const onclickHandler = () => {
        props.callBack()
    }

    return (
        <button onClick={onclickHandler}> {props.name} </button>
    );
};

