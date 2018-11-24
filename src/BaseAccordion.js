import { Component } from 'react';
import { func, arrayOf, shape } from 'prop-types';

class BaseAccordion extends Component {
  static defaultProps = {
    stateReducer: (state, changes) => changes,
    onStateChange: () => {},
    openedIndexesThroughProps: undefined,
    children: () => {}
  };

  static propTypes = {
    stateReducer: func,
    onStateChange: func,
    openedIndexesThroughProps: arrayOf(shape({})),
    children: func
  };

  state = {
    openedIndexes: [0] // eslint-disable-line react/no-unused-state
  };

  getState = (state = this.state) => {
    const { openedIndexesThroughProps } = this.props;

    return {
      openedIndexes:
        openedIndexesThroughProps === undefined
          ? state.openedIndexes
          : openedIndexesThroughProps
    };
  };

  internalSetState = (changes, callback = () => {}) => {
    const { stateReducer, onStateChange } = this.props;
    let allChanges;
    this.setState(
      state => {
        const actualState = this.getState(state);
        const changesObject =
          typeof changes === 'function' ? changes(actualState) : changes;
        allChanges = stateReducer(actualState, changesObject);
        return allChanges;
      },
      () => {
        onStateChange(allChanges);
        callback();
      }
    );
  };

  handleItemClick = index => {
    this.internalSetState(state => {
      const closing = state.openedIndexes.includes(index);
      return {
        type: closing ? 'closing' : 'opening',
        openedIndexes: closing
          ? state.openedIndexes.filter(i => i !== index)
          : [...state.openedIndexes, index]
      };
    });
  };

  render() {
    const { children } = this.props;
    return children({
      openedIndexes: this.getState().openedIndexes,
      handleItemClick: this.handleItemClick
    });
  }
}

export default BaseAccordion;
