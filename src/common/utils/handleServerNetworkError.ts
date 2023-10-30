import { appActions } from "app/app.reducer";
import { AppDispatch } from "app/store";
import axios from "axios";

// export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
//   dispatch(appActions.setAppError({ error: error.message ? error.message : "Some error occurred" }));
//   dispatch(appActions.setAppStatus({ status: "failed" }));
// };

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch):void => {
  let errorMessage = "Some error occurred";
  if (axios.isAxiosError(err)) {  // ❗Проверка на наличие axios ошибки
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {  // ❗ Проверка на наличие нативной ошибки
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);   // ❗Какой-то непонятный кейс
  }

  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
