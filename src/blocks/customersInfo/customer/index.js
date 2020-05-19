import Customer from './components/Customer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, withHandlers, compose } from 'recompose';
import { withFetcher, withLoading } from 'shared/hooks';
import * as actions from './actions';
import * as services from './services';
import * as storeGetter from 'shared/getEntities';

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
  withLoading((props) => props.customersFetcher.isLoading || !props.customer, {
    size: 2,
  }),
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
