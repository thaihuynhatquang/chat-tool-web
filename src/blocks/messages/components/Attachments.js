import React from 'react';
import { pure } from 'recompose';
import { Row, Col } from 'reactstrap';
import { formatMessage, getFilenameFromUrl } from '../utils';
import PreviewImage from 'shared/components/PreviewImage';

const Attachments = (props) => {
  const { attachments } = props;
  const images = attachments
    .filter((att) => att.type === 'image')
    .map((image) => ({
      src: image.payload.url,
    }));
  const files = attachments.filter((att) => att.type === 'file');
  const videos = attachments.filter((att) => att.type === 'video');
  const audios = attachments.filter((att) => att.type === 'audio');
  const fallbacks = attachments.filter((att) => att.type === 'fallback');

  const imageColSize = images.length === 1 ? 12 : images.length <= 4 ? 6 : 4;

  return (
    <div>
      {images.length > 0 && (
        <Row noGutters>
          {images.map((image, index) => (
            <Col key={index} xs={imageColSize}>
              <PreviewImage
                className='rounded p-1 img-fluid round-circle'
                src={image.src}
                alt={image.src}
                images={images}
              />
            </Col>
          ))}
        </Row>
      )}
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
          <a key={index} className='d-block' href={audio.payload.url}>
            <i className='fas fa-music' /> {getFilenameFromUrl(audio.payload.url)}
          </a>
        ))}
      {videos.length > 0 &&
        videos.map((video, index) => (
          <video key={index} className='mw-100 round-circle' controls>
            <source src={video.payload.url} />
          </video>
        ))}
      {/* TODO: Show fallback message using block metadata */}
      {fallbacks.length > 0 &&
        fallbacks.map(({ url, title, payload }, index) => <div key={index}>{formatMessage(url || title)}</div>)}
    </div>
  );
};

export default pure(Attachments);
