import {Token} from "./Token.ts";

export interface FriendsDTO extends Token{
    username: string;
    date: number;
}