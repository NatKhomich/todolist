import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from '../app/app-reducer';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    const error = data.messages[0]
    if (error) {
        dispatch(setErrorAC(error))
    }
    else {
        dispatch(setErrorAC('Some error'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorActionType | SetStatusActionType>
