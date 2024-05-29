import React from 'react';
import styles from './Header.module.css';
import logo from '../../imges/Illustration-of-logo-design-template-on-transparent-background-PNG.png';
import {Link, useLocation} from 'react-router-dom';
import {RouteNames} from '../../router/routes.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {setAuthType, setIsAuthNotificationShown, setNickname, setUsername} from "../../store/slices/authSlice.ts";
import {AuthType} from "../../types/AuthType.ts";
import {WebSocketService} from "../../services/WebSocketService.ts";
import {setIsOtherUserProfile} from "../../store/slices/profileSlice.ts";

const Header: React.FC = () => {
  const location = useLocation()
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

  const setLastVisitedPage = (path: string) => {
    localStorage.setItem("lastVisitedPage", path)
  }

  const redirectToProfile = () => {
    dispatch(setIsOtherUserProfile(false))
    setLastVisitedPage(`${RouteNames.PROFILE}/${username}`)
  }
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.logo}>
          <div className={styles.logoImg}>
            <img src={logo} alt='' />
          </div>
          <div className={styles.logoText}>VMUTE</div>
        </div>
        <nav>
          <Link to={RouteNames.HOME} onClick={() => setLastVisitedPage(`${RouteNames.HOME}`)} className={`${location.pathname === '/' ? styles.active : ''}`}>
            <h3>News</h3>
          </Link>
          <Link to={RouteNames.DIALOGS} onClick={() => setLastVisitedPage(`${RouteNames.DIALOGS}`)} className={`${location.pathname === '/dialogs' ? styles.active : ''}`}>
            <h3>Dialogs</h3>
          </Link>
          <Link to={RouteNames.FRIENDS} onClick={() => setLastVisitedPage(`${RouteNames.FRIENDS}`)} className={`${location.pathname === '/friends' ? styles.active : ''}`}>
            <h3>Friends</h3>
          </Link>
          <Link to={`${RouteNames.PROFILE}/${username}`} onClick={redirectToProfile} className={`${location.pathname === `/profile/${username}` ? styles.active : ''}`}>
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
