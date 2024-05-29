import React from 'react';
import styles from './ProfileHeader.module.css';
import {UserStatus} from "../../types/UserStatus.ts";
import {Avatar, Badge, styled} from "@mui/material";
import ProfileHeaderButtons from "../ProfileHeaderButtons/ProfileHeaderButtons.tsx";
interface ProfileHeaderProps {
  avatar?: string;
  nickname?: string;
  username: string;
  pageCover?: string;
  status?: UserStatus;
  isOtherUserProfile: boolean;
  isThisUserFriend: boolean;
  isSubscribed: boolean;
}

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 1px rgba(23, 23, 23, .9)`,
  }
}));

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  nickname,
    username,
  pageCover,
    status,
    isOtherUserProfile,
    isThisUserFriend,
    isSubscribed
}) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.coverContainer}>
        <img src={pageCover} className={styles.pageCover} />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.mainInfo}>
          {
            isOtherUserProfile
                ? status === UserStatus.ONLINE
                    ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        variant="dot"
                    >
                      <Avatar alt={nickname} src={avatar} sx={{width: 70, height: 70}}/>
                    </StyledBadge>
                    : <Avatar alt={nickname} src={avatar} sx={{width: 70, height: 70}}/>
                : <Avatar alt={nickname} src={avatar} sx={{width: 70, height: 70}}/>
          }
          <div>
            <div className={styles.mainInfoNickName}>{nickname}</div>
          </div>
        </div>
        <ProfileHeaderButtons
            username={username}
            isOtherUserProfile={isOtherUserProfile}
            isFriend={isThisUserFriend}
            isSubscribed={isSubscribed}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;