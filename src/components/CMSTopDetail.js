import Button from 'react-bootstrap/Button';
import { LeftChevron } from 'components/Icons';
import { getStatusClass } from 'utils/helper';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';

const CMSTopDetail = ({ status }) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const divClass = getStatusClass(status);

  return (
    <div className="d-flex mb-3">
      <Button variant="light" className="bg-white border-gray-stroke" onClick={goBack}>
        <LeftChevron variant="gray" />
      </Button>
      <div className={cx('br-2 p-12 flex-grow-1 flex-center', divClass?.divBG)}>
        <span className={cx('fs-14 lh-17', divClass?.textColor)}>{divClass?.text || status}</span>
      </div>
    </div>
  );
};

export default CMSTopDetail;
