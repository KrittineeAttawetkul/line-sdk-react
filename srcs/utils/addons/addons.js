export {
    permissionChecker
}

const permissionChecker = () => {
    return new Promise((resolve) => {
        let response = {
            status: false,
            errMsg: '',
        };

        // Detecting Android through userAgent
        let userAgent = navigator.userAgent;
        // console.log("User Agent:", userAgent);
        let isAndroid = /Android/i.test(userAgent);

        // If Android is detected, mark status as true
        if (isAndroid) {
            console.log("Android device detected");
            response.status = true;
        } else {
            console.log("Non-Android device detected");
        }

        // Return the result
        resolve(response);
    });
}

// const permissionChecker = () => {
//     return new Promise(async (resolve, reject) => {
//         let response = {
//             status: false,
//             errMsg: '',
//         };
//         let userAgent = navigator.userAgent;
//         console.log("User Agent:", userAgent); // Log the userAgent
//         let pattern = /Android/i; // Case-insensitive matching

//         if (!!navigator.permissions) {
//             console.log("Permissions API available");
//             resolve(response);
//         } else {
//             console.log("Permissions API not available");
//             if (pattern.test(userAgent)) {
//                 console.log("Android user agent detected");
//                 response.status = true;
//                 resolve(response);
//             } else {
//                 console.log("Non-Android user agent detected");
//                 resolve(response);
//             }
//         }
//     });
// }
