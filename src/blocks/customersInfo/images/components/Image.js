import React from 'react';
import { pure } from 'recompose';
import PreviewImage from 'shared/components/PreviewImage';

const Image = (props) => {
  return (
    <PreviewImage
      src={props.src}
      alt={props.alt}
      images={props.images}
      className='object-fit-cover p-1 col-lg-4 col-md-6 col-xs-12'
      style={{
        height: '150px',
      }}
    />
  );
};

export default pure(Image);
