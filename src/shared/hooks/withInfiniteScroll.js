import React, { Fragment } from 'react';

import Spinner from 'shared/components/Spinner';

const withInfiniteScroll = (containerId, conditionFn, hasMoreFn, callFn, thenFn, errorFn) => (Component) =>
  class WithInfiniteScroll extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
      };
    }

    componentDidMount() {
      const element = document.getElementById(containerId);
      element && element.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
      const element = document.getElementById(containerId);
      element && element.removeEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
      const { isLoading } = this.state;

      if (isLoading || !hasMoreFn(this.props)) return;

      if (conditionFn(this.props)) {
        this.setState({ isLoading: true }, () => {
          callFn(this.props)
            .then(thenFn(this.props), errorFn(this.props))
            .then(() => this.setState({ isLoading: false }));
        });
      }
    };

    render() {
      return (
        <Fragment>
          <Component {...this.props} />
          {hasMoreFn(this.props) && <Spinner size={2} />}
        </Fragment>
      );
    }
  };

export default withInfiniteScroll;
