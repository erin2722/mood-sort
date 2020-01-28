import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => (props.isMobile ? "0px" : "10px")};
  margin-bottom: 15px;
  margin-right: 100px;
`;

const Form = styled.select`
  cursor: pointer;
  border-radius: 10px;
  padding: 5px;
  background-color: #bbbeff;
  width: 140px;
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

const Label = styled.div`
  margin-bottom: 10px;
`;

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handlePlaylistChange(event);
  }

  render() {
    return (
      <Wrapper isMobile={this.props.isMobile}>
        <Label>Choose One of Your Playlists to Sort:</Label>
        <Form value={this.props.value} onChange={this.handleChange}>
          <Option value="">Choose a Playlist</Option>
          <Option name="liked" value="liked">
            Liked Songs
          </Option>
          {this.props.titles.map(item => (
            <Option name={item.name} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Form>
      </Wrapper>
    );
  }
}

export default PlaylistForm;
