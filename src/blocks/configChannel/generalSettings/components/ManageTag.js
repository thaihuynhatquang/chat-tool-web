import Modal from 'antd/lib/modal';
import Tag from 'blocks/customersInfo/tags/components/Tag';
import React, { Fragment } from 'react';
import { Col, Container, FormGroup, Input, Row } from 'reactstrap';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { withToggle } from 'shared/hooks';

const NUM_OF_TAGS_PER_ROW = 8;
const ManageTag = (props) => {
  const {
    tags,
    canCreateTag,
    removeTag,
    isModalShow,
    handleOk,
    handleCancel,
    resetAndOpenModel,
    content,
    color,
    onClickTag,
    handleOnChangeContent,
    handleOnChangeColor,
  } = props;

  return (
    <Container fluid>
      {tags.map((tag, index) => (
        <span key={tag.id} className='mr-2'>
          <Tag
            tag={tag}
            onClickTag={canCreateTag ? onClickTag(tag) : undefined}
            removeTag={canCreateTag ? removeTag : undefined}
          />
          {(index + 1) % NUM_OF_TAGS_PER_ROW === 0 && <br />}
        </span>
      ))}
      {canCreateTag && (
        <Fragment>
          <div className='btn btn-link d-inline-block' onClick={resetAndOpenModel}>
            <small>Thêm tag</small>
          </div>
          <Modal title='Thêm, sửa tags' visible={isModalShow} onOk={handleOk} onCancel={handleCancel}>
            <FormGroup>
              <Row>
                <Col md={3}>Tên tag</Col>
                <Col md={9}>
                  <Input
                    bsSize='sm'
                    type='text'
                    value={content}
                    placeholder='Thêm tên tag'
                    onChange={handleOnChangeContent}
                  />
                </Col>
              </Row>
              <Row className='align-items-center pt-2'>
                <Col md={3}>Chọn màu</Col>
                <Col md={9}>
                  <div
                    className='position-relative overflow-hidden border border-radius'
                    style={{
                      width: '40px',
                      height: '40px',
                    }}>
                    <input
                      className='position-absolute border-0'
                      style={{
                        right: '-8px',
                        top: '-8px',
                        width: '56px',
                        height: '56px',
                      }}
                      type='color'
                      value={color}
                      onChange={handleOnChangeColor}
                    />
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </Modal>
        </Fragment>
      )}
    </Container>
  );
};

const enhance = compose(
  withToggle('modal'),
  withStateHandlers(
    { selectedTagId: null, content: '', color: '#000000' },
    {
      setSelectedTagId: (state) => (id) => ({ ...state, selectedTagId: id }),
      setContent: (state) => (content) => ({ ...state, content }),
      setColor: (state) => (color) => ({ ...state, color }),
      setState: (state) => (newState) => newState,
    },
  ),
  withHandlers({
    handleOk: (props) => (e) => {
      // call API
      const { selectedTagId: tagId, content, color } = props;
      props.createOrUpdateTag({
        tagId,
        content,
        color,
      });
      props.hideModal();
    },
    handleCancel: (props) => (e) => {
      props.hideModal();
    },
    handleOnChangeContent: (props) => (e) => {
      props.setContent(e.target.value);
    },
    handleOnChangeColor: (props) => (e) => {
      props.setColor(e.target.value);
    },
    onClickTag: (props) => (tag) => (e) => {
      props.showModal();
      props.setState({
        selectedTagId: tag.id,
        content: tag.content,
        color: tag.color,
      });
    },
    resetAndOpenModel: (props) => () => {
      props.showModal();
      props.setState({ selectedTagId: null, content: '', color: '#000000' });
    },
  }),
);

export default enhance(ManageTag);
