/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import messengerIcons from 'emoji-mart/data/messenger.json';
import { NimblePicker } from 'emoji-mart';

const sharedIconClass = 'fa-lg px-2 align-bottom text-secondary';
const sendBoxHeight = 80;

class SendBox extends Component {
  state = {
    isShowEmoji: false,
    message: '',
  };
  toggleShowEmoji = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      isShowEmoji: !prevState.isShowEmoji,
    }));
  };
  handleMessageChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };
  render() {
    const { isShowEmoji, message } = this.state;
    const { disabled } = this.props;
    return (
      <div style={{ height: sendBoxHeight }} className='border-top d-flex justify-content-between align-items-center'>
        {disabled ? (
          <div className='text-secondary text-center w-100 cursor-disabled'>
            Không thể gửi tin nhắn trong cuộc hội thoại này
          </div>
        ) : (
          <Fragment>
            <input
              value={message}
              className='border-0 flex-grow-1 pl-3 text-dark focus-highlight-disabled'
              placeholder='Nhập tin nhắn...'
              onChange={this.handleMessageChange}
            />
            <span className='px-3 text-secondary position-relative'>
              <label>
                <input id='send-file-inp' type='file' className='d-none' />
                <i htmlFor='send-file-inp' className={`${sharedIconClass} fas fa-paperclip cursor-pointer`} />
                <a href='#' onClick={this.toggleShowEmoji}>
                  <i className={`${sharedIconClass} far fa-smile-wink`} />
                </a>
                <a href='#'>
                  <i className={`${sharedIconClass} far fa-paper-plane`} />
                </a>
              </label>
              {isShowEmoji && (
                <NimblePicker
                  color='#007bff'
                  set='messenger'
                  data={messengerIcons}
                  sheetSize={32}
                  showPreview={false}
                  style={{
                    position: 'absolute',
                    bottom: '3rem',
                    right: 0,
                    userSelect: 'none',
                  }}
                />
              )}
            </span>
          </Fragment>
        )}
      </div>
    );
  }
}

export default SendBox;
