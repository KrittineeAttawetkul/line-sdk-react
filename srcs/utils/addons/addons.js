export {
    permissionChecker
}


const permissionChecker = () => {
    return new Promise(async (resolve, reject) => {
        let response = {
            status: false,
            errMsg: '',
        };
        let userAgent = navigator.userAgent.toLocaleLowerCase();
        let pattern = /android/;

        if (!!navigator.permissions) {
            resolve(response);
        } else {
            if (pattern.test(userAgent)) {
                response.status = true
                resolve(response);
            }
        }
    })
}