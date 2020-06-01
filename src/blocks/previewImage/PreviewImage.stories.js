import React from 'react';
import { storiesOf } from '@storybook/react';
import PreviewImage from './components/PreviewImage';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

function makeUnsplashSrc(id) {
  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}

const DEFAULT_IMAGES = [
  {
    id: '1470619549108-b85c56fe5be8',
    caption: 'Photo by Alan Emery',
    orientation: 'square',
    useForDemo: true,
  }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
  {
    id: '1471079502516-250c19af6928',
    caption: 'Photo by Jeremy Bishop',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
  {
    id: '1454023492550-5696f8ff10e1',
    caption: 'Photo by Jessica Weiller',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
  {
    id: '1470854989922-5be2f7456d78',
    caption: 'Photo by Piotr Łaskawski',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
  {
    id: '1470317596697-cbdeda56f999',
    caption: 'Photo by Michel Bosma',
    orientation: 'landscape',
    useForDemo: true,
  }, // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
];
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
