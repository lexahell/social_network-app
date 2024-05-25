import React from 'react';
import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import {PRIVATE_ROUTES, PUBLIC_ROUTES} from "./routes.tsx";
import {useAppSelector} from "../hooks/redux.ts";
import {AuthType} from "../types/AuthType.ts";

const AppRouter: React.FC = () => {
    const {authType} = useAppSelector(state => state.authReducer)
    return (
        <Routes>
            <Route path="/*" element={<Navigate to={authType !== AuthType.NOT_AUTHED ? '/' : '/login'} />} />
            {PRIVATE_ROUTES.map((privateRoute) => (
                <Route
                    key={privateRoute.path}
                    path={privateRoute.path}
                    element={authType !== AuthType.NOT_AUTHED ? privateRoute.element : <Navigate to={'/login'}/>}
                />
            ))}
            {PUBLIC_ROUTES.map((publicRoute) => (
                <Route
                    key={publicRoute.path}
                    path={publicRoute.path}
                    element={authType === AuthType.NOT_AUTHED ? publicRoute.element : <Navigate to={'/'}/>}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;