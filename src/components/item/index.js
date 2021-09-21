import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

class Item extends PureComponent {
    constructor() {
        super();
    }

    onChange = (event) => {
        this.props.onChange({
            ...this.props,
            checked: event.target.checked,
        });
    }

    render() {
        const {image, id, checked} = this.props;

        return (
            <div className="p-0" style={{width: '8rem'}}>   
                <a href={image} target="_blank">
                    <img
                        src={image}
                        className="img-thumbnail custom-thumbnail"
                    /> 
                </a> 
                <input
                    className="form-check-input"
                    type="checkbox"
                    value={id}
                    checked={checked}
                    onChange={event => this.onChange(event)}
                />
            </div>
        );
    }
}

Item.propTypes = {
    image: PropTypes.string,
    checked: PropTypes.any,
};


Item.defaultProps = {
    image: PropTypes.string,
    checked: null
};

export default Item;
