import React from 'react';
import { pure } from 'recompose';
import PreviewImage from 'shared/components/PreviewImage';

const Image = (props) => {
  return (
    <PreviewImage
      alt={''}
      src={props.src}
      images={props.images}
      className='object-fit-cover p-1 col-lg-4 col-md-6 col-xs-12'
      style={{
        height: '150px',
      }}
    />
  );
};

export default pure(Image);
