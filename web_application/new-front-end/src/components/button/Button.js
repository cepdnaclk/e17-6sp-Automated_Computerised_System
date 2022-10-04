import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button(props) {
  return (
    <React.Fragment>
        <div className="button-flip">
            <span><Link to={props.path}>{props.buttonName}</Link></span>
        </div>
    </React.Fragment>
  );
}

export default Button;
