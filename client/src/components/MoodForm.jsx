import React from 'react';
import Checkbox from './Checkbox.jsx';
import styled from 'styled-components';
  
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Text = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const Heading = styled.div`

`;

class MoodForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map(),
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleMoodChange(e);
  }

  render() {
    return (
      <Wrapper>
        <Heading>Choose the Moods You Want Your Playlist Sorted Into:</Heading>
        {
          this.props.moods.map(item => (
            <Label>
              <Checkbox name={item.name} checked={this.props.checkedItems.get(item.name)} onChange={this.handleChange} />
              <Text>{item.name}</Text>
            </Label>
          ))
        }
      </Wrapper>
    );
  }
}

export default MoodForm;