import React from 'react';
import Button from 'react-bootstrap/Button';

import CMSDaftarForm from './CMSDaftarForm';

const CMSDaftarDetail = () => {
  return (
    <div>
      <div className="d-flex justify-content-between p-26 border-bottom">
        <div className="d-flex">
          <div className="sdp-heading mb-4">Data Baru</div>
          <div className="ml-24">
            <Button variant="outline-secondary" className="mr-16">
              Batal
            </Button>
            <Button variant="secondary">Simpan</Button>
          </div>
        </div>
        <div className="pt-10">
          <label className="sdp-text-disable pr-8">Saved 1 minutes ago</label>
          <label className="sdp-text-orange">Draft</label>
        </div>
      </div>
      <div className="bg-gray-lighter">
        <CMSDaftarForm />
      </div>
    </div>
  );
};

export default CMSDaftarDetail;
