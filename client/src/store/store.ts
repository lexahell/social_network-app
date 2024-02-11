import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice.ts";

const rootReducer = combineReducers({
    modalReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']