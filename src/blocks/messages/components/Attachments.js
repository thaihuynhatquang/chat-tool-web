import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { getFilenameFromUrl } from '../utils';

class Attachments extends Component {
  render() {
    const { attachments } = this.props;
    const images = attachments.filter((att) => att.type === 'image');
    const files = attachments.filter((att) => att.type === 'file');
    const videos = attachments.filter((att) => att.type === 'video');
    const audios = attachments.filter((att) => att.type === 'audio');

    const imageColSize = images.length === 1 ? 12 : images.length <= 4 ? 6 : 4;

    return (
      <div>
        {images.length > 0 && (
          <Row noGutters>
            {images.map((image, index) => (
              <Col key={index} xs={imageColSize}>
                <img className='rounded p-1 img-fluid round-circle' src={image.payload.url} alt='payload' />
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
      </div>
    );
  }
}

export default Attachments;
