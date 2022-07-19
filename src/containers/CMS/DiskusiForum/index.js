import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import { bpmUrl } from 'utils/constants';

const DiskusiForum = () => {
  const history = useHistory();
  const handleCreate = (e) => {
    e.preventDefault();
    history.push('/cms/forum-diskusi');
  };

  const user = useSelector(userSelector);
  const src = bpmUrl.concat('ForumDiskusiCMS?userEmail=' + user?.email);
  return (
    <div className="py-40">
      <div className="pt-0">
        <iframe frameBorder="0" width="100%" height="700px" seamless title="Diskusi Forum" src={src}></iframe>
      </div>
    </div>
  );
};

export default DiskusiForum;
