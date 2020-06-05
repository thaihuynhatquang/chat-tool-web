import React from 'react';

const Tag = (props) => {
  const { tag, removeTag, onClickTag } = props;

  return (
    <small onClick={onClickTag}>
      <span style={{ fontSize: '90%' }}>
        <span className='py-1 px-1 mr-2 rounded text-white' style={{ backgroundColor: tag.color }}>
          {tag.content}
          {removeTag && <i className='cursor-pointer fas fa-times pl-2' onClick={removeTag(tag.id)} />}
        </span>
      </span>
    </small>
  );
};

export default Tag;
