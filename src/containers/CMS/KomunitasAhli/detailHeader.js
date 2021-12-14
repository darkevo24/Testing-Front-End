import React from 'react';
import Button from 'react-bootstrap/Button';
import { PencilSvg, Trash } from 'components/Icons';

export const DetailHeader = ({ record, status, history, handleModal }) => {
  switch (status) {
    case 'draft':
      return (
        <>
          <Button key="delete" variant="light" className="mr-16 br-4 bg-gray border-0" onClick={() => handleModal('delete')}>
            <Trash />
          </Button>
          <Button
            key="edit"
            variant="outline-light"
            className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
            onClick={() => history.push(`/cms/manage-komunitas-ahli/${record.id}`)}>
            <PencilSvg />
          </Button>
          <Button key="kirim" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleModal('kirim')}>
            Kirim
          </Button>
        </>
      );
    case 'menunggu_persetujuan':
      return (
        <>
          <Button
            key="tolak"
            variant="outline-light"
            className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40"
            onClick={() => handleModal('tolak')}>
            Tolak
          </Button>
          <Button key="Setujui" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleModal('setujui')}>
            Setujui
          </Button>
        </>
      );
    case 'disetujui':
      return (
        <>
          <Button key="publish" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleModal('publish')}>
            Publish
          </Button>
        </>
      );
    case 'ditayangkan':
      return (
        <>
          <Button
            key="unPublish"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleModal('unPublish')}>
            Unpublish
          </Button>
        </>
      );
    case 'tidak_ditayangkan':
      return (
        <>
          <Button
            key="archieve"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleModal('archieve')}>
            Archieve
          </Button>
        </>
      );
    default:
      return null;
  }
};
