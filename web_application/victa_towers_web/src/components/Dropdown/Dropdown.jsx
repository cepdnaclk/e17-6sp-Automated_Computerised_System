import React from "react";
import "./dropdown.css"

import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
} from "./styles.jsx";

export function Dropdown(props) {
  return (
    <DropdownWrapper action={props.action} onChange={props.onChange}>
      <StyledSelect id="services" name="role" className="dropdown" >
        {props.children}
      </StyledSelect>

    </DropdownWrapper>
  );
}

export function Option(props) {
  return <StyledOption selected={props.selected}>{props.value}</StyledOption>;
}
