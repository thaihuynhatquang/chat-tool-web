import classNames from 'classnames';
import { THREAD_STATUS_DONE, THREAD_STATUS_PROCESSING, THREAD_STATUS_SPAM, THREAD_STATUS_UNREAD } from 'shared/constants';
import React from 'react';
import { Col, CustomInput, Input, Row } from 'reactstrap';

const labelSize = 3;
const contentSize = 12 - labelSize;
const pillButtonClass = 'btn btn-sm px-1 py-0 mr-2';

const statusNameMap = {
  [THREAD_STATUS_UNREAD]: 'Chưa xử lý',
  [THREAD_STATUS_PROCESSING]: 'Hoạt động',
  [THREAD_STATUS_SPAM]: 'Spam',
  [THREAD_STATUS_DONE]: 'Hoàn thành',
};

const ORDER_DESC = 'desc';
const ORDER_ASC = 'asc';
const DEFAULT_LOCAL_FILTER = {
  title: '',
  status: THREAD_STATUS_PROCESSING,
  sort: ORDER_DESC,
  isMiss: false,
  isMine: false,
};

const Advance = (props) => {
  const { onSearch, toggleSearchMode, onChangeFilter, localFilterBy = DEFAULT_LOCAL_FILTER } = props;
  const {
    title = DEFAULT_LOCAL_FILTER.title,
    status = DEFAULT_LOCAL_FILTER.status,
    sort = DEFAULT_LOCAL_FILTER.sort,
    isMiss = DEFAULT_LOCAL_FILTER.isMiss,
    isMine = DEFAULT_LOCAL_FILTER.isMine,
  } = localFilterBy;
  return (
    <div>
      <Row className='mb-2'>
        <Col xs={labelSize} className='pt-1'>
          <small>Tên phòng</small>
        </Col>
        <Col xs={contentSize}>
          <Input
            bsSize='sm'
            autoComplete='off'
            name='thread-search'
            defaultValue={title}
            className='textarea-sm inline-input-border'
            onChange={(e) => onChangeFilter('title', e.target.value.trim())}
          />
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col xs={labelSize}>
          <small>Trạng thái</small>
        </Col>
        <Col xs={contentSize}>
          {Object.keys(statusNameMap).map((key) => (
            <button
              key={key}
              className={classNames(pillButtonClass, {
                'btn-primary': status === key,
                'btn-light': status !== key,
              })}
              onClick={() => onChangeFilter('status', key)}>
              <small>{statusNameMap[key]}</small>
            </button>
          ))}
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col xs={labelSize}>
          <small>Sắp xếp</small>
        </Col>
        <Col xs={contentSize}>
          <button
            className={classNames(pillButtonClass, {
              'btn-light': sort !== ORDER_DESC,
              'btn-primary': sort === ORDER_DESC,
            })}
            onClick={() => onChangeFilter('sort', ORDER_DESC)}>
            <small>Mới nhất</small>
          </button>
          <button
            className={classNames(pillButtonClass, {
              'btn-light': sort !== ORDER_ASC,
              'btn-primary': sort === ORDER_ASC,
            })}
            onClick={() => onChangeFilter('sort', ORDER_ASC)}>
            <small>Cũ nhất</small>
          </button>
        </Col>
      </Row>
      <Row>
        <Col xs={labelSize}>
          <label htmlFor='checkMissChatBox'>
            <small>Chưa trả lời</small>
          </label>
        </Col>
        <Col xs={contentSize}>
          <CustomInput
            type='checkbox'
            id='checkMissChatBox'
            label='&nbsp;'
            defaultChecked={isMiss}
            onClick={(e) => onChangeFilter('isMiss', e.target.checked)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={labelSize}>
          <label htmlFor='checkIsMineBox'>
            <small>Phòng của tôi</small>
          </label>
        </Col>
        <Col xs={contentSize}>
          <CustomInput
            type='checkbox'
            id='checkIsMineBox'
            label='&nbsp;'
            defaultChecked={isMine}
            onClick={(e) => onChangeFilter('isMine', e.target.checked)}
          />
        </Col>
      </Row>
      <div className='pb-2 d-flex justify-content-between'>
        <button className={classNames(pillButtonClass, 'btn-success')} onClick={onSearch}>
          <small>Tìm kiếm</small>
        </button>
        <button className={classNames(pillButtonClass, 'btn-link')} onClick={toggleSearchMode}>
          <small>Tìm kiếm cơ bản</small>
        </button>
      </div>
    </div>
  );
};

export default Advance;
