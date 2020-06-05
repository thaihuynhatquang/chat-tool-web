import React from 'react';

const PreviewAttachmentFile = (props) => {
  const { name, extension, removeAttachment } = props;
  return (
    <div className='position-absolute' style={{ top: 0 }}>
      <div className='d-flex'>
        <div>
          <i className='ml-4 my-1 text-primary fa-4x fas fa-file-upload' />
        </div>
        <div className='d-flex flex-column mt-3 ml-2'>
          <small className='font-weight-bold text-uppercase'>{extension}</small>
          <small>{name}</small>
        </div>
      </div>
      <i
        className='position-absolute text-secondary bg-white round-circle fas fa-times-circle cursor-pointer'
        style={{ top: '.5rem', right: '-1.5rem' }}
        onClick={removeAttachment}
      />
    </div>
  );
};

export default PreviewAttachmentFile;
