import React, { Component } from 'react';
import styled from 'styled-components';
import PlaylistForm from './PlaylistForm.jsx';
import MoodForm from './MoodForm.jsx';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 50px;
    margin-top: 50px;
`;

class FormWrapper extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Wrapper>
                <PlaylistForm titles = {['mountain songs', 'j vibing']} />
                <MoodForm moods = {['happy, sad, angry']} />
            </Wrapper>
        );
    }
}

export default FormWrapper;