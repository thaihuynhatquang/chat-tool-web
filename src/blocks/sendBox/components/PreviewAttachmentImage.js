import React from 'react';
import { PREVIEW_ATTACHMENT_SIZE } from '../constants';

const PreviewAttachmentImage = (props) => {
  const { url, removeAttachment } = props;
  return (
    <div className='position-absolute' style={{ top: 0 }}>
      <img
        alt='preview-send-attachment'
        src={url}
        width={PREVIEW_ATTACHMENT_SIZE}
        height={PREVIEW_ATTACHMENT_SIZE}
        className='border rounded object-fit-cover ml-4 my-1'
      />
      <i
        className='position-absolute text-secondary bg-white round-circle fas fa-times-circle cursor-pointer'
        style={{ top: '.5rem', right: '.25rem' }}
        onClick={removeAttachment}
      />
    </div>
  );
};

export default PreviewAttachmentImage;
