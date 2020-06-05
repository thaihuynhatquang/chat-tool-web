import { MESSAGE } from 'shared/constants';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { compose, mapProps, pure, withHandlers, withState } from 'recompose';
import PreviewImage from 'shared/components/PreviewImage';
import { withExpiredAttachment } from 'shared/hooks';
import { getFilenameFromUrl } from '../utils';

const Attachments = (props) => {
  const { attachments, onLoadAttachmentFail } = props;
  const images = attachments
    .filter((att) => att.type === 'image')
    .map((image) => ({
      src: image.payload.url,
    }));
  const files = attachments.filter((att) => att.type === 'file');
  const videos = attachments.filter((att) => att.type === 'video');
  const audios = attachments.filter((att) => att.type === 'audio');
  const gifs = attachments.filter((att) => att.type === 'animated_image_share');
  const stickers = attachments.filter((att) => att.type === 'sticker');
  const fallbacks = attachments.filter((att) => att.type === 'fallback');

  // TODO: Rewrite using template cause current cause issue
  // eslint-disable-next-line
  const templates = attachments.filter((att) => att.type === 'template');

  const imageColSize = images.length === 1 ? 12 : images.length <= 4 ? 6 : 4;

  return (
    <div>
      {templates.length > 0 &&
        templates.map((template, index) => (
          <div key={index}>
            <a href={template.url}>{template.url}</a>
          </div>
        ))}
      {images.length > 0 && (
        <Row noGutters>
          {images.map((image, index) => (
            <Col key={index} xs={imageColSize}>
              <PreviewImage
                className='rounded p-1 img-fluid round-circle'
                src={image.src}
                alt={image.src}
                images={images}
                onError={onLoadAttachmentFail}
              />
            </Col>
          ))}
        </Row>
      )}
      {/** TODO: handle error by other way */}
      {files.length > 0 &&
        files.map((file, index) => (
          <div key={index}>
            <a href={file.payload.url}>
              <i className='fas fa-arrow-alt-circle-down' /> {getFilenameFromUrl(file.payload.url)}
            </a>
          </div>
        ))}
      {audios.length > 0 &&
        audios.map((audio, index) => (
          <audio
            key={index}
            className='mw-100 round-circle'
            controls
            src={audio.payload.url}
            onError={onLoadAttachmentFail}
          />
        ))}
      {videos.length > 0 &&
        videos.map((video, index) => (
          <video key={index} className='mw-100 round-circle' onError={onLoadAttachmentFail} controls>
            <source src={video.payload.url} />
          </video>
        ))}
      {gifs.length > 0 &&
        gifs.map((gif, index) => (
          <video key={index} className='mw-100 round-circle' onError={onLoadAttachmentFail} loop autoPlay controls>
            <source src={gif.payload.media.source} />
          </video>
        ))}
      {stickers.length > 0 &&
        stickers.map((sticker, index) => (
          <img key={index} src={sticker.payload.url} width={120} height={120} alt={''} />
        ))}
      {fallbacks.length > 0 &&
        fallbacks.map((fallback, index) => (
          <div key={index}>
            <a href={fallback.url}>{fallback.url}</a>
          </div>
        ))}
    </div>
  );
};

const enhance = compose(
  withState('imageLoadError', 'setImageLoadError', false),
  withExpiredAttachment('updateAttachments', []),
  withHandlers({
    onLoadAttachmentFail: (props) => () => {
      if (props.imageLoadError) return;
      props.setImageLoadError(true);
      props.handleError({
        type: MESSAGE,
        id: props.id,
      })();
    },
  }),
  mapProps(({ imageLoadError, setImageLoadError, handleError, ...rest }) => {
    if (rest.updateAttachments.length > 0) {
      return {
        ...rest,
        attachments: rest.updateAttachments,
      };
    }
    return rest;
  }),
  pure,
);

export default enhance(Attachments);
