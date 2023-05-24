import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../components/home/Home";
import Menu from "../components/pages/menu/Menu";
import OurShop from "../components/pages/shop/OurShop";

export const router = createBrowserRouter([
    {
        path: "/",
        element : <Main />,
        children :[
            {
                path : "/",
                element : <Home />
            }, 
            {
                path : "/menu",
                element : <Menu />, 
            },
            {
                path : "/shop",
                element : <OurShop />
            }
        ]
    }
])