import { connect } from 'react-redux';
import { branch, compose, mapProps, renderNothing, withHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import { withEmpty, withFetcher, withLoading } from 'shared/hooks';
import * as actions from './actions';
import Customer from './components/Customer';
import * as services from './services';

const mapState = (state) => {
  const { totalCustomersCount } = state;
  const thread = storeGetter.getSelectedThread(state);
  const customer = storeGetter.getCustomer(state);
  return {
    threadId: thread && thread.id,
    customer,
    totalCount: totalCustomersCount,
  };
};

const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.threadId, renderNothing),
  withFetcher(
    'customers',
    async (props) => {
      const { threadId, fetchCustomersSucceed } = props;
      const servicesResponse = await services.fetchCustomersByThreadId({
        threadId,
      });

      fetchCustomersSucceed(servicesResponse);
      return servicesResponse;
    },
    {
      fetchOnMount: true,
      fetchOnPropsChange: ['threadId'],
    },
  ),
  withLoading((props) => props.customersFetcher.isLoading, {
    size: 2,
  }),
  withEmpty((props) => !props.customer),
  withHandlers({
    searchCustomers: (props) => async (searchValue, callback) => {
      const { threadId } = props;
      const {
        norm: {
          result,
          entities: { customers },
        },
      } = await services.fetchCustomersByThreadId({
        threadId,
        name: searchValue,
      });
      callback(result.map((customerId) => customers[customerId]));
    },
    selectCustomer: (props) => (selectOption) => {
      props.selectCustomer(selectOption);
    },
  }),
  mapProps(({ threadId, fetchCustomersSucceed, customersFetcher, ...rest }) => rest),
);

export default enhance(Customer);
