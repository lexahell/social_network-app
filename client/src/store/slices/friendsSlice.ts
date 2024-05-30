import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface FriendsState {
    execTime: number;
}


const initialState: FriendsState = {
    execTime: dayjs().unix()
}

const friendsSlice = createSlice(({
    name: 'friends',
    initialState,
    reducers: {
        setExecTime: (state, action: PayloadAction<number>) => {
            state.execTime = action.payload
        }
    }
}));


export const {
    setExecTime
} = friendsSlice.actions;

export default friendsSlice.reducer;