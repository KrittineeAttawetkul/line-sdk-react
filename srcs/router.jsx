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
import TelVerify from "./pages/telVerify/TelVerify";
import { BASE_URL } from "./config/HostConfig";

const router = createBrowserRouter([
    {
        path: BASE_URL.suburl + "/",
        element: <div>No endpoint page</div>,
    },
    {
        path: BASE_URL.suburl + "/api/myqr",
        element: (<MyQr />),
    },
    {
        path: BASE_URL.suburl + "/api/history",
        element: (<History />),
    },
    {
        path: BASE_URL.suburl + "/api/telverify",
        element: (<TelVerify />)
    },
    {
        path: BASE_URL.suburl + "/api/scan",
        element: (<Scan />),
    },
    {
        path: BASE_URL.suburl + "/api/scan/transfer",
        element: (<Transfer />),
    },
    {
        path: BASE_URL.suburl + "/api/scan/transfer/verify",
        element: (<Verify />)
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);