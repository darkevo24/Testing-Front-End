import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'components/Modal';

export const ForumModal = ({
  visible,
  onClose,
  label,
  cancelButtonText,
  loader,
  confirmButtonText,
  confirmButtonAction,
}) => {
  return (
    <Modal visible={visible} onClose={onClose} title="" showHeader={false}>
      <label className="p-24">{label}</label>
      <div className="d-flex justify-content-end mt-50">
        <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={onClose}>
          {cancelButtonText}
        </Button>
        <Button className="br-4 px-39 py-13" variant="info" onClick={confirmButtonAction}>
          {loader && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />}
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
};
