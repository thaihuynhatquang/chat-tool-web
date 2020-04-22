// @flow
import React, { Fragment } from 'react';
import { compose, withState } from 'recompose';

const TagItem = ({ tag, isChoose }) => {
  return (
    <small className='cursor-pointer'>
      <div className='d-inline-block px-1 mr-1 rounded text-white' style={{ backgroundColor: tag.color }}>
        {tag.name}
        {isChoose ? <i className='fas fa-times pl-1' /> : <i className='fas fa-check pl-1' />}
      </div>
    </small>
  );
};

const getTagList = (tags, isChoose = false) => {
  return tags.map((tag, index) => {
    return <TagItem tag={tag} key={index} isChoose={isChoose} />;
  });
};

const TagSelector = (props) => {
  const tagsWantToChoose = props.tags.filter(
    (aTag) => props.customerTags.findIndex((t) => t.name === aTag.name) === -1,
  );
  return (
    <Fragment>
      <div>
        {getTagList(props.customerTags, true)}
        <span
          className='p-1 mr-1 rounded text-primary'
          onClick={(e) => props.setOpenTagSelector(!props.openTagSelector)}>
          <i className='fas fa-plus-circle' />
        </span>
      </div>
      {props.openTagSelector && getTagList(tagsWantToChoose, false)}
    </Fragment>
  );
};

const enhance = compose(withState('openTagSelector', 'setOpenTagSelector', false));

export default enhance(TagSelector);
