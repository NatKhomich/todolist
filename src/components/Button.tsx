import React from 'react';

type ButtonType = {
    name: string
    callBack: ()=> void
}

export const Button = (props: ButtonType) => {
    return (
        <button onClick={ ()=>props.callBack() }> {props.name} </button>
    );
};
