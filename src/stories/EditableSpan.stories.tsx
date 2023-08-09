import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import EditableSpan, {EditableSpanType} from '../components/EditableSpan';
import exp from 'constants';
import React, {ChangeEvent, FC, useState} from 'react';
import {AddItemFormError} from './AddItemForm.stories';


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// @ts-ignore
// @ts-ignore
const meta: Meta<typeof EditableSpan> = {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        title: {
            description: 'Start value empty. Add value push button set string.',
            defaultValue: 'EditableSpan'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory: Story = {
    args: {
        onChange: action('Value EditableSpan changed')
    }
};


export const EditableSpanFromInput: FC<EditableSpanType> = (args) => {
    const [changeTitle, setChangeTitle] = useState(args.title)

    const activateEditMode = () => {
        setChangeTitle(args.title)
        args.onChange(changeTitle)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeTitle(e.currentTarget.value)
    }

    return (
         <input type="text"
                     value={changeTitle}
                     autoFocus
                     onBlur={activateEditMode}
                     onChange={ onChangeTitleHandler }
            />
    );
}

export const EditableSpanFromInputStory: Story = {
    render: (args) => <EditableSpanFromInput title={args.title} onChange={args.onChange} />
}