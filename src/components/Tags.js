import React from 'react';

export const Tags = ({ text, colorClass }) => {
  return <div className={`bg-gray br-28 py-6 px-10 ml-10 ${colorClass}`}>{text}</div>;
};
