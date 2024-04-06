import Stomp from "stompjs";
import {Message} from "../types/Message.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {setLastReceivedMessage} from "../store/slices/messageSlice.ts";

export class WebSocketService {
    public static stompClient: Stomp.Client = {} as Stomp.Client;
    public static dispatch: Dispatch

    public static setDispatch(dispatch: Dispatch) {
        WebSocketService.dispatch = dispatch;
    }

    public static onConnected(username: string): void {
        WebSocketService.stompClient.subscribe(`/user/${username}/queue/messages`, WebSocketService.onMessageReceived)
        WebSocketService.stompClient.subscribe('/user/public', WebSocketService.onMessageReceived)
        WebSocketService.stompClient.send('/app/user.connect', {}, username)
    }

    public static onError(): void {

    }

    public static onMessageReceived(payload: any): void {
        WebSocketService.dispatch(setLastReceivedMessage(JSON.parse(payload.body)))
    }

    public static sendMessage(message: Message): void {
        WebSocketService.stompClient.send("/app/chat", {}, JSON.stringify(message))
    }

    public static onLogout(username: string): void {
        WebSocketService.stompClient.send("/app/user.disconnect", {}, username)
    }
}