import React from 'react';
import { Row, Col, Badge } from 'reactstrap';
import moment from 'moment';
import classNames from 'classnames';
import { formatThreadLastMessage } from '../utils';
import { visualTime } from 'shared/utils';

const avatarSize = 44;

const Thread = (props) => {
  const {
    thread: { id, title, lastMessage, additionData, missCount, missTime, updatedAt },
    isSelected,
    onSelectThread,
  } = props;
  const avatarUrl = (additionData && additionData.avatarUrl) || '/images/default.png';
  return (
    <Row
      className={classNames('py-2 border-bottom cursor-pointer', {
        'item-selected': isSelected,
      })}
      onClick={onSelectThread(id)}
      noGutters>
      <Col xs={2} className='px-2' style={{ maxWidth: 60 }}>
        <img
          src={avatarUrl}
          alt={title}
          className='mw-100 rounded-circle object-fit-cover'
          width={avatarSize}
          height={avatarSize}
        />
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
            <small className='text-secondary text-truncate d-block'>
              {lastMessage && formatThreadLastMessage(lastMessage)}
              &nbsp;
            </small>
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
        <Row>
          <Col>
            <small className='text-danger'>
              {missTime && `Chưa trả lời trong ${moment(missTime).fromNow()}`}
              &nbsp;
            </small>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Thread;
