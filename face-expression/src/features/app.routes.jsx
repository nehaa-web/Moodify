import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";

export const router = createBrowserRouter([
{
    path: "/",
    element: <h1>Home</h1>
},
{
    path: "/register",
    element: <Register/>
},
{
    path: "/login",
    element: <Login/>
}

])