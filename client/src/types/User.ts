import {UserStatus} from "./UserStatus.ts";

export interface User {
    nickname: string;
    username: string;
    status: UserStatus;
}