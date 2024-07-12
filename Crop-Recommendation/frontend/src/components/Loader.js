import React from 'react';

const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className="p-12 mx-auto my-32 shadow-lg text-2xl">Fetching Temperature and Humidity</div>
    </div>
  );
};

export default Loader;
