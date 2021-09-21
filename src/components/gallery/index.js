import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {checkLoginAfterRefresh, getPhotos} from "../../services/facebookService";
import {loadPhotos, savePhotos} from "../../services/galleryService";
import Item from '../item';
import {remove} from 'lodash';

class Gallery extends PureComponent {
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

    handleFacebookPhotos = (params) => {
        const {id} = params;
        let {selectingPhotos} = this.state;

        if (params.checked === true) { 
            selectingPhotos.push(id);
        } else {
            selectingPhotos = selectingPhotos.filter(temp => temp != id);
        }

        this.setState({
            selectingPhotos
        });
    };

    handleSelectedPhotos = (params) => {
        const {id} = params;

        let {removingPhotos} = this.state;

        if (params.checked === true) { 
            removingPhotos.push(id);
        } else {
            removingPhotos = removingPhotos.filter(temp => temp != id);
        }
        
        this.setState({
            removingPhotos
        });
    };

    getItems = (photos, event) => {
        const listItems = photos.map((photo) =>
            <Item
                onChange={event} 
                image={photo.image}
                id={photo.id}
                key={photo.id}
            />
        );
        
        if (listItems.length === 0) return this.emptyState();

        return listItems;
    };

    emptyState = () => {
        return (
            <div className="text-center text-muted row">
                <h6>no photo found</h6>
                <i className="fa fa-picture-o me-2 fa-4x"></i>
            </div>
        );
    };

    setSelectedPhoto = () => {
        const {selectingPhotos, selectedPhotos} = this.state;
        let photos = [...this.state.photos];

        let removed = remove(photos, function(photo) {
            return selectingPhotos.includes(photo.id);
        });

        this.setState({
            selectedPhotos: [...selectedPhotos, ...removed],
            photos,
            selectingPhotos: []
        });
    };

    setDefaultPhotos = () => {
        this.setState({
            selectedPhotos: this.state.photos.slice(0, 9)
        });
    };

    removeSelectedPhoto = () => {
        const {removingPhotos, selectedPhotos} = this.state;
        let photos = [...this.state.photos];

        let removed = remove(selectedPhotos, function(photo) {
            return removingPhotos.includes(photo.id);
        });

        this.setState({
            photos: [...photos, ...removed],
            selectedPhotos,
            removingPhotos: []
        });
    };

    saveSelectedPhoto = () => {
        this.props.savePhotos(this.state.selectedPhotos);
    };

    render() {
        const {photos, selectedPhotos,selectingPhotos, removingPhotos} = this.state;

        return(
            <div className="p-5">
                {
                    this.props.gallery.saveStatus &&
                    <div className="row px-3">
                        <div className="alert alert-success" role="alert">
                            photos has been updated successfully
                        </div>
                    </div>
                }
                <div className="card">
                    <div className="card-header bg-light">
                        <div className="row">
                            <div className="col-md-11">
                                <i className="fa fa-facebook-official fa-lg me-2 text-primary"></i> 
                                <label>FaceBook Photos</label>
                            </div>
                            <div className="col-md-1">
                                <button 
                                    className="btn btn-primary float-end btn-sm" 
                                    onClick={this.setSelectedPhoto}
                                    disabled={selectingPhotos.length == 0}
                                > 
                                    { selectingPhotos.length > 0 ? `(${selectingPhotos.length})` : ''}  Select
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row p-3">
                        {this.getItems(photos, this.handleFacebookPhotos)}
                    </div>
                </div>
                <div className="card mt-2">
                    <div className="card-header bg-light">
                        <div className="row">
                            <div className="col-md-10">
                                <i className="fa fa-picture-o me-2 fa-lg text-primary"></i>
                                <label>Selected Photos</label>
                            </div>
                            <div className="col-md-2">
                                {
                                    selectedPhotos.length > 0 &&
                                    (
                                        <div>
                                            <button 
                                                className="btn btn-success float-end btn-sm ms-2"
                                                onClick={this.saveSelectedPhoto}
                                                disabled={selectedPhotos.length == 0}
                                            >
                                                Save
                                            </button>
                                            <button 
                                                className="btn btn-danger float-end btn-sm"
                                                onClick={this.removeSelectedPhoto}
                                                disabled={removingPhotos.length == 0}
                                            >
                                                { removingPhotos.length > 0 ? `(${removingPhotos.length})` : ''}  Remove
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row p-3">
                        {this.getItems(selectedPhotos, this.handleSelectedPhotos)}
                    </div>                
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => ({
    checkLoginAfterRefresh: () => dispatch(checkLoginAfterRefresh()),
    getPhotos: () => dispatch(getPhotos()),
    loadPhotos: () => dispatch(loadPhotos()),
    savePhotos: (payload) => dispatch(savePhotos(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);