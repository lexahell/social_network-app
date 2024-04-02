import './App.css';
import AppRouter from "./router/AppRouter.tsx";
import {useGetUserInfoQuery} from "./services/socialAppService.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/redux.ts";
import {setAuthType, setNickName, setUserName} from "./store/slices/authSlice.ts";
import {AuthType} from "./types/AuthType.ts";
import Loader from "./components/UI/Loader/Loader.tsx";

function App() {
  const {data, isLoading} = useGetUserInfoQuery(localStorage.getItem("token") ?? "", {
    skip: !localStorage.getItem("token")
  })
  const {authType} = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (localStorage.getItem("token") && data) {
      if(authType === AuthType.NOT_AUTHED) {
        dispatch(setAuthType(AuthType.LOGIN))
      }
      dispatch(setNickName(data.nickname))
      dispatch(setUserName(data.username))
    }
  }, [data, authType]);
  return (
        isLoading
          ? <Loader/>
          : <AppRouter/>
  );
}

export default App;
