import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import Form from './Form';
import Tag from './Tag';

export const TagsInfo = (props) => {
  const { tags, isShowForm, toggleAddTagForm, addTag, searchTags, removeTag } = props;
  return (
    <div className='border-top mt-2'>
      <div className='d-flex justify-content-between my-2'>
        <small>Tags</small>
        <small onClick={toggleAddTagForm} className='btn-link cursor-pointer'>
          Thêm tag
        </small>
      </div>
      <Form
        tags={tags}
        isShowForm={isShowForm}
        toggleShowForm={toggleAddTagForm}
        addTag={addTag}
        searchTags={searchTags}
      />
      {tags.map((tag) => (
        <Tag tag={tag} key={tag.id} removeTag={removeTag} />
      ))}
    </div>
  );
};

const enhance = compose(
  withStateHandlers(
    { isShowForm: false },
    {
      toggleAddTagForm: ({ isShowForm }) => () => ({ isShowForm: !isShowForm }),
    },
  ),
);

export default enhance(TagsInfo);
