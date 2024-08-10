import { RouteObject } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import { AccountPage } from "./pages/account/AccountPage";

type AppRouteObject = RouteObject & {
    children?: AppRouteObject[];
};

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/account',
        element: <AccountPage />
    }
]