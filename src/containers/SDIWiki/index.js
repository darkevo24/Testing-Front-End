import { userSelector } from 'containers/Login/reducer';
import { useSelector } from 'react-redux';
import { bpmUrl } from 'utils/constants';

const SDIWiki = () => {
  const user = useSelector(userSelector);
  const src = bpmUrl.concat('Wiki?userEmail=' + user?.email);
  return (
    <div>
      <iframe frameBorder="0" width="100%" height="700px" seamless title="Wiki" src={src}></iframe>
    </div>
  );
};

export default SDIWiki;
