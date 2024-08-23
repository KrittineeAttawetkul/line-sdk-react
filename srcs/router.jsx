import * as React from "react";
import './Main.css'
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MyQr from "./pages/MyQR/MyQr";
// import History from "./pages/History/History";
// import Scan from "./pages/Scan/Scan";
// import Transfer from "./pages/transfer/Transfer";
// import Verify from "./pages/Verify/Verify";
import TelVerify from "./pages/telVerify/TelVerify";
import { BASE_URL } from "./config/HostConfig";
import Try from "./pages/try/Try";

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
    // {
    //     path: BASE_URL.suburl + "/history",
    //     element: (<History />),
    // },
    // {
    //     path: BASE_URL.suburl + "/scan",
    //     element: (<Scan />),
    // },
    // {
    //     path: BASE_URL.suburl + "/scan/transfer",
    //     element: (<Transfer />),
    // },
    // {
    //     path: BASE_URL.suburl + "/scan/transfer/verify",
    //     element: (<Verify />)
    // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);