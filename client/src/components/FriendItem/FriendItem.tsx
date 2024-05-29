import React from 'react';
import styles from './FriendItem.module.css';
import {Avatar} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux.ts";
import {setIsOtherUserProfile, setProfileNickname, setProfileUsername} from "../../store/slices/profileSlice.ts";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router/routes.tsx";

const FriendItem: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const redirectToProfile = (username: string, nickname: string) => {
        dispatch(setProfileUsername(username))
        dispatch(setProfileNickname(nickname))
        dispatch(setIsOtherUserProfile(true))
        navigate(`${RouteNames.PROFILE}/${username}`)
    }

  return (
    <div className={styles.friendItemContainer}>
      <div className={styles.friendItemInfo}>
        <div className={styles.avatarContainer}>
          <Avatar alt={'Travis Skot'} src={'/broken-image.jpg'} sx={{width: 70, height: 70}}/>
        </div>
        <div className={styles.friendTextContainer}>
          <div className={styles.friendName}>Travis Skot</div>
          <div className={styles.onlineStatus}>
              <span>offline</span>
          </div>
        </div>
      </div>
      <div className={styles.SubscribeBtnContainer}>
          <button className={styles.viewProfileButton} onClick={() => redirectToProfile('Travis Scot', 'Travis Scot')}>
              View profile
          </button>
      </div>
    </div>
  );
};
export default FriendItem;
