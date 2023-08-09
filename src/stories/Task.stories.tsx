import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task, TaskPropsType} from '../components/Task';
import {FC, useState} from 'react';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TodoList/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: true},
        todoListID: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'CSS', isDone: false},
        todoListID: 'fgdosrg8rgjuh'
    },
}


const TaskWitchHook: FC<TaskPropsType> = (args) => {

    const [task, setTask] = useState(args.task)

    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        setTask({...task, title: title})
    }

    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }

    return <Task task={args.task}
                 changeTaskTitle={changeTaskTitle}
                 changeTaskStatus={changeTaskStatus}
                 removeTask={args.removeTask}
                 todoListID={args.todoListID}
    />
}

export const TaskWitchHookStory: Story = {
    render: (args) => <TaskWitchHook todoListID={args.todoListID}
                                     task={args.task}
                                     changeTaskStatus={args.changeTaskStatus}
                                     removeTask={args.removeTask}
                                     changeTaskTitle={args.changeTaskTitle} />
}