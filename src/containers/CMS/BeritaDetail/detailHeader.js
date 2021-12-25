import React from 'react';
import Button from 'react-bootstrap/Button';
import { PencilSvg, Trash, EyeSvg } from 'components/Icons';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';

// DRAFT(0), SAVE(1), WAITING_APPROVAL(2), APPROVED(3), REJECTED(4), PUBLISHED(5), UNPUBLISHED(6), DELETED(7), ARCHIVED(8);

export const DetailHeader = ({ record, history, handleClick }) => {
  const roles = [USER_ROLES.CONTENT_CREATOR, USER_ROLES.CONTENT_EDITOR];
  switch (record.status) {
    case 0:
      return (
        <div>
          <ComponentAccessibility roles={roles}>
            <Button variant="light" className="mr-16 br-4 bg-gray border-0" onClick={() => handleClick(7)}>
              <Trash />
            </Button>
            <Button
              onClick={() => handleClick(9)}
              variant="light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke">
              <EyeSvg />
            </Button>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push('/cms/berita-form')}>
              <PencilSvg />
            </Button>
            <Button key="kirim" variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleClick(2)}>
              Kirim
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 4:
      return (
        <div>
          <ComponentAccessibility roles={roles}>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push('/cms/berita-form')}>
              <PencilSvg />
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 2:
      return (
        <div>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button
              onClick={() => handleClick(9)}
              variant="light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke">
              <EyeSvg />
            </Button>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push('/cms/berita-form')}>
              <PencilSvg />
            </Button>
            <Button
              key="tolak"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40"
              onClick={() => handleClick(4)}>
              Tolak
            </Button>
            <Button variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleClick(3)}>
              Setujui
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 3:
      return (
        <div>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button
              onClick={() => handleClick(9)}
              variant="light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke">
              <EyeSvg />
            </Button>
            <Button variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleClick(5)}>
              Publish
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 5:
      return (
        <div>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleClick(6)}>
              Unpublish
            </Button>
          </ComponentAccessibility>
        </div>
      );
    case 6:
      return (
        <div>
          <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
            <Button
              key="edit"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
              onClick={() => history.push('/cms/berita-form')}>
              <PencilSvg />
            </Button>
            <Button variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => handleClick(5)}>
              Publish
            </Button>
          </ComponentAccessibility>
        </div>
      );
    default:
      return null;
  }
};
