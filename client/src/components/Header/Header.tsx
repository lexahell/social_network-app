import React from 'react';
import styles from './Header.module.css';
import logo from '../../imges/Illustration-of-logo-design-template-on-transparent-background-PNG.png';
import {Link} from 'react-router-dom';
import {RouteNames} from '../../router/routes.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {setAuthType, setIsAuthNotificationShown, setNickname, setUsername} from "../../store/slices/authSlice.ts";
import {AuthType} from "../../types/AuthType.ts";
import {WebSocketService} from "../../services/WebSocketService.ts";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const {username} = useAppSelector(state => state.authReducer)
  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.setItem("lastVisitedPage", RouteNames.HOME)
    dispatch(setAuthType(AuthType.NOT_AUTHED))
    dispatch(setNickname(""))
    dispatch(setUsername(""))
    dispatch(setIsAuthNotificationShown(false))
    WebSocketService.onLogout(username)
  }
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.logo}>
          <div className={styles.logoImg}>
            <img src={logo} alt='' />
          </div>
          <div className={styles.logoText}>Social network</div>
        </div>
        <nav>
          <Link to={RouteNames.HOME}>
            <h3>News</h3>
          </Link>
          <Link to={RouteNames.DIALOGS}>
            <h3>Dialogs</h3>
          </Link>
          <Link to={RouteNames.FRIENDS}>
            <h3>Friends</h3>
          </Link>
          <Link to={RouteNames.PROFILE}>
            <h3>Profile</h3>
          </Link>
        </nav>
        <div className={styles.buttonSignContainer}>
          <button className={styles.buttonSign} onClick={logOut}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
