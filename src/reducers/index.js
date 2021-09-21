import {combineReducers} from "redux";

import {auth} from "./authReducer";
import {facebook} from "./facebookReducer";
import {gallery} from "./galleryReducer";

const rootReducer = combineReducers({
    auth,
    facebook,
    gallery
});

export default rootReducer;