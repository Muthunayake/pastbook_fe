const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
const facebookAppVersion = process.env.REACT_APP_FACEBOOK_APP_VERSION;
const facebookAppSdk = process.env.REACT_APP_FACEBOOK_SDK;

export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: facebookAppVersion
            });

            resolve();
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = facebookAppSdk;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));    
    });
}