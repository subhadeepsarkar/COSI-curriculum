import React from 'react';

const Box = ({ children, className }) => {
  return (
    <div className={`bg-pink-500 text-white p-4 m-2 rounded ${className}`}>
      {children}
    </div>
  );
};

export default Box;
