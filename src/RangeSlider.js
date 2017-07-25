import React from "react";

const Slider = (props) => {
    return (
        <div className="range-container">
            {props.children} {props.value}
            <input type="range" min={props.min} max={props.max} onChange={props.onChange} value={props.value}/>
        </div>
    )
}

export default Slider;