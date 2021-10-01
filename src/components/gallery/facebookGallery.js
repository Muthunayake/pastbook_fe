const facebookGallery = (props) => {
    const {
        selectingPhotos, 
        setSelectedPhoto, 
        getItems,
        count
    } = props;

    return (
        <div className="card">
            <div className="card-header bg-light">
                <div className="row">
                    <div className="col-md-11">
                        <i className="fa fa-facebook-official fa-lg me-2 text-primary"></i>
                        <label>FaceBook Gallery <small className="text-muted">({count})</small></label>
                    </div>
                    <div className="col-md-1">
                        <button
                            className="btn btn-primary float-end btn-sm"
                            onClick={setSelectedPhoto}
                            disabled={selectingPhotos.length === 0}
                        >
                            {
                                selectingPhotos.length > 0
                                    ? `(${selectingPhotos.length})`
                                    : ""
                            }
                            Select
                        </button>
                    </div>
                </div>
            </div>
            <div className="row p-3">
                {
                    getItems()
                }
            </div>
        </div>
    );
};

export default facebookGallery;
