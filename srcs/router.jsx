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
import Transfer from "./pages/transfer/Transfer";
import Verify from "./pages/Verify/Verify";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>No endpoint page</div>,
    },
    {
        path: "/api/myqr",
        element: (<MyQr />),
    },
    {
        path: "/api/history",
        element: (<History />),
    },
    {
        path: "/api/scan",
        element: (<Scan />),
    },
    {
        path: "/api/scan/transfer",
        element: (<Transfer />),
    },
    {
        path: "/api/scan/transfer/verify",
        element: (<Verify />)
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);