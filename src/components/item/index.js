import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

class Item extends PureComponent {
    onChange = (event) => {
        this.props.onChange({
            ...this.props,
            checked: event.target.checked,
        });
    }

    render() {
        const {image, id, checked} = this.props;

        return (
            <div className="p-0 py-1" style={{width: '8rem'}}>   
                <a href={image} target="_blank" rel="noreferrer">
                    <img
                        alt="no-preview"
                        src={image}
                        className="custom-thumbnail rounded shadow-1-strong"
                    /> 
                </a> 
                <input
                    className="form-check-input mx-1"
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
