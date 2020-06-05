import { branch, compose, mapProps, renderComponent, renderNothing } from 'recompose';
import PreviewAttachmentFile from './PreviewAttachmentFile';
import PreviewAttachmentImage from './PreviewAttachmentImage';

const enhance = compose(
  mapProps((props) => {
    const { attachment, removeAttachment } = props;
    return {
      removeAttachment,
      name: attachment.name,
      extension: attachment.type,
      url: URL.createObjectURL(attachment),
    };
  }),
  branch(
    (props) => props.extension.includes('image'),
    renderComponent(PreviewAttachmentImage),
    renderComponent(PreviewAttachmentFile),
  ),
);

export default enhance(renderNothing);
