import React from "react";
import HomePage from "../pages/HomePage.tsx";

interface IRoute {
    path: string;
    element: React.ReactNode;
}
export enum RouteNames {
    HOME = '/',
}
export const ROUTES: IRoute[] = [
    {path: RouteNames.HOME, element: <HomePage/>},
]