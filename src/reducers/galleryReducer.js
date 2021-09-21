import {FETCH_ALL, SAVE_STATUS} from "../constants/actionType";

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
        default:
            return state;
    }
}
