import React from 'react';
import Button from 'react-bootstrap/Button';

export const DetailHeader = ({ record, status, history, handleModal }) => {
  switch (status) {
    case 'waiting_request_approval':
      return (
        <div>
          <Button className="ml-10 px-35" variant="secondary" onClick={() => handleModal('tolak')}>
            Tolak
          </Button>
          <Button className="ml-10 px-35" variant="info" onClick={() => handleModal('proses')}>
            Setujui
          </Button>
        </div>
      );
    case 'approved':
      return (
        <div>
          <Button className="ml-10 px-35" variant="info" onClick={() => handleModal('publish')}>
            Publish
          </Button>
        </div>
      );
    case 'waiting_approval':
      return (
        <Button className="ml-10 px-35" variant="info" onClick={() => handleModal('setujui')}>
          Kirim
        </Button>
      );
    case 'published':
      return (
        <Button className="ml-10 px-35" variant="info" onClick={() => handleModal('unpublish')}>
          Unpublish
        </Button>
      );
    default:
      return null;
  }
};
