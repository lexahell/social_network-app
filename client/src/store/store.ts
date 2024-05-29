import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice.ts";
import chatReducer from "./slices/chatSlice.ts";
import messagesReducer from "./slices/messageSlice.ts"
import authReducer from "./slices/authSlice.ts";
import profileReducer from "./slices/profileSlice.ts"
import {socialAppApi} from "../services/socialAppService.ts";
import {setupListeners} from "@reduxjs/toolkit/query";
const rootReducer = combineReducers({
    modalReducer,
    chatReducer,
    messagesReducer,
    authReducer,
    profileReducer,
    [socialAppApi.reducerPath]: socialAppApi.reducer
})
const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socialAppApi.middleware)
    })
}
export const store = setupStore()
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']