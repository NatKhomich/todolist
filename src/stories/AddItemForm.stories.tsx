import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemForm, AddItemFormType} from '../components/AddItemForm';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import '../App.css'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addNewItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        addNewItem: action('Button clicked inside form')
    },
};






export const AddItemFormError: FC<AddItemFormType> = (args) => {

        const [newTitle, setNewTitle] = useState('')
        const [error, setError] = useState<string | null>('Title is required')

        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitle(e.currentTarget.value)
            setError(null)
        }

        const addTaskHandler = () => {
            if (newTitle.trim() !== '') {
                args.addNewItem(newTitle.trim())
                setNewTitle('')
            } else {
                setError('Title is required')
            }
        }

        const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error) setError(null)
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
                           onKeyDown={onKeyDownHandler}/>
                    < button onClick={addTaskHandler}> +</button>
                    <div
                        className={error ? 'errorMessage' : ''}> {error} </div>
                </div>
            </div>
        );
}

export const AddItemFormErrorStory: Story = {
    render: (args) => <AddItemFormError addNewItem={args.addNewItem} />
 }