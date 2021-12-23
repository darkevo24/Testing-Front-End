import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { CMSModal, Modal } from 'components';
import { icons, Trash, Edit } from 'components/Icons';

import { useSelector, useDispatch } from 'react-redux';
import { getListSosMed, getListSelector, deleteSosMed } from './reducer';

const bem = bn('content-table');

const CMSMediaSosial = () => {
  const dispatch = useDispatch();
  const { records } = useSelector(getListSelector);
  const [selected, setSelected] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  useEffect(() => {
    dispatch(getListSosMed());
  }, []);

  const deleteAction = (key) => {
    setSelected(records[key]);
    setModalDelete(true);
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Media Sosial</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button onClick={() => setModalAdd(true)} variant="info" className="text-center">
              Tambah
            </Button>
          </Col>
        </Row>
      </div>
      <div className={bem.e('body')}>
        {records.length === 0 ? (
          <div className="text-center">
            <icons.noPerminataanData />
          </div>
        ) : null}
        {records.map((sosmed, index) => (
          <Row key={index} className="align-items-center mb-3">
            <Col xs={6} className="d-flex">
              <div className="bg-white border-gray-stroke py-16 text-center wpx-50">
                <img alt="logo" src={sosmed.image} />
              </div>
              <div className="bg-white border-gray-stroke py-16 px-16 w-100">{sosmed.tipe}</div>
            </Col>
            <Col xs={1} className="d-flex justify-content-between align-items-center cursor-pointer">
              <div onClick={() => deleteAction(index)}>
                <Trash />
              </div>
              <Button onClick={() => setModalEdit(true)} variant="light" className="bg-white border-gray-stroke">
                <Edit />
              </Button>
            </Col>
          </Row>
        ))}
      </div>
      {modalDelete ? (
        <CMSModal
          loader={false}
          onClose={() => setModalDelete(false)}
          confirmButtonAction={() => dispatch(deleteSosMed({ id: selected.id }))}
          label={
            <span>
              Apakah anda yakin ingin <b className="sdp-text-blue">menghapus</b> {selected.tipe}?
            </span>
          }
        />
      ) : null}
    </div>
  );
};

export default CMSMediaSosial;
