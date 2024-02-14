import React from 'react';
import HomePage from '../pages/HomePage.tsx';
import ProfilePage from '../pages/ProfilePage.tsx';
import FriendsPage from '../pages/FriendsPage.tsx';

interface IRoute {
  path: string;
  element: React.ReactNode;
}
export enum RouteNames {
  HOME = '/',
  PROFILE = '/profile',
  FRIENDS = '/friends',
}
export const ROUTES: IRoute[] = [
  { path: RouteNames.HOME, element: <HomePage /> },
  { path: RouteNames.PROFILE, element: <ProfilePage /> },
  { path: RouteNames.FRIENDS, element: <FriendsPage /> },
];
