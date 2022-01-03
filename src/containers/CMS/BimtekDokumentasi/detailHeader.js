import React from 'react';
import Button from 'react-bootstrap/Button';
import { PencilSvg, Trash } from 'components/Icons';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';

export const DetailHeader = ({ record, status, history, handleModal }) => {
  switch (status) {
    case 'draft':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR, USER_ROLES.CONTENT_CREATOR]}>
          <Button variant="secondary" onClick={() => handleModal('delete')}>
            <Trash />
          </Button>
          <Button className="ml-10" variant="secondary" onClick={() => handleModal('perbarui')}>
            <PencilSvg />
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => handleModal('kirim')}>
            Kirim
          </Button>
        </ComponentAccessibility>
      );
    case 'waiting_approval':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={() => handleModal('tolak')}>
            Tolak
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => handleModal('setujui')}>
            Setujui
          </Button>
        </ComponentAccessibility>
      );
    case 'approved':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => handleModal('publish')}>
            Publish
          </Button>
        </ComponentAccessibility>
      );
    case 'published':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => handleModal('unpublish')}>
            Unpublish
          </Button>
        </ComponentAccessibility>
      );
    case 'unpublished':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => handleModal('publish')}>
            Publish
          </Button>
        </ComponentAccessibility>
      );
    default:
      return null;
  }
};
