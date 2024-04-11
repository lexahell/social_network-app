import {UserTypingStatus} from "./UserTypingStatus.ts";

export interface UserTypingStatusInfo {
    recipientUsername: string;
    senderUsername: string;
    userTypingStatus: UserTypingStatus;
}