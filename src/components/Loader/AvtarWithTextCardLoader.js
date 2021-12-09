import React from 'react';
import ContentLoader from 'react-content-loader';

const AvtarWithTextCardLoader = () => {
  return (
    <ContentLoader viewBox="0 0 600 130" height={200} width={1000}>
      <rect x="130" y="5" rx="4" ry="4" width="254" height="20" />
      <rect x="130" y="30" rx="3" ry="3" width="450" height="40" />
      <rect x="130" y="80" rx="8" ry="8" width="40" height="38" />
      <rect x="180" y="80" rx="8" ry="8" width="40" height="38" />
      <rect x="230" y="80" rx="8" ry="8" width="40" height="38" />
      <rect x="280" y="80" rx="8" ry="8" width="40" height="38" />
      <circle cx="60" cy="60" r="60" />
    </ContentLoader>
  );
};

export default AvtarWithTextCardLoader;
