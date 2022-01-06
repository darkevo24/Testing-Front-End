import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Galery, Close } from 'components/Icons';
import { DatePicker, Input, Modal, Notification } from 'components';

export const ModalsDetail = ({
  statusModal,
  visible,
  onSubmit,
  listMateri,
  idMateri,
  removeFile,
  addFile,
  control,
  errors,
}) => {
  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const openUploadForm = (id) => {
    if (idMateri) {
      if (listMateri.length >= 1) {
        visible();
        return handleNotification('secondary', 'Error, Maksimal File Edit 1', 'cross');
      }
    }
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  switch (statusModal) {
    case 'materi':
      return (
        <Modal className="cms-bimtek-materi" title="Tambah Materi Baru" onClose={visible} visible={visible}>
          <Form onSubmit={onSubmit}>
            <div>
              <Input
                group
                label="Materi"
                name="materi"
                control={control}
                error={errors.materi?.message}
                rules={{ required: true }}
              />
              <div>
                <label>Lampiran</label>
                <input id="sdp-upload-materi" multiple type="file" style={{ display: 'none' }} onChange={addFile} />
              </div>
              <div className="wrapper-lampiran">
                <div className="wrapper-lampiran-header" onClick={() => openUploadForm('sdp-upload-materi')}>
                  <span className="upload"> Upload </span>
                  <span className="cta"> Upload Image (format .png, .jpeg, .jpg max. 512KB) </span>
                </div>
                <div className="wrapper-lampiran-file">
                  {listMateri.map((data, index) => {
                    return (
                      <span className="file mr-10 mb-10" key={index} onClick={() => removeFile(index)}>
                        <Galery /> <span> {data.fileName} </span> <Close />
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button className="br-4 mr-8 px-40 py-10 bg-transparent" variant="outline-none" onClick={visible}>
                  Batal
                </Button>
                <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                  Simpan
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
      );
    case 'editMateri':
      return (
        <Modal className="cms-bimtek-materi" title="Ubah Materi" onClose={visible} visible={visible}>
          <Form onSubmit={onSubmit}>
            <div>
              <Input
                group
                label="Materi"
                name="materiUpdate"
                control={control}
                error={errors.materi?.message}
                rules={{ required: true }}
              />
              <div>
                <label>Lampiran</label>
                <input id="sdp-upload-materi" multiple type="file" style={{ display: 'none' }} onChange={addFile} />
              </div>
              <div className="wrapper-lampiran">
                <div className="wrapper-lampiran-header" onClick={() => openUploadForm('sdp-upload-materi')}>
                  <span className="upload"> Upload </span>
                  <span className="cta"> Upload Image (format .png, .jpeg, .jpg max. 512KB) </span>
                </div>
                <div className="wrapper-lampiran-file">
                  {listMateri.map((data, index) => {
                    return (
                      <span className="file mr-10 mb-10" key={index} onClick={() => removeFile(index)}>
                        <Galery /> <span> {data.fileName} </span> <Close />
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button className="br-4 mr-8 px-40 py-13 bg-transparent" variant="outline-none" onClick={visible}>
                  Batal
                </Button>
                <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                  Simpan
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
      );
    case 'pembicara':
      return (
        <Modal className="cms-bimtek-materi" title="Tambah Pembicara Baru" visible={visible} onClose={visible}>
          <Form onSubmit={onSubmit}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicara"
                  control={control}
                  error={errors.tambahPembicara?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulai"
                    control={control}
                    error={errors.tambahPembicaraWaktuMulai?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamMulai"
                    control={control}
                    error={errors.tambahPembicaraJamMulai?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Sesi"
                    name="tambahPembicaraWaktuSelesai"
                    control={control}
                    error={errors.tambahPembicaraWaktuSelesai?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamSelesai"
                    control={control}
                    error={errors.tambahPembicaraJamSelesai?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-40 py-10 bg-transparent" variant="outline-none" onClick={visible}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      );
    case 'editPembicara':
      return (
        <Modal className="cms-bimtek-materi" title="Ubah Pembicara" visible={visible} onClose={visible}>
          <Form onSubmit={onSubmit}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicaraUpdate"
                  control={control}
                  error={errors.tambahPembicaraUpdate?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulaiUpdate"
                    control={control}
                    error={errors.tambahPembicaraWaktuMulaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamMulaiUpdate"
                    control={control}
                    error={errors.tambahPembicaraJamMulaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Sesi"
                    name="tambahPembicaraWaktuSelesaiUpdate"
                    control={control}
                    error={errors.tambahPembicaraWaktuSelesaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamSelesaiUpdate"
                    control={control}
                    error={errors.tambahPembicaraJamSelesaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-40 py-10 bg-transparent" variant="outline-none" onClick={visible}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      );
    default:
      return null;
  }
};
