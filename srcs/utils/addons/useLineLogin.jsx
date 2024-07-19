import liff from '@line/liff'

export default function useLineLogin(liffID) {
    return new Promise(async resolve => {
        liff.init({ liffId: liffID }, () => {
            let LineProfileStatus = !!localStorage.getItem('line_profile') ? true : false;
            if (liff.isLoggedIn()) {
                let lineProfile;
                const idToken = liff.getIDToken();
                const accessToken = liff.getAccessToken();

                liff.getProfile().then(async profile => {
                    lineProfile = {
                        id_token: idToken,
                        display_name: profile.displayName,
                        picture_url: profile.pictureUrl,
                        status_messeage: profile.statusMessage,
                        user_id: profile.userId,
                        access_token: accessToken
                    }
                    console.log("lineProfile: ", lineProfile);
                    window.localStorage.setItem('lineProfile', JSON.stringify(lineProfile))

                    console.log('liff.getIDToken(): ', liff.getIDToken())
                    resolve(lineProfile)
                })

            } else {
                liff.login()
            }
        })

    }, err => console.error(err))

}