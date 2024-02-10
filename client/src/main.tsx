import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {setupStore} from "./store/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
