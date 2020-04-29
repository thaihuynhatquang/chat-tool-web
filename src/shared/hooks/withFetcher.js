// @flow
import { compose, withHandlers, withStateHandlers, mapProps, lifecycle } from 'recompose';
import { upperFirst } from 'shared/utils';

const withFetcher = (name, fetchAPI, { fetchOnMount = false, fetchOnPropsChange = [] } = {}) => {
  const Name = upperFirst(name);
  return compose(
    withStateHandlers(
      {
        [`${name}Fetcher`]: {
          data: null,
          isLoading: false,
          error: null,
        },
      },
      {
        [`start${Name}Fetch`]: ({ [`${name}Fetcher`]: prevState }) => () => ({
          [`${name}Fetcher`]: {
            ...prevState,
            isLoading: true,
          },
        }),
        [`receive${Name}Data`]: () => (data) => ({
          [`${name}Fetcher`]: {
            data,
            isLoading: false,
            error: null,
          },
        }),
        [`receive${Name}Error`]: ({ [`${name}Fetcher`]: { data } }) => (error) => {
          // TODO: Using Notification to show the error
          console.error(error);
          return {
            [`${name}Fetcher`]: {
              data,
              isLoading: false,
              error: error || true,
            },
          };
        },
      },
    ),
    withHandlers({
      [`fetch${Name}`]: (props) => () => {
        props[`start${Name}Fetch`]();
        fetchAPI(props).then(props[`receive${Name}Data`], props[`receive${Name}Error`]);
      },
    }),
    mapProps((props) => {
      const {
        [`start${Name}Fetch`]: startFetch,
        [`receive${Name}Data`]: receiveData,
        [`receive${Name}Error`]: receiveError,
        ...rest
      } = props;
      return rest;
    }),
    fetchOnMount
      ? lifecycle({
          componentDidMount() {
            this.props[`fetch${Name}`]();
          },
        })
      : (Component) => Component,
    fetchOnPropsChange.length > 0
      ? lifecycle({
          componentDidUpdate(prevProps) {
            const shouldFetch = fetchOnPropsChange.reduce((acc, key) => {
              if (typeof key !== 'string') return acc;
              if (prevProps[key] !== this.props[key]) return true;
              return acc;
            }, false);
            if (shouldFetch) this.props[`fetch${Name}`]();
          },
        })
      : (Component) => Component,
  );
};

export default withFetcher;
