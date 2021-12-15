import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { ReactComponent as EditIcon } from 'assets/pencil.svg';
import { FileInput, ReadOnlyInputs } from 'components';

const schema = yup
  .object({
    judul: yup.string().required(),
    topik: yup.mixed().required(),
    tag: yup.mixed().required(),
    isiforum: yup.mixed().required(),
    lampiran: yup.mixed(),
  })
  .required();

const CMSForumSDIDetail = () => {
  const { control } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div className="cms-forum-sdi-detail-wrapper">
      <div className="d-flex bg-secondary align-items-center">
        <button className="bg-white border-gray-stroke p-10">{'<'}</button>
        <div className="d-flex justify-content-center w-100">
          <label className="sdp-text-disable d-flex justify-content-center">Archived</label>
        </div>
      </div>
      <div className="d-flex mt-56">
        <div className="w-75 pl-100">
          <div className="d-flex ml-24 mr-10 justify-content-between">
            <div>
              <label className="fw-bold fs-24">Forum SDI</label>
            </div>
            <div>
              <button className="mr-16 bg-gray sdp-text-grey-dark br-4 py-7 px-13 border-0">
                <DeleteIcon />
              </button>
              <button className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-7 px-13">
                <EditIcon />
              </button>
              <button className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-7 px-40">Tolak</button>
              <button className="mr-16 bg-info sdp-text-white br-4 py-7 px-40 border-0">Setujui</button>
            </div>
          </div>
          <div className="forum-sdi-detail-wrapper">
            <Row className="mb-3 px-24">
              <ReadOnlyInputs group label="Judul" labelClass="sdp-form-label fw-normal" type="text" value="judul value" />
              <ReadOnlyInputs group label="Topik" labelClass="sdp-form-label fw-normal" type="text" value="topik value" />
              <ReadOnlyInputs group label="Tag" labelClass="sdp-form-label fw-normal" type="text" value="Tag value" />
              <ReadOnlyInputs
                group
                rows={3}
                label="Isi Forum"
                labelClass="sdp-form-label fw-normal"
                type="text"
                as="textarea"
                value="Editor value"
              />
              <FileInput
                group
                groupClass="mb-16"
                groupProps={{
                  md: 12,
                  as: Col,
                  controlId: 'formFile',
                }}
                control={control}
                disabled
                label="Lampiran"
                labelClass="sdp-form-label fw-normal"
                name="lampiran"
              />
            </Row>
          </div>
        </div>
        <div className="w-25 wpx-">
          <div className="mb-57">
            <label className="fw-600 fs-20">Log Status</label>
          </div>
          <div className="d-flex w-75 align-items-center pb-16">
            <span className="wpx-120">{moment(new Date()).format('DD MMMM YYYY')}</span>
            <div className="border-gray-stroke h-0 w-100" />
          </div>
          <div>
            <span className="bg-gray sdp-text-disable p-5 border-0">Dibuat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSForumSDIDetail;
