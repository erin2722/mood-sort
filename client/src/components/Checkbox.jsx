import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = styled.input`
  cursor: pointer;
  height: 20px;
  width: 20px;
  :hover {
    background-color: #bbbeff;
  }
`;

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => (
  <Input type={type} name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
