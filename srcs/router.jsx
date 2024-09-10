import * as React from "react";
import './Main.css'
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { BASE_URL } from "./config/HostConfig";
import Try from "./pages/try/Try";
import TelVerify from "./pages/telVerify/TelVerify";
import MyQr from "./pages/myQr/MyQr";
import Member from "./pages/member/Member";
import Scan from "./pages/scan/Scan";
import Transfer from "./pages/transfer/Transfer";
import Ranking from "./pages/ranking/Ranking";


const router = createBrowserRouter([
    {
        path: BASE_URL.suburl + "/",
        element: (<Try />),
    },
    {
        path: BASE_URL.suburl + "/myqr",
        element: (<MyQr />),
    },
    {
        path: BASE_URL.suburl + "/telverify",
        element: (<TelVerify />)
    },
    {
        path: BASE_URL.suburl + "/member",
        element: (<Member />),
    },
    {
        path: BASE_URL.suburl + "/scan",
        element: (<Scan />),
    },
    {
        path: BASE_URL.suburl + "/scan/transfer",
        element: (<Transfer />),
    },
    {
        path: BASE_URL.suburl + "/ranking",
        element: (<Ranking />)
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);