import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserStatus} from "../../types/UserStatus.ts";

interface ProfileSlice {
    profileUsername: string;
    profileNickname: string;
    userStatus: UserStatus;
    isOtherUserProfile: boolean,
    isThisUserFriend: boolean;
    isThisUserSubscriber: boolean;
    isSubscribed: boolean;
}


const initialState: ProfileSlice = {
    profileUsername: "",
    profileNickname: "",
    userStatus: UserStatus.OFFLINE,
    isOtherUserProfile: false,
    isThisUserFriend: false,
    isThisUserSubscriber: false,
    isSubscribed: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileUsername: (state, action: PayloadAction<string>) => {
            state.profileUsername = action.payload
        },
        setProfileNickname: (state, action: PayloadAction<string>) => {
            state.profileNickname = action.payload
        },
        setUserStatus: (state, action: PayloadAction<UserStatus>) => {
            state.userStatus = action.payload
        },
        setIsOtherUserProfile: (state, action: PayloadAction<boolean>) => {
            state.isOtherUserProfile = action.payload
        },
        setIsThisUserFriend: (state, action: PayloadAction<boolean>) => {
            state.isThisUserFriend = action.payload
        },
        setIsThisUserSubscriber: (state, action: PayloadAction<boolean>) => {
            state.isThisUserSubscriber = action.payload
        },
        setIsSubscribed: (state, action: PayloadAction<boolean>) => {
            state.isSubscribed = action.payload
        }
    }
})

export const {
    setProfileUsername,
    setProfileNickname,
    setUserStatus,
    setIsOtherUserProfile,
    setIsThisUserFriend,
    setIsThisUserSubscriber,
    setIsSubscribed
} = profileSlice.actions
export default profileSlice.reducer