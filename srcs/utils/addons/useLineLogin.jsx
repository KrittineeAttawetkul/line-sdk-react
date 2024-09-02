import liff from '@line/liff'

export default function useLineLogin(liffID) {
    return new Promise(async (resolve, reject) => {

        console.log('useLineLogin liff id: ', liffID);

        try {
            await liff.init({
                liffId: liffID,
            }).then(async () => {

                console.log('login: ', liffID);

            // let LineProfileStatus = !!localStorage.getItem('line_profile') ? true : false;

            if (liff.isLoggedIn()) {
                console.log('islogin: ', liff.isLoggedIn());

                const idToken = liff.getIDToken();
                const accessToken = liff.getAccessToken();

                const profile = await liff.getProfile();
                console.log('profile: ', profile);

                const lineProfile = {
                    id_token: idToken,
                    display_name: profile.displayName,
                    picture_url: profile.pictureUrl,
                    status_message: profile.statusMessage,
                    user_id: profile.userId,
                    access_token: accessToken
                };

                console.log("lineProfile: ", lineProfile);
                window.localStorage.setItem('lineProfile', JSON.stringify(lineProfile));

                console.log('liff.getIDToken(): ', liff.getIDToken());

                resolve(lineProfile);

            } else {
                liff.login();
            }
            });
        } catch (err) {
            console.error("liff init: ", err);
            reject(err);
        }
    });
}


