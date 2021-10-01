const userGallery = props => {
    const {
        selectedPhotos, 
        removingPhotos, 
        getItems,
        removeSelectedPhoto
    } = props;

    return (
        <div className="card mt-2">
            <div className="card-header bg-light">
                <div className="row">
                    <div className="col-md-10">
                        <i className="fa fa-picture-o me-2 fa-lg text-primary"></i>
                        <label>User Gallery <small className="text-muted">({selectedPhotos.length})</small></label>
                    </div>
                    <div className="col-md-2">
                        {
                            selectedPhotos.length > 0 &&
                            (
                                <div>
                                    <button 
                                        className="btn btn-danger float-end btn-sm"
                                        onClick={removeSelectedPhoto}
                                        disabled={removingPhotos.length === 0}
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
                {getItems()}
            </div>                
        </div>
    );
};

export default userGallery;
