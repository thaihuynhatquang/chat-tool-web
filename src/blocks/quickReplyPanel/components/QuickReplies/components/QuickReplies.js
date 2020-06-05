import React from 'react';

const listGroupClass =
  'd-flex list-group-item list-group-item-action cursor-pointer select-none py-2 align-items-center justify-content-between';
const QuickReply = (props) => {
  const { quickReplies, deleteQuickReply, onClickItem } = props;

  const deleteAction = (id) => (e) => {
    e.stopPropagation();
    deleteQuickReply(id)(e);
  };
  return (
    <div
      style={{
        height: 600,
        overflowX: 'hidden',
        overflowY: 'auto',
      }}>
      {quickReplies && quickReplies.length > 0 && (
        <ul className='p-0 m-0'>
          {quickReplies.map((quickReply) => (
            <li className={listGroupClass} key={quickReply.id} onClick={onClickItem(quickReply)}>
              <small>{quickReply.content}</small>
              <i className='fas fa-trash text-danger' onClick={deleteAction(quickReply.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuickReply;
