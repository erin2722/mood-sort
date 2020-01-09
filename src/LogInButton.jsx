import React, { Component } from 'react';
import styled from 'styled-components';
import BlackAndWhiteLogo from '../spotify-icons-logos/icons/02_CMYK/02_PNG/Spotify_Icon_CMYK_Black.png';


const LogIn = styled.a`
    color: white;
    text-decoration: none;
    padding-left: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: #424FFF;
    width: 200px;
    border-radius: 20px;
`;

class LogInButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Wrapper>
                <img src = {BlackAndWhiteLogo} style = {{ width: 30 }} /> <LogIn href = 'http://localhost:8888'>Log in to Spotify</LogIn>
            </Wrapper>
        );
    }
}

export default LogInButton;