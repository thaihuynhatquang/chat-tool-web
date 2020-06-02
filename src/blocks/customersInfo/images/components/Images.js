import React from 'react';
import Image from './Image';

const Images = (props) => {
  const { images } = props;
  return images.map((image, index) => <Image key={index} src={image.src} images={images} alt={image.src} />);
};

export default Images;
