import React, { Component } from 'react';
import styled from 'styled-components';

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
  background-color: #BBBEFF;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  :focus {
    outline: none;
  }
`;

const Option = styled.option`
  cursor: pointer;
  background-color: #BBBEFF;
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size:  14px;
  `;

class PlaylistForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'nothing picked'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handlePlaylistChange(event);
    }

    render() {
        return (
          <Wrapper>
                <Form value={this.props.value} onChange={this.handleChange}>
                  <Option value = ''>Choose a Playlist</Option>
                  <Option value="liked">Liked Songs</Option>
                  {this.props.titles.map(item => (
                    <Option value = {item}>{item}</Option>
                 ))}
                </Form>
          </Wrapper>
          );
    }
}

export default PlaylistForm;