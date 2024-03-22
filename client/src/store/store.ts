import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice.ts";
import chatReducer from "./slices/chatSlice.ts";
import messagesReducer from "./slices/messageSlice.ts"
const rootReducer = combineReducers({
    modalReducer,
    chatReducer,
    messagesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']