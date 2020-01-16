import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    display: ${props => props.alert ? "flex" : "none" };
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 10px;
    width: 50%;
    background-color: #424FFF;
    border-radius: 15px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const Text = styled.div`
    padding-bottom: 10px;
`;

const Button = styled.button`
    cursor: pointer;
    color: white;
    background-color: #424FFF;
`;

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleAlertChange(e);
    window.location.reload(false);
  }

  render() {
    return (
      <Wrapper alert = {this.props.alert}>
        <Text>Check You Spotify Account!</Text>
        <Button onClick = {this.handleChange}>Close</Button>
      </Wrapper>
    );
  }
}

export default Alert;