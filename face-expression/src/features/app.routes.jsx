import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";
import Protected from "./auth/components/Protected";

export const router = createBrowserRouter([
{
    path: "/",
    element: <Protected><h1>Home</h1></Protected>
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