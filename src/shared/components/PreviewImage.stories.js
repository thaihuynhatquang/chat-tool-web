import React from 'react';
import { storiesOf } from '@storybook/react';
import PreviewImage from './PreviewImage';
import { DEFAULT_IMAGES } from 'storybook/sampleData';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

function makeUnsplashSrc(id) {
  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}

storiesOf('PreviewImage', module)
  .addDecorator(ThreadWrapper)
  .add('a image', () => (
    <PreviewImage style={{ width: 200, height: 150 }} src={makeUnsplashSrc(DEFAULT_IMAGES[0].id)} alt='oh yeah' />
  ))
  .add('full feature', () => (
    <PreviewImage
      style={{ width: 200, height: 150 }}
      src={makeUnsplashSrc(DEFAULT_IMAGES[0].id)}
      alt='oh yeah'
      images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
        src: makeUnsplashSrc(id),
      }))}
    />
  ))
  .add('many images', () => {
    return DEFAULT_IMAGES.map((image, index) => {
      return (
        <PreviewImage
          key={index}
          style={{ width: 200, height: 150 }}
          src={makeUnsplashSrc(DEFAULT_IMAGES[index].id)}
          alt='oh yeah'
          images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
            src: makeUnsplashSrc(id),
          }))}
        />
      );
    });
  })
  .add("imageSrc doesn't include in images", () => {
    return (
      <PreviewImage
        style={{ width: 200, height: 150 }}
        src={makeUnsplashSrc(DEFAULT_IMAGES[0].id)}
        alt='oh yeah'
        images={DEFAULT_IMAGES.slice(1).map(({ caption, id, orientation, useForDemo }) => ({
          src: makeUnsplashSrc(id),
        }))}
      />
    );
  });
