import React from 'react';
import Button from 'react-bootstrap/Button';
import { PencilSvg, Trash } from 'components/Icons';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';

export const DetailHeader = ({ record, status, history, handleModal }) => {
  const user = useSelector(userSelector);
  const isOwner = user?.email === record?.creatorDetail?.email;
  const roles = [USER_ROLES.CONTENT_CREATOR, USER_ROLES.CONTENT_EDITOR];

  switch (status) {
    case 'draft':
      return (
        <div>
          <ComponentAccessibility roles={roles} flag={!isOwner}>
            <Button
              key="delete"
              variant="light"
              className="mr-16 br-4 bg-gray border-0"
              onClick={() => handleModal('delete')}>
              <Trash />
            </Button>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push(`/cms/forum-sdi/manage-forum-sdi/${record.id}`)}>
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
    case 'waiting_approval':
      return (
        <div>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button
              key="tolak"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40"
              onClick={() => handleModal('tolak')}>
              Tolak
            </Button>
            <Button
              key="Setujui"
              variant="info"
              className="mr-16 br-4 px-40 border-0"
              onClick={() => handleModal('setujui')}>
              Setujui
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 'rejected':
      return (
        <div>
          <ComponentAccessibility roles={roles}>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push(`/cms/manage-komunitas-ahli/${record.id}`)}>
              <PencilSvg />
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 'approved':
      return (
        <div>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button
              key="publish"
              variant="info"
              className="mr-16 br-4 px-40 border-0"
              onClick={() => handleModal('publish')}>
              Publish
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 'published':
      return (
        <div>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button
              key="unPublish"
              variant="info"
              className="mr-16 br-4 px-40 border-0"
              onClick={() => handleModal('unPublish')}>
              Unpublish
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 'unpublished':
      return (
        <div>
          <ComponentAccessibility roles={roles} flag={isOwner}>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push(`/cms/forum-sdi/manage-forum-sdi/${record.id}`)}>
              <PencilSvg />
            </Button>
          </ComponentAccessibility>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button
              key="publish"
              variant="info"
              className="mr-16 br-4 px-40 border-0"
              onClick={() => handleModal('publish')}>
              Publish
            </Button>
          </ComponentAccessibility>
        </div>
      );
    default:
      return null;
  }
};
