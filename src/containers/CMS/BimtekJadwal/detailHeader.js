import React from 'react';
import Button from 'react-bootstrap/Button';
import { PencilSvg, Trash } from 'components/Icons';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';

export const DetailHeader = ({ record, status, history, handleModal, buttonUpdate, handleUpdate }) => {
  switch (status) {
    case 'draft':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR, USER_ROLES.CONTENT_CREATOR]}>
          <div>
            <Button
              key="delete"
              variant="light"
              className="mr-16 br-4 bg-gray border-0"
              onClick={() => handleModal('delete')}>
              <Trash />
            </Button>
            {buttonUpdate ? (
              <Button
                key="edit"
                variant="outline-light"
                className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                onClick={() => handleModal('updateBimtek')}>
                Perbarui
              </Button>
            ) : (
              <Button
                key="edit"
                variant="outline-light"
                className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                onClick={handleUpdate}>
                <PencilSvg />
              </Button>
            )}
            <Button key="kirim" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleModal('kirim')}>
              Kirim
            </Button>
          </div>
        </ComponentAccessibility>
      );
    case 'waiting_approval':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <div>
            {buttonUpdate ? (
              <Button
                key="edit"
                variant="outline-light"
                className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                onClick={() => handleModal('updateBimtek')}>
                Perbarui
              </Button>
            ) : (
              <Button
                key="edit"
                variant="outline-light"
                className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                onClick={handleUpdate}>
                <PencilSvg />
              </Button>
            )}
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
          </div>
        </ComponentAccessibility>
      );
    case 'approved':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <div>
            <Button
              key="publish"
              variant="info"
              className="mr-16 br-4 px-40 border-0"
              onClick={() => handleModal('publish')}>
              Publish
            </Button>
          </div>
        </ComponentAccessibility>
      );
    case 'published':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <div>
            <Button
              key="unPublish"
              variant="info"
              className="mr-16 br-4 px-40 border-0"
              onClick={() => handleModal('unPublish')}>
              Unpublish
            </Button>
          </div>
        </ComponentAccessibility>
      );
    case 'unpublished':
      return (
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
          <div>
            {buttonUpdate ? (
              <Button
                key="edit"
                variant="outline-light"
                className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                onClick={() => handleModal('updateBimtek')}>
                Perbarui
              </Button>
            ) : (
              <Button
                key="edit"
                variant="outline-light"
                className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                onClick={handleUpdate}>
                <PencilSvg />
              </Button>
            )}
            <Button
              key="publish"
              variant="info"
              className="mr-16 br-4 px-40 border-0"
              onClick={() => handleModal('publish')}>
              Publish
            </Button>
          </div>
        </ComponentAccessibility>
      );
    default:
      return null;
  }
};
