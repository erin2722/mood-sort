import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  cursor: pointer;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: #424fff;
  width: 200px;
  border-radius: 20px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  margin-bottom: 20px;
  :focus {
    outline: none;
  }
`;

class GoButton extends Component {
  render() {
    return <Wrapper onClick={this.props.onClick}>Sort Your Playlists!</Wrapper>;
  }
}

export default GoButton;
