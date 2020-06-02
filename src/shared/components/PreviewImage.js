import React, { Fragment } from 'react';
import Lightbox from 'react-images';
import { compose, withStateHandlers, withProps } from 'recompose';

const PreviewImage = compose(
  withProps((props) => {
    const { images, src } = props;
    let thumbnails = [];

    let indexImage = 0;
    if (images) {
      const indexMatch = images.findIndex((image) => image.src === src);
      if (indexMatch >= 0) {
        thumbnails = [...images];
        indexImage = indexMatch;
      } else {
        thumbnails = [{ src }, ...images];
      }
    } else {
      thumbnails = [{ src }];
    }
    return {
      thumbnails,
      indexImage,
    };
  }),
  withStateHandlers(
    (props) => ({
      lightboxIsOpen: false,
      currentImage: 0,
    }),
    {
      openLightbox: ({ lightboxIsOpen, currentImage }) => (index) => ({
        currentImage: index,
        lightboxIsOpen: true,
      }),
      closeLightbox: ({ lightboxIsOpen, currentImage }) => () => ({
        currentImage: 0,
        lightboxIsOpen: false,
      }),
      gotoPrevious: ({ lightboxIsOpen, currentImage }) => () => ({
        currentImage: currentImage - 1,
        lightboxIsOpen,
      }),
      gotoNext: ({ lightboxIsOpen, currentImage }) => () => ({
        currentImage: currentImage + 1,
        lightboxIsOpen,
      }),
      gotoImage: ({ lightboxIsOpen }) => (index) => ({
        currentImage: index,
        lightboxIsOpen,
      }),
    },
  ),
);

export default PreviewImage((newprops) => {
  const {
    lightboxIsOpen,
    currentImage,
    gotoNext,
    gotoPrevious,
    gotoImage,
    closeLightbox,
    openLightbox,
    thumbnails,
    src,
    indexImage,
    className,
    ...rest
  } = newprops;

  return (
    <Fragment>
      <img
        className={`${className || ''} cursor-pointer`}
        src={src}
        onClick={() => openLightbox(indexImage)}
        {...rest}
        alt={src}
      />
      <Lightbox
        currentImage={currentImage}
        images={thumbnails}
        isOpen={lightboxIsOpen}
        onClickNext={gotoNext}
        onClickPrev={gotoPrevious}
        onClickThumbnail={gotoImage}
        onClose={closeLightbox}
        showThumbnails={thumbnails.length > 1}
        showCloseButton={false}
        backdropClosesModal
      />
    </Fragment>
  );
});
