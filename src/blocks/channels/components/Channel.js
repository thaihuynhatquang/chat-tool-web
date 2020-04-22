// @flow
import React, { Component } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import classNames from 'classnames';

class Channel extends Component {
  render() {
    const {
      channel: { id, title, additionData },
      missCount = 10,
      isSelected,
    } = this.props;
    const elementId = `channel-${id}`;
    const avatarUrl = (additionData && additionData.avatarUrl) || '/images/default.png';
    return (
      <div
        id={elementId}
        className={classNames('cursor-pointer p-2', {
          'item-selected': isSelected,
        })}>
        <div className='position-relative'>
          <img src={avatarUrl} className='rounded-circle mw-100 border' alt='avatar' />
          <span
            className='badge badge-pill badge-danger position-absolute'
            style={{ bottom: '-0.25rem', right: '-0.25rem' }}>
            <small>{missCount}</small>
          </span>
        </div>
        <UncontrolledTooltip placement='right' target={elementId} delay={{ hide: 0 }} hideArrow>
          <small>{title}</small>
        </UncontrolledTooltip>
      </div>
    );
  }
}

export default Channel;
