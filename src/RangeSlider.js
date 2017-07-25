import React from "react";
import PropTypes from 'prop-types'; 
const Slider = (props) => {
    return (
        <div className="range-container">
            {props.children} {props.value}
            <input type="range" min={props.min} max={props.max} onChange={props.onChange} value={props.value} />
        </div>
    )
}
Slider.PropTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}
export default Slider;