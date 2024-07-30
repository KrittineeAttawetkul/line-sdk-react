import * as React from "react";
import './Main.css'
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MyQr from "./pages/MyQR/MyQr";
import History from "./pages/History/History";
import Scan from "./pages/Scan/Scan";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>No endpoint page</div>,
    },
    {
        path: "/myqr",
        element: (<MyQr />),
    },
    {
        path: "/history",
        element: (<History />),
    },
    {
        path: "/scan",
        element: (<Scan />),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);