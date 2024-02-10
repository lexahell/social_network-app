import React from 'react';
import {
    Route,
    Routes
} from "react-router-dom";
import {ROUTES} from "./routes.tsx";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {
                ROUTES.map(route => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))
            }
        </Routes>
    );
};

export default AppRouter;