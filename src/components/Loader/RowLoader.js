import React from 'react';
import ContentLoader from 'react-content-loader';

const RowLoader = (props) => {
  return (
    <ContentLoader width={'100%'} height={116} {...props}>
      <rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
      <rect x="28" y="29" rx="0" ry="0" width="150" height="20" />
      <rect x="28" y="71" rx="0" ry="0" width="800" height="40" />
      <rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
    </ContentLoader>
  );
};

export default RowLoader;
