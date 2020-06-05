import React from 'react';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import * as storeGetter from 'shared/getEntities';
import { THREAD_STATUS_PROCESSING } from 'shared/constants';
import { SOCKET_UPDATE_THREAD } from 'socket/actions';

export const notifyAssignThreads = (store) => (next) => (action) => {
  if (action.type !== SOCKET_UPDATE_THREAD) return next(action);
  const { result, entities } = action.norm;
  const addThread = entities.threads && entities.threads[result];
  if (!addThread) return next(action);
  const stoteState = store.getState();
  const { userId: currentUserId } = stoteState;
  const channel = storeGetter.getChannelById(stoteState, addThread.channelId);
  if (!channel) return next(action);
  if (
    addThread.status === THREAD_STATUS_PROCESSING &&
    addThread.updatedFields.includes('status') &&
    addThread.usersServing.map((user) => user.id).includes(currentUserId)
  ) {
    toast.info(
      <div>
        <small>
          Phòng <b>{addThread.title}</b> của kênh <b>{channel.title}</b> đã được phân cho bạn
        </small>
      </div>,
    );
  }
  return next(action);
};

export const keepCustomersNoteAndTagInfo = (store) => (next) => (action) => {
  const newAction = _keepAttrbuteBeforeUpdateStore(store, action, 'customers', ['notes', 'tags']);
  return next(newAction);
};

export const keepThreadsServingThread = (store) => (next) => (action) => {
  const newAction = _keepAttrbuteBeforeUpdateStore(store, action, 'threads', []);

  return next(newAction);
};

export const keepUsersRolesInfo = (store) => (next) => (action) => {
  const newAction = _keepAttrbuteBeforeUpdateStore(store, action, 'users', ['roles']);

  return next(newAction);
};

const _keepAttrbuteBeforeUpdateStore = (store, action, attrRedux, attrKeeps) => {
  const { norm } = action;
  if (!norm) return action;
  const { entities } = norm;
  if (!entities[attrRedux]) return action;
  const {
    entities: { [attrRedux]: storeAttr },
  } = store.getState();

  const mergeAttr = Object.keys(entities[attrRedux]).reduce((acc, key) => {
    const entityAttr = entities[attrRedux][key];
    const entityStore = storeAttr[key];

    if (isEmpty(entityStore)) {
      return { ...acc, [key]: entityAttr };
    }

    const newEntity = {
      ...acc,
      [key]: {
        ...entityAttr,
        ...attrKeeps.reduce((acc, attrKeep) => {
          if (entityAttr.hasOwnProperty(attrKeep) && !isEmpty(entityAttr[attrKeep])) {
            return {
              ...acc,
              [attrKeep]: entityAttr[attrKeep],
            };
          }

          if (
            (entityStore.hasOwnProperty(attrKeep) && !entityAttr.hasOwnProperty(attrKeep)) ||
            isEmpty(entityAttr[attrKeep])
          ) {
            return {
              ...acc,
              [attrKeep]: entityStore[attrKeep],
            };
          }

          return acc;
        }, {}),
      },
    };

    return newEntity;
  }, {});
  return {
    ...action,
    norm: {
      ...action.norm,
      entities: {
        ...action.norm.entities,
        [attrRedux]: mergeAttr,
      },
    },
  };
};
