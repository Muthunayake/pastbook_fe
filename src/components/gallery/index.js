import React, {Component} from 'react';
import {connect} from 'react-redux';
import {remove} from 'lodash';

import {PHOTO_LIMIT, SELECTED_INDEX, REMOVED_INDEX} from '../../constants/constant';
import {checkLoginAfterRefresh, getPhotos} from '../../services/facebookService';
import {loadPhotos, savePhotos} from '../../services/galleryService';
import {setError} from "../../actions/galleryActions";
import * as MESSAGES from '../../locale/en/alert.json';
import FacebookGallery from './facebookGallery';
import UserGallery from './userGallery';
import EmptyState from './emptyState';
import Alert from '../ds/alert';
import Item from '../item';


class Gallery extends Component {
    constructor() {
        super();

        this.state = {
            photos: [],
            selectedPhotos: [],
            selectingPhotos: [],
            removingPhotos: [],
        }
    };

    componentDidMount() {
        this.props.getPhotos();
        this.props.loadPhotos();
    };

    componentDidUpdate(prevProps) {
        const {facebook, gallery} = this.props;

        if (facebook.photos !== prevProps.facebook.photos) {
            this.setState({
                photos: facebook.photos
            }, () => {
                if (this.state.selectedPhotos.length === 0) {
                    this.setDefaultPhotos();
                }
            });
        };
        
        if (gallery.photos !== prevProps.gallery.photos) {
            this.setState({selectedPhotos: gallery.photos});
        };
    };

    handleSelectedPhotos = (params) => {
        const {type, id, checked} = params;
        let photos = this.state[type];

        if (checked)
            photos.push(id);
        else 
            photos = photos.filter(temp => temp != id);
        
        this.setState({[type] :photos});
    };

    getItems = (type, photos, event) => {
        const listItems = photos.map((photo) =>
            <Item
                onChange={event} 
                image={photo.image}
                id={photo.id}
                key={photo.id}
                type={type}
            />
        );
        
        if (listItems.length === 0) return <EmptyState/>;

        return listItems;
    };

    setSelectedPhoto = () => {
        const {photos, selectingPhotos, selectedPhotos} = this.state;

        let removed = remove(photos, function(photo) {
            return selectingPhotos.includes(photo.id);
        });

        if (selectedPhotos.length + selectingPhotos.length > PHOTO_LIMIT) {
            this.props.setError(MESSAGES.gallery.update.error);
            this.setState({selectingPhotos: []});
            return;
        }

        this.setState(state => ({
            selectedPhotos: [...state.selectedPhotos, ...removed],
            photos,
            selectingPhotos: []
        }), () => {
            this.props.savePhotos(this.state.selectedPhotos);
        });
    };

    setDefaultPhotos = () => {
        this.setState({
            selectedPhotos: this.state.photos.slice(0, PHOTO_LIMIT)
        });
    };

    removeSelectedPhoto = () => {
        const {removingPhotos, selectedPhotos} = this.state;

        let removed = remove(selectedPhotos, function(photo) {
            return removingPhotos.includes(photo.id);
        });

        this.setState(state => ({
            photos: [...state.photos, ...removed],
            selectedPhotos,
            removingPhotos: []
        }), () => {
            this.props.savePhotos(this.state.selectedPhotos);
        });
    };

    renderAlert = () => {
        const {gallery} = this.props;
        let type = null;
        let message = null;

        if (gallery.saveStatus) {
            message = MESSAGES.gallery.update.sucess;
        } else if (gallery.galleryError) {
            message = gallery.galleryError;
            type= 'error';
        }
       
        if (message) {
            return (
                <Alert
                    message={message}
                    type={type}
                />
            );
        }
    }

    render() {
        const {photos, selectedPhotos, selectingPhotos, removingPhotos} = this.state;
        
        return(
            <div className="p-5">
                {
                   this.renderAlert()
                }
                <FacebookGallery
                    getItems={() => this.getItems(SELECTED_INDEX, photos, this.handleSelectedPhotos)}
                    selectingPhotos={selectingPhotos}
                    setSelectedPhoto={this.setSelectedPhoto}
                    count={photos.length}
                />
                <UserGallery
                    getItems={() => this.getItems(REMOVED_INDEX, selectedPhotos, this.handleSelectedPhotos)}
                    selectedPhotos={selectedPhotos}
                    removingPhotos={removingPhotos}
                    removeSelectedPhoto={this.removeSelectedPhoto}
                />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
   return {
        facebook: state.facebook,
        gallery: state.gallery,
   };
};

const mapDispatchToProps = (dispatch) => ({
    checkLoginAfterRefresh: () => dispatch(checkLoginAfterRefresh()),
    getPhotos: () => dispatch(getPhotos()),
    loadPhotos: () => dispatch(loadPhotos()),
    savePhotos: (payload) => dispatch(savePhotos(payload)),
    setError: (payload) => dispatch(setError(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);