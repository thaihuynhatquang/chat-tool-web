import React from 'react';
import { compose, lifecycle, mapProps, withProps, withHandlers } from 'recompose';

// You should only use this to component which mount / unmount overtime in document
// If not, the event listener will always stick as long as the component mounting into DOM
const withHiddenBlur = (hideDomFunction) =>
  compose(
    withProps({ blurRef: React.createRef() }),
    withHandlers({
      handleClickOutside: (props) => (e) => {
        if (props.blurRef && props.blurRef.current && !props.blurRef.current.contains(e.target)) {
          props[hideDomFunction] && props[hideDomFunction]();
        }
      },
    }),
    lifecycle({
      componentDidMount() {
        document.addEventListener('mousedown', this.props.handleClickOutside);
      },
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.props.handleClickOutside);
      },
    }),
    mapProps(({ handleClickOutside, ...rest }) => rest),
  );
export default withHiddenBlur;
