import React, { Component } from "react";
import styled from "styled-components";
import BlackAndWhiteLogo from "../spotify-icons-logos/icons/02_CMYK/02_PNG/Spotify_Icon_CMYK_White.png";

const LogIn = styled.a`
  color: white;
  text-decoration: none;
  padding-left: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: #424fff;
  width: 200px;
  border-radius: 20px;
`;

class LogInButton extends Component {
  render() {
    return (
      <Wrapper>
        <img alt="spotify logo" src={BlackAndWhiteLogo} style={{ width: 30 }} />
        <LogIn href="/login">Log in to Spotify</LogIn>
        {/* http://localhost:8888/login */}
      </Wrapper>
    );
  }
}

export default LogInButton;
