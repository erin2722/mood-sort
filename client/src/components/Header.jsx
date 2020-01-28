import React, { Component } from "react";
import styled from "styled-components";
import LovingFace from "./LovingFace.jsx";
import SadFace from "./SadFace.jsx";
import HappyFace from "./HappyFace.jsx";
import AngryFace from "./AngryFace.jsx";

//animate the title

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 45px;
  padding-bottom: 5px;
`;

const Head = styled.div`
  display: flex;
  flex-direction: ${props => (props.isMobile ? "column" : "row")};
  align-items: center;
`;

const TitleBold = styled.div`
  font-weight: 800;
`;

const TitleNotBold = styled.div``;

const Description = styled.div`
  font-size: 18px;
  padding-bottom: ${props => (props.isMobile ? "0px" : "5px;")};
`;

const FaceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
    if (this.props.loggedIn) {
      return (
        <Wrapper>
          <Head isMobile={this.props.isMobile}>
            <FaceWrapper>
              <HappyFace />
              <LovingFace />
            </FaceWrapper>
            <Title>
              <TitleBold>mood</TitleBold>
              <TitleNotBold>-sort</TitleNotBold>
            </Title>
            <FaceWrapper>
              <AngryFace />
              <SadFace />
            </FaceWrapper>
          </Head>
          <Description>
            sort large, unkept playlists into smaller playlists by mood
          </Description>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Head isMobile={this.props.isMobile}>
            <FaceWrapper>
              <HappyFace />
              <LovingFace />
            </FaceWrapper>
            <Title>
              <TitleBold>mood</TitleBold>
              <TitleNotBold>-sort</TitleNotBold>
            </Title>
            <FaceWrapper>
              <AngryFace />
              <SadFace />
            </FaceWrapper>
          </Head>
          <Description>
            sort large, unkept playlists into smaller playlists by mood
          </Description>
          <br></br>
          <br></br>
          <Description>log into spotify to get started</Description>
        </Wrapper>
      );
    }
  }
}

export default Header;
