const type = {
    success: 'success',
    error: 'danger'
};

const alert = (props) => {
    return (
        <div className="row px-3">
            <div className={`alert alert-${type[props.type ? props.type : 'success']}`} role="alert">
                {
                    props.message
                }
            </div>
        </div>
    );
};

export default alert;
