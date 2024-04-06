import './App.css';
import AppRouter from "./router/AppRouter.tsx";
import {useGetUserInfoQuery} from "./services/socialAppService.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/redux.ts";
import {setAuthType, setNickname, setUsername, setUserStatus} from "./store/slices/authSlice.ts";
import {AuthType} from "./types/AuthType.ts";
import Loader from "./components/UI/Loader/Loader.tsx";
import Stomp from "stompjs";
import {WebSocketService} from "./services/WebSocketService.ts";
// @ts-ignore
import SockJS from "sockjs-client/dist/sockjs";
import {UserStatus} from "./types/UserStatus.ts";

function App() {
  const {data, isLoading} = useGetUserInfoQuery(localStorage.getItem("token") ?? "", {
    skip: !localStorage.getItem("token")
  })
  const {authType, nickname, username} = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (localStorage.getItem("token") && data) {
      if(authType === AuthType.NOT_AUTHED) {
        dispatch(setAuthType(AuthType.LOGIN))
      }
      dispatch(setNickname(data.nickname))
      dispatch(setUsername(data.username))
    }
  }, [data, authType]);
  useEffect(() => {
    if (nickname && username) {
      const socket = new SockJS(`http://localhost:8080/ws?token=${localStorage.getItem("token")}`);
      WebSocketService.stompClient = Stomp.over(socket)
      WebSocketService.stompClient.connect({}, () => WebSocketService.onConnected(username),
          WebSocketService.onError)
      dispatch(setUserStatus(UserStatus.ONLINE))
    }
    return () => {
      if (WebSocketService.stompClient.connected) {
        WebSocketService.stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket")
        })
      }
    }
  }, [nickname, username]);
  return (
        isLoading
          ? <Loader size={55}/>
          : <AppRouter/>
  );
}

export default App;
