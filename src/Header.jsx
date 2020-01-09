import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.div``;

const Description = styled.div``;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Wrapper>
                <div>Mood Sort</div>
                <div>sort large, unkept playlists into smaller playlists by mood.</div>
            </Wrapper>
        );
    }
}

export default Header;