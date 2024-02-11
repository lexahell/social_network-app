import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import React from "react";
interface ModalState {
    isVisible: boolean;
    content: React.ReactNode;
}
const initialState: ModalState = {
    isVisible: false,
    content: null
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalVisibility: (state = initialState, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload
        },
        setModalContent: (state = initialState, action: PayloadAction<React.ReactNode>) => {
            state.content = action.payload
        }
    }
})
export const { setModalVisibility, setModalContent } = modalSlice.actions;
export default modalSlice.reducer