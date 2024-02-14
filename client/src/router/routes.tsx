import React from 'react';
import HomePage from '../pages/HomePage.tsx';
import ProfilePage from '../pages/ProfilePage.tsx';
import DialogsPage from "../pages/DialogsPage.tsx";

interface IRoute {
  path: string;
  element: React.ReactNode;
}
export enum RouteNames {
  HOME = '/',
  PROFILE = '/profile',
  DIALOGS = '/dialogs'
}
export const ROUTES: IRoute[] = [
  { path: RouteNames.HOME, element: <HomePage /> },
  { path: RouteNames.PROFILE, element: <ProfilePage /> },
  { path: RouteNames.DIALOGS, element: <DialogsPage/>}
];
