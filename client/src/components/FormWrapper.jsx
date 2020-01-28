import React, { Component } from "react";
import styled from "styled-components";
import PlaylistForm from "./PlaylistForm.jsx";
import MoodForm from "./MoodForm.jsx";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 50px;
  margin-top: 50px;
`;

class FormWrapper extends Component {
  render() {
    return (
      <Wrapper>
        <PlaylistForm titles={this.props.titles} />
        <MoodForm moods={this.props.moods} />
      </Wrapper>
    );
  }
}

export default FormWrapper;
