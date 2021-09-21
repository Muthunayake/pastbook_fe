import {ALL_PHOTOS} from "../constants/actionType";

const defaultState = {photos: []};

export function facebook(state = defaultState, action) {
    switch (action.type) {
        case ALL_PHOTOS:
            return {
                ...defaultState,
                photos: action.payload.photos,
            };
        default:
            return state;
    }
};
