import ContentLoader from 'react-content-loader';
import { commonColorProps } from './commonProps';

const PROPS = {
  speed: 2,
  width: '100%',
  height: 550,
};

const SideBarLoader = () => {
  return (
    <ContentLoader {...PROPS} {...commonColorProps}>
      <rect x="10" y="5" rx="4" ry="4" width="200" height="40" />
      <rect x="10" y="60" rx="0" ry="0" width="200" height="30" />
      <rect x="10" y="100" rx="0" ry="0" width="200" height="30" />
      <rect x="10" y="140" rx="0" ry="0" width="200" height="30" />
      <rect x="10" y="180" rx="0" ry="0" width="200" height="30" />
      <rect x="10" y="220" rx="0" ry="0" width="200" height="30" />
    </ContentLoader>
  );
};

export default SideBarLoader;
