import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from './components/Image';
import Images from './components/Images';
import { DEFAULT_IMAGES } from 'storybook/sampleData';

const CustomersInfoWrapper = (story) => <div style={{ width: '30%', backgroundColor: '#eee' }}>{story()}</div>;

const makeUnsplashSrc = (id) => `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;

storiesOf('Image List', module)
  .addDecorator(CustomersInfoWrapper)
  .add('One Image', () => <Image src={makeUnsplashSrc(DEFAULT_IMAGES[1].id)} images={[]} alt='123' />)
  .add('Many Images', () => {
    const images = DEFAULT_IMAGES.map((image) => ({
      src: makeUnsplashSrc(image.id),
    }));
    return <Images images={images} />;
  });
