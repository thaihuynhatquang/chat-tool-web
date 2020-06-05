import classNames from 'classnames';
import React from 'react';
import { compose, lifecycle, mapProps, withHandlers, withState } from 'recompose';

export const SendBox = (props) => {
  const {
    message,
    sendAndResetBox,
    size,
    height,
    dragOver,
    onMessageChange,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = props;

  const sendMessageOnEnter = (e) => {
    if (e.key === 'Enter') sendAndResetBox();
  };

  return (
    <input
      value={message}
      className={classNames('border-0 ml-4 text-dark focus-highlight-disabled w-100', {
        'font-size-sm': size === 'sm',
      })}
      placeholder={dragOver ? 'Nhả chuột để thả!' : 'Nhập tin nhắn...'}
      style={{ height }}
      onChange={(e) => onMessageChange(e.target.value)}
      onKeyPress={sendMessageOnEnter}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  );
};

// enhance component
const enhance = compose(
  withState('dragOver', 'setDragOver', false),
  withHandlers({
    handleDragEnter: (props) => () => {
      props.setDragOver(true);
    },
    handleDragLeave: (props) => () => {
      props.setDragOver(false);
    },
    handleDrop: (props) => (e) => {
      e.preventDefault();
      props.setDragOver(false);
      const data = e.dataTransfer;
      if (data.items) {
        const dropFile = data.items[0];
        if (dropFile.kind === 'file') {
          const itemFile = dropFile.getAsFile();
          props.onAttachmentDrop(itemFile);
        }
      }
    },
    handlePasteImageEvent: (props) => (e) => {
      const { items } = e.clipboardData;

      const attachment = Object.keys(items)
        .map((key) => items[key])
        .find((file) => file.type && file.type.includes('image'));

      if (!attachment) return;

      const itemFile = attachment.getAsFile();
      props.onAttachmentDrop(itemFile);
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('paste', this.props.handlePasteImageEvent);
    },
    componentWillUnmount() {
      window.removeEventListener('paste', this.props.handlePasteImageEvent);
    },
  }),
  mapProps(({ resetMessage, hideEmoji, setDragOver, handlePasteImageEvent, ...rest }) => rest),
);
export default enhance(SendBox);
