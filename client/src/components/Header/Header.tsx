import React from 'react';
import styles from './Header.module.css';
import logo from '../../imges/Illustration-of-logo-design-template-on-transparent-background-PNG.png';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router/routes.tsx';

const Header: React.FC = () => {
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
          {/*Пока все ведут на главную страницу*/}
          <Link to={RouteNames.HOME}>
            <h3>News</h3>
          </Link>
          <Link to={RouteNames.HOME}>
            <h3>Dialogs</h3>
          </Link>
          <Link to={RouteNames.HOME}>
            <h3>Friends</h3>
          </Link>
          <Link to={RouteNames.PROFILE}>
            <h3>Profile</h3>
          </Link>
        </nav>
        <div className={styles.buttonSignContainer}>
          <button className={styles.buttonSign}>Sign in</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
