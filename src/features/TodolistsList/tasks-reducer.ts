import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "api/todolists-api";
import { AppThunk } from "app/store";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { appActions } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "features/TodolistsList/todolists-reducer";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
      const tasksCurrentTodolist = state[action.payload.todolistId];
      const index = tasksCurrentTodolist.findIndex(t => t.id === action.payload.taskId);
      if (index > -1) state[action.payload.todolistId].splice(index, 1);
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasksCurrentTodolist = state[action.payload.task.todoListId];
      tasksCurrentTodolist.unshift(action.payload.task);
    },
    updateTask: (state, action: PayloadAction<{
      todolistId: string, taskId: string,
      model: UpdateDomainTaskModelType
    }>) => {
      const tasksCurrentTodolist = state[action.payload.todolistId];
      const index = tasksCurrentTodolist.findIndex(t => t.id === action.payload.taskId);
      if (index > -1) {
        tasksCurrentTodolist[index] = { ...tasksCurrentTodolist[index], ...action.payload.model };
      }
    },
    setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) => {
      state[action.payload.todolistId] = action.payload.tasks;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(todolistsActions.addTodolist, (state, action) => {
      // return { ...state, [action.todolist.id]: [] };
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(todolistsActions.removeTodolist, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(todolistsActions.setTodolists, (state, action) => {
      action.payload.todolists.forEach(tl => state[tl.id] = []);
    });
  }
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  todolistsAPI.getTasks(todolistId).then((res) => {
    const tasks = res.data.items;
    dispatch(tasksActions.setTasks({ tasks, todolistId }));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};
export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = tasksActions.removeTask({ todolistId, taskId });
      dispatch(action);
    });
  };
export const addTaskTC =
  (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI.createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item;
          const action = tasksActions.addTask({ task });
          dispatch(action);
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel
    };

    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = tasksActions.updateTask({ taskId, model: domainModel, todolistId });
          dispatch(action);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export type TasksInitialState = ReturnType<typeof slice.getInitialState>