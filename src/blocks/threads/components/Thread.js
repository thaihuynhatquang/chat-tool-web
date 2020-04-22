import React, { PureComponent } from 'react';
import { Row, Col, Badge } from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';
import { formatThreadLastMessage } from '../utils';
import { visualTime } from 'shared/utils';

class Thread extends PureComponent {
  render() {
    const {
      thread: { title, lastMsg, additionData, missCount, missTime, updatedAt },
      isSelected,
    } = this.props;
    const avatarUrl = (additionData && additionData.avatarUrl) || '/images/default.png';
    return (
      <Row
        className={classNames('py-2 border-bottom', {
          'item-selected': isSelected,
        })}
        noGutters>
        <Col xs={2} className='px-2' style={{ maxWidth: 60 }}>
          <img src={avatarUrl} className='mw-100 rounded-circle' alt='avatarI' />
        </Col>
        <Col xs={10} className='pl-2'>
          <Row noGutters>
            <Col xs={8} title={title} className='text-truncate'>
              <span>{title}</span>
            </Col>
            <Col xs={4}>
              <small title={updatedAt} className='text-secondary float-right pr-1'>
                {visualTime(updatedAt)}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <small className='text-secondary text-truncate d-block'>{formatThreadLastMessage(lastMsg)}</small>
            </Col>
            <Col xs={2}>
              {missCount > 0 && (
                <small className='float-right pr-1'>
                  <Badge color='danger' pill>
                    {missCount}
                  </Badge>
                </small>
              )}
            </Col>
          </Row>
          {missTime && (
            <Row>
              <Col>
                <small className='text-danger'>Chưa trả lời trong {moment(missTime).fromNow()}</small>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    );
  }
}

export default Thread;
