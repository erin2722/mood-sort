import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.div``;

const Description = styled.div``;

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <div>Mood Sort</div>
                <div>sort large, unkept playlists into smaller playlists by mood.</div>
            </div>
        );
    }
}

export default Header;