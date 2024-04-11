import React from 'react';
import HomePage from '../pages/HomePage.tsx';
import ProfilePage from '../pages/ProfilePage.tsx';
import DialogsPage from '../pages/DialogsPage.tsx';
import FriendsPage from '../pages/FriendsPage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import RegistrationPage from '../pages/RegistrationPage.tsx';

interface IRoute {
  path: string;
  element: React.ReactNode;
}

export enum RouteNames {
  HOME = '/',
  PROFILE = '/profile',
  DIALOGS = '/dialogs',
  FRIENDS = '/friends',
  LOGIN = '/login',
  REGISTRATION = '/registration',
}

export const PUBLIC_ROUTES: IRoute[] = [
  { path: RouteNames.LOGIN, element: <LoginPage /> },
  { path: RouteNames.REGISTRATION, element: <RegistrationPage /> },
];
export const PRIVATE_ROUTES: IRoute[] = [
  { path: RouteNames.HOME, element: <HomePage /> },
  { path: RouteNames.PROFILE, element: <ProfilePage /> },
  { path: RouteNames.DIALOGS, element: <DialogsPage /> },
  { path: RouteNames.FRIENDS, element: <FriendsPage /> },
];
