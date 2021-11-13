import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BimtekLayout } from 'layouts/BimtekLayout';

import './bimtekform.scss';

const BimTekForm = () => {
  return (
    <BimtekLayout>
      <Card className="bimtek-form">
        <Card.Header>Formulir Pendaftaran</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="fullName">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="domisili">
                <Form.Label>Provinsi/Kab/Kota</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="agency">
                <Form.Label>Dinas Instansi</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="position">
                <Form.Label>Jabatan / Peran Daftar</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="phoneNumber">
                <Form.Label>Nomor Handphone</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Alamat E-mail</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="city">
                <Form.Label>Kota Pelaksana</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="talentCount">
                <Form.Label>Ekspektasi Jumlah Peserta</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="materi">
              <Form.Label>Materi Bimtek</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Button variant="info">Kirim Pengajuan</Button>
          </Form>
        </Card.Body>
      </Card>
    </BimtekLayout>
  );
};

export default BimTekForm;
