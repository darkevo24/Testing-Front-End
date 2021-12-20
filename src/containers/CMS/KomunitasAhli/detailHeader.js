import React from 'react';
import Button from 'react-bootstrap/Button';
import { PencilSvg, Trash } from 'components/Icons';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';

export const DetailHeader = ({ record, status, history, handleModal }) => {
  const roles = [USER_ROLES.CONTENT_CREATOR, USER_ROLES.CONTENT_EDITOR];
  switch (status) {
    case 'draft':
      return (
        <div>
          <ComponentAccessibility roles={roles}>
            <Button
              key="delete"
              variant="light"
              className="mr-16 br-4 bg-gray border-0"
              onClick={() => handleModal('delete')}>
              <Trash />
            </Button>
          </ComponentAccessibility>
          <ComponentAccessibility roles={roles}>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push(`/cms/manage-komunitas-ahli/${record.id}`)}>
              <PencilSvg />
            </Button>
          </ComponentAccessibility>
          <ComponentAccessibility roles={roles}>
            <Button key="kirim" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleModal('kirim')}>
              Kirim
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 'menunggu_persetujuan':
      return (
        <div>
          <Button
            key="tolak"
            variant="outline-light"
            className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40"
            onClick={() => handleModal('tolak')}
            roles={[USER_ROLES.CONTENT_EDITOR]}>
            Tolak
          </Button>
          <Button
            key="Setujui"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleModal('setujui')}
            roles={[USER_ROLES.CONTENT_EDITOR]}>
            Setujui
          </Button>
        </div>
      );
    case 'disetujui':
      return (
        <div>
          <Button
            key="publish"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleModal('publish')}
            roles={[USER_ROLES.CONTENT_EDITOR]}>
            Publish
          </Button>
        </div>
      );
    case 'ditayangkan':
      return (
        <div>
          <Button
            key="unPublish"
            variant="info"
            className="mr-16 br-4 px-40 border-0"
            onClick={() => handleModal('unPublish')}
            roles={[USER_ROLES.CONTENT_EDITOR]}>
            Unpublish
          </Button>
        </div>
      );
    case 'tidak_ditayangkan':
      return (
        <div>
          <Button key="archieve" variant="info" className="mr-16 br-4 px-40 border-0" roles={[USER_ROLES.CONTENT_EDITOR]}>
            onClick={() => handleModal('archieve')}> Archieve
          </Button>
        </div>
      );
    default:
      return null;
  }
};
