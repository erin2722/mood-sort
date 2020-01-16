import React, { Component } from 'react';
import styled from 'styled-components';
import LovingFace from './LovingFace.jsx';
import SadFace from './SadFace.jsx';
import HappyFace from './HappyFace.jsx';
import AngryFace from './AngryFace.jsx';

//animate the title

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 45px;
    padding-bottom: 5px;
`;

const TitleBold = styled.div`
    font-weight: 800;
`;

const TitleNotBold = styled.div``;

const Description = styled.div`
    font-size: 18px;
    padding-bottom: 5px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: Arial;
    font-style: italic;
`;

class Header extends Component {
    render() {
        if(this.props.loggedIn) {
            return(
                <Wrapper>
                    <Title>
                        <HappyFace />
                        <LovingFace />
                        <TitleBold>mood</TitleBold><TitleNotBold>-sort</TitleNotBold>
                        <AngryFace />
                        <SadFace />
                    </Title>
                    <Description>sort large, unkept playlists into smaller playlists by mood</Description>
                </Wrapper>
            );
        } else {
            return(
                <Wrapper>
                    <Title>
                        <HappyFace />
                        <LovingFace />
                        <TitleBold>mood</TitleBold><TitleNotBold>-sort</TitleNotBold>
                        <AngryFace />
                        <SadFace />
                    </Title>
                    <Description>sort large, unkept playlists into smaller playlists by mood</Description>
                    <br></br><br></br>
                    <Description>log into spotify to get started</Description>
                </Wrapper>
            );
        }
    }
}

export default Header;