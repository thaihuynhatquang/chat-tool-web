import { branch, compose, renderComponent, renderNothing, mapProps } from 'recompose';
import PreviewAttachmentImage from './PreviewAttachmentImage';
import PreviewAttachmentFile from './PreviewAttachmentFile';

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
