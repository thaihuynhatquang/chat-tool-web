import { lifecycle, mapProps, withHandlers, withStateHandlers, compose } from 'recompose';

const emptyFunction = () => {};
const defaultLoader = {
  offset: 0,
  shouldShow: false,
  size: 1,
};

const withScroll = ({
  refPropName,
  onScrollTop = emptyFunction,
  onScrollBottom = emptyFunction,
  topLoaderOps = defaultLoader,
  bottomLoaderOps = defaultLoader,
}) =>
  compose(
    withStateHandlers(
      { isCallingTop: false },
      {
        setCallingTop: () => (value) => ({ isCallingTop: value }),
      },
    ),
    withStateHandlers(
      { isCallingBottom: false },
      {
        setCallingBottom: () => (value) => ({ isCallingBottom: value }),
      },
    ),
    withHandlers({
      onScroll: (props) => async () => {
        const { isCallingTop, isCallingBottom, setCallingTop, setCallingBottom, ...restProps } = props;
        const ref = props[refPropName];
        const node = ref && ref.current;
        if (!node) return;
        const prevScrollHeight = node.scrollHeight;

        if (node.scrollTop <= topLoaderOps.offset && onScrollTop && !isCallingTop) {
          setCallingTop(true);
          await onScrollTop(restProps);
          node.scrollTop = node.scrollHeight - prevScrollHeight;
          setCallingTop(false);
        } else if (
          node.scrollTop + node.clientHeight + bottomLoaderOps.offset >= node.scrollHeight &&
          onScrollBottom &&
          !isCallingBottom
        ) {
          setCallingBottom(true);
          await onScrollBottom(restProps);
          node.scrollTop = prevScrollHeight - node.clientHeight;
          setCallingBottom(false);
        }
      },
    }),
    lifecycle({
      componentDidMount() {
        const ref = this.props[refPropName];
        const node = ref && ref.current;
        node && node.addEventListener('scroll', this.props.onScroll);
      },
      componentWillUnmount() {
        const ref = this.props[refPropName];
        const node = ref && ref.current;
        node && node.removeEventListener('scroll', this.props.onScroll);
      },
    }),
    mapProps(({ isCallingTop, isCallingBottom, setCallingTop, setCallingBottom, onScroll, ...rest }) => rest),
  );

export default withScroll;
