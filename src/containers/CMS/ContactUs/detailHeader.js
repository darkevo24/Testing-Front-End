import Button from 'react-bootstrap/Button';
import { PencilSvg, Trash } from 'components/Icons';

const CMSContactHeader = ({ data, handleClick }) => {
  switch (data.status) {
    case 'DRAFT':
      return (
        <div>
          <Button key="delete" variant="light" className="mr-16 br-4 bg-gray border-0" onClick={() => handleClick('delete')}>
            <Trash />
          </Button>
          <Button
            key="edit"
            variant="outline-light"
            className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
            onClick={() => handleClick('edit')}>
            <PencilSvg />
          </Button>
          <Button key="kirim" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleClick('kirim')}>
            Kirim
          </Button>
        </div>
      );
    case 'MENUNGGU_PERSETUJUAN':
      return (
        <div>
          <Button
            key="tolak"
            variant="outline-light"
            className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40"
            onClick={() => handleClick('tolak')}>
            Tolak
          </Button>
          <Button key="kirim" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleClick('setujui')}>
            Setujui
          </Button>
        </div>
      );
    case 'DITOLAK':
      return (
        <div>
          <Button
            key="edit"
            variant="outline-light"
            className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
            onClick={() => handleClick('edit')}>
            <PencilSvg />
          </Button>
        </div>
      );
    case 'DITAYANGKAN':
      return (
        <div>
          <Button
            key="unPublish"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleClick('unpublish')}>
            Unpublish
          </Button>
        </div>
      );
    case 'DISETUJUI':
      return (
        <div>
          <Button
            key="unPublish"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleClick('publish')}>
            Publish
          </Button>
        </div>
      );
    case 'TIDAK_DITAYANGKAN':
      return (
        <div>
          <Button
            key="edit"
            variant="outline-light"
            className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
            onClick={() => handleClick('edit')}>
            <PencilSvg />
          </Button>
          <Button
            key="unPublish"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleClick('publish')}>
            Publish
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export default CMSContactHeader;
