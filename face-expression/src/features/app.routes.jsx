import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/pages/Register";
import Login from "./auth/pages/Login";
import Protected from "./auth/components/Protected";
import Home  from "./home/pages/Home";


export const router = createBrowserRouter([
{
    path: "/",
    element: <Protected><Home/></Protected>
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