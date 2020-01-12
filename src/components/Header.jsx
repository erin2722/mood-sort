import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.div`
    font-size: 45px;
    padding-bottom: 5px;
`;

const Description = styled.div`
    font-size: 18px;
    padding-bottom: 5px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: Andale Mono, monospace;
`;

class Header extends Component {
    render() {
        if(this.props.loggedIn) {
            return(
                <Wrapper>
                    <Title>mood-sort</Title>
                    <Description>sort large, unkept playlists into smaller playlists by mood</Description>
                </Wrapper>
            );
        } else {
            return(
                <Wrapper>
                    <Title>mood-sort</Title>
                    <Description>sort large, unkept playlists into smaller playlists by mood</Description>
                    <br></br><br></br>
                    <Description>log into spotify to get started</Description>
                </Wrapper>
            );
        }
    }
}

export default Header;