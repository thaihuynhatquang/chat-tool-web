import React from 'react';
import Images from './components/Images';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, compose, withState } from 'recompose';
import { withFetcher, withLoading, withInfiniteScroll, withEmpty } from 'shared/hooks';
import * as services from './services';
import * as storeGetter from 'shared/getEntities';

const mapState = (state) => {
  const thread = storeGetter.getSelectedThread(state);

  return {
    threadId: thread && thread.id,
  };
};

const LIMIT_ATTACHMENT = 5;
const CONTAINER_ID = 'imagelist';

const isBottom = (el) => {
  if (!el) return false;
  const { scrollTop, clientHeight, scrollHeight } = el;
  return scrollTop + clientHeight >= scrollHeight - 20;
};

const enhance = compose(
  withState('nextCursor', 'setNextCursor', ''),
  withState('images', 'setImages', []),
  withFetcher(
    'images',
    async (props) => {
      const { threadId } = props;
      const servicesResponse = await services.fetchImages({
        threadId,
        limit: LIMIT_ATTACHMENT,
      });

      props.setImages(servicesResponse.data);
      servicesResponse.nextCursor && props.setNextCursor(servicesResponse.nextCursor);

      return servicesResponse;
    },
    {
      fetchOnMount: true,
      fetchOnPropsChange: ['threadId'],
    },
  ),
  withLoading((props) => props.imagesFetcher.isLoading, {
    size: 2,
  }),
  withEmpty((props) => props.images.length === 0),
  withInfiniteScroll(
    CONTAINER_ID,
    (props) => {
      const wrappedElement = document.getElementById(CONTAINER_ID);
      return isBottom(wrappedElement);
    },
    (props) => !!props.nextCursor,
    async (props) => {
      const input = {
        threadId: props.threadId,
        nextCursor: props.nextCursor,
        limit: LIMIT_ATTACHMENT,
      };

      return services.fetchImages(input);
    },
    (props) => (res) => {
      // NOTE: loadmore DONE
      props.setImages([...props.images, ...res.data]);
      props.setNextCursor(res.nextCursor);
    },
    (props) => (error) => {
      // NOTE: loadmore DONE
      throw new Error(error);
    },
  ),
  mapProps((props) => ({
    images: props.images,
  })),
);

const enhanceLayout = compose(
  connect(mapState),
  branch((props) => !props.threadId, renderNothing),
);

const Layout = ({ threadId }) => {
  const Component = enhance(Images);
  return (
    <div className='border-top mt-2'>
      <div className='d-flex justify-content-between mt-2'>
        <small>Hình ảnh</small>
      </div>
      <div id={CONTAINER_ID} style={{ height: 300, overflowY: 'auto', overflowX: 'hidden' }}>
        <Component threadId={threadId} />
      </div>
    </div>
  );
};

export default enhanceLayout(Layout);
