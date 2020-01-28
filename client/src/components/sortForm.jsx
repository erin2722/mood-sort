import React, { Component } from "react";
import styled from "styled-components";
import MoodForm from "./MoodForm";

const options = ["mood", "year added", "genre", "decade"];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  margin-right: 100px;
`;

const Form = styled.select`
  cursor: pointer;
  border-radius: 10px;
  padding: 5px;
  background-color: #bbbeff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  :focus {
    outline: none;
  }
`;

const Option = styled.option`
  cursor: pointer;
  background-color: #bbbeff;
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
`;

class SortForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    if (this.state.value === "mood") {
      var formShown = <div>mood selected</div>;
    } else if (this.state.value === "year added") {
      var formShown = <div>year selected</div>;
    } else if (this.state.value === "genre") {
      var formShown = <div>genre selected</div>;
    } else if (this.state.value === "decade") {
      var formShown = <div>decade selected</div>;
    }
    return (
      <Wrapper>
        <Form value={this.state.value} onChange={this.handleChange}>
          <Option value="">How to Sort?</Option>
          {options.map(item => (
            <Option value={item}>{item}</Option>
          ))}
        </Form>
        {formShown}
      </Wrapper>
    );
  }
}

export default SortForm;
