import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'components/Modal';

export const CMSModal = ({ onClose, label, loader, confirmButtonAction }) => {
  return (
    <Modal visible={true} onClose={onClose} title="" showHeader={false}>
      <label className="p-24">{label}</label>
      <div className="d-flex justify-content-end mt-50">
        <Button className="br-4 mr-8 px-35 bg-transparent" variant="outline-none" onClick={onClose}>
          Batal
        </Button>
        <Button className="br-4 px-30" variant="info" onClick={confirmButtonAction}>
          {loader && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />}
          Konfirmasi
        </Button>
      </div>
    </Modal>
  );
};
