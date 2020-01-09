import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import styled from 'styled-components';

var checkboxes = [
    {
      name: 'Happy',
      key: 'happy',
      label: 'Sad',
    },
    {
      name: 'Sad',
      key: 'sad',
      label: 'Sad',
    },
    {
        name: 'Bag',
        key: 'ad',
        label: 'Sad',
      },
      {
        name: 'Chill',
        key: 'sd',
        label: 'Sad',
      },
      {
        name: 'Good Vibes',
        key: 'sa',
        label: 'Sad',
      },
  ];

  const Wrapper = styled.div`
    
  `;

  const Label = styled.span`
    display: flex;
    align-items: center;
    padding: 10px;
  `;

  const Text = styled.span`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    return (
      <Wrapper>
        {
          checkboxes.map(item => (
            <Label>
              <Text>{item.name}</Text>
              <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
            </Label>
          ))
        }
      </Wrapper>
    );
  }
}

export default MoodForm;