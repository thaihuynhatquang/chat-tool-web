import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { branch, compose, mapProps, renderNothing } from 'recompose';

const TagOptionLabel = (tag) => {
  const { color, content } = tag;
  return <div style={{ color }}>{content}</div>;
};

const getOptionValue = (option) => option.id;

export const TagForm = (props) => {
  const { searchTags, addTag } = props;
  return (
    <div className='my-2'>
      <small>
        <AsyncSelect
          value={null}
          loadingMessage={() => 'Đang tải...'}
          noOptionsMessage={() => 'Danh sách rỗng'}
          placeholder='Tìm kiếm tag để thêm...'
          getOptionValue={getOptionValue}
          formatOptionLabel={TagOptionLabel}
          onChange={addTag}
          loadOptions={searchTags}
          defaultOptions
          cacheOptions
        />
      </small>
    </div>
  );
};

const enhance = compose(
  branch((props) => !props.isShowForm, renderNothing),
  mapProps(({ isShowForm, ...rest }) => rest),
);

export default enhance(TagForm);
