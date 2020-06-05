import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import withToggle from './withToggle';
const enhance = compose(
  withToggle('Tooltip'),
  withStateHandlers(
    {
      textCopy: 'Copy to clipboard!',
    },
    {
      setUnCopyText: (state) => () => ({ textCopy: 'Copy to clipboard!' }),
      setCopyText: (state) => () => ({ textCopy: 'Copied!' }),
    },
  ),
  withHandlers({
    copyToClipboard: (props) => (link) => (e) => {
      const textField = document.createElement('textarea');
      textField.innerText = link;
      document.body && document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      props.setCopyText();
      textField.remove();
    },
  }),
);
const withCopyClipboard = (Component) =>
  enhance((props) => {
    const { textCopy, isTooltipShow, showTooltip, hideTooltip, text } = props;
    const copyClip = (e) => {
      e.stopPropagation();
      props.copyToClipboard(text)(e);
    };
    return (
      <Tooltip
        title={textCopy}
        placement='top'
        arrowPointAtCenter
        overlayClassName='tooltip-overlay'
        visible={isTooltipShow}
        mouseLeaveDelay={0}>
        <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onClick={copyClip}>
          <Component text={text} />
        </span>
      </Tooltip>
    );
  });

export default withCopyClipboard;
