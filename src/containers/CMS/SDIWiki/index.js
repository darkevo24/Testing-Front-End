import { userSelector } from 'containers/Login/reducer';
import { useSelector } from 'react-redux';
import { bpmUrl } from 'utils/constants';

const SDIWiki = () => {
  const user = useSelector(userSelector);
  const src = bpmUrl.concat('WikiCMS?userEmail=' + user?.email);
  return (
    <div className="py-40">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="SDI Wiki" src={src}></iframe>
      </div>
    </div>
  );
};

export default SDIWiki;
