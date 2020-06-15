import { client } from 'configs/axios';
import { compose, withHandlers, withState } from 'recompose';
import { upperFirst } from 'shared/utils';

const refreshAttachment = ({ type, id }) => client.get(`/api/v1/${type}s/${id}/recover`).then((res) => res.data);

const withExpired = (nameState, initState) =>
  compose(
    withState(nameState, `set${upperFirst(nameState)}`, initState),
    withHandlers({
      handleError: (props) => (input) => async () => {
        const { dataUpdated } = await refreshAttachment(input);
        props[`set${upperFirst(nameState)}`](dataUpdated);
      },
    }),
  );

export default withExpired;
