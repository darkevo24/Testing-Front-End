import React from 'react';
import Button from 'react-bootstrap/Button';

export const DetailHeader = ({ record, status, history, handleModal }) => {
  switch (status) {
    case 'terkirim':
      return (
        <div>
          <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={() => handleModal('tolak')}>
            Tolak
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => handleModal('proses')}>
            Proses
          </Button>
        </div>
      );
    case 'diproses':
      return (
        <div>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => handleModal('selesai')}>
            Selesai
          </Button>
        </div>
      );
    default:
      return null;
  }
};
