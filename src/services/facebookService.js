import axios from 'axios';
import {login, status} from "../actions/authActions";
import {setPhotos} from "../actions/facebookActions";
import {authenticate} from './authService';

const photoLimit = 100;

export const doLogin = () => dispatch => {
    window.FB.login(response => {
        if (response.authResponse) {
            const obj = {
                response: response.authResponse,
                loggedIn: true
            }
            window.FB.api(`/${obj.response.userID}?fields=name,email`, userResponse => {
                if (userResponse) dispatch(authenticate(obj.response.accessToken, userResponse, obj));
            });
            dispatch(login({auth: obj}));
        }
    }, {scope: 'user_photos'});
};
 
export const checkLoginAfterRefresh = (callback) => dispatch => {
    window.FB.getLoginStatus(response => {    
        if (response.status === 'connected') {
            dispatch(status(true));
            dispatch(getPhotos());
        } else {
            window.FB.login(response => {
                if (response.authResponse) {
                    dispatch(getPhotos());
                }
            }, {scope: 'user_photos'});
            dispatch(status(false));
        }
    });
};

export const getPhotos = (num) => dispatch => {
    let photos = [];
    window.FB.api(`/me?fields=albums{name,count,photos.limit(${photoLimit}){images,likes}}`, response => {  
        if (response.hasOwnProperty('error')) {
            photos = JSON.parse(localStorage.getItem("photos"));
            dispatch(setPhotos({photos}));
        } else {
            photos = formatPhotos(response);
            localStorage.setItem("photos", JSON.stringify(photos));
            dispatch(setPhotos({photos}));
        }
    });
};

const formatPhotos = response => {
    
    if (response.hasOwnProperty('error')) return [];

    const photos = response.albums.data;
    let formatPhotos = [];

    photos.forEach((album) => {
        if (album.count === 0) return;

        album.photos.data.forEach((photo) => {
            formatPhotos.push({
                id: photo.id,
                image: photo.images.length > 0 ? photo.images[0].source : '',
                album: album.name
            });
        });
    });

    return formatPhotos;
};