import React from 'react';
import Customer from './customer';
import Images from './images';
import Notes from './notes';
import Tags from './tags';

const CustomersInfo = (props) => {
  return (
    <div className='px-2 pt-1 border-top'>
      <Customer />
      <Tags />
      <Notes />
      <Images />
    </div>
  );
};

export default CustomersInfo;
