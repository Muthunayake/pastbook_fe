import {FETCH_ALL, SAVE_STATUS, GALLERY_ERROR, CLEAR_GALLERY_ERROR} from "../constants/actionType";

const initState = {photos: [], saveStatus: false};

export function gallery(state = initState, action) {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                photos: action.payload.data.photos
            };
        case SAVE_STATUS:
            return {
                ...state,
                saveStatus: action.payload
            };
        case GALLERY_ERROR:
            return {
                ...state,
                galleryError: action.payload
            };
        case CLEAR_GALLERY_ERROR:
            return {
                ...state,
                galleryError: null
            };
        default:
            return state;
    }
}
