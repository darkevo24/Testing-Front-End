import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiUrls, post } from 'utils/request';
import { Input, Modal, Notification } from 'components';
import { Galery, Close } from 'components/Icons';

const schemaMateri = yup
  .object({
    namaMateri: yup.string().required(),
  })
  .required();

const schemaEditMateri = yup
  .object({
    namaMateriUpdate: yup.string().required(),
  })
  .required();

export const ModalCreateMateri = ({
  statusModal,
  idMateri,
  visible,
  listMateri,
  setListMateri,
  dataMateri,
  setDataMateri,
  namaMateriEdit,
}) => {
  const {
    control: controlMateri,
    formState: { errors: errorsMateri },
    setValue: setValueMateri,
    handleSubmit: handleSubmitMateri,
  } = useForm({
    resolver: yupResolver(schemaMateri),
    defaultValues: {
      namaMateri: '',
    },
  });

  const {
    control: controlEditMateri,
    formState: { errors: errorsEditMateri },
    setValue: setValueEditMateri,
    handleSubmit: handleSubmitEditMateri,
  } = useForm({
    resolver: yupResolver(schemaEditMateri),
    defaultValues: {
      namaMateriUpdate: '',
    },
  });

  useEffect(() => {
    if (namaMateriEdit) setValueEditMateri('namaMateriUpdate', namaMateriEdit);
  }, [namaMateriEdit]);

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

  const addFile = async (e) => {
    let file = e.target.files[0];
    try {
      let materiFormData = new FormData();
      materiFormData.append('file', file);
      await post(apiUrls.fileUpload, materiFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setListMateri([...listMateri, res.data]);
      });
    } catch (e) {
      handleNotification('secondary', `Error, ${e.message}`, 'cross');
    }
  };

  const removeFile = (index) => {
    let selected = listMateri[index];
    setListMateri(listMateri.filter((item) => item !== selected));
  };

  const onAddMateri = (data) => {
    if (listMateri.length < 1) {
      visible();
      return handleNotification('secondary', 'File Tidak Boleh Kosong', 'cross');
    }
    let newMateri = listMateri.map((item) => ({
      ...item,
      nama: data.namaMateri,
      id: (Math.random() + 1).toString(36).substring(7),
    }));
    setDataMateri([...dataMateri, newMateri[0]]);
    setValueMateri('namaMateri', '');
    visible();
    setListMateri([]);
    return handleNotification('secondary', 'Berhasil Menambahkan Materi', 'check');
  };

  const onEditMateri = (data) => {
    if (!idMateri) {
      visible();
      return handleNotification('secondary', 'Gagal Merubah Materi ', 'cross');
    }
    if (listMateri.length < 1) {
      visible();
      return handleNotification('secondary', 'File Tidak Boleh Kosong', 'cross');
    }
    let obj = listMateri.map((item) => ({
      id: idMateri,
      nama: data.namaMateriUpdate,
      fileName: item.fileName,
      location: item.location,
      fileType: item.fileType,
      size: item.size,
    }));
    let newDataMateri = dataMateri.filter((x) => x.id !== idMateri);
    setDataMateri([...newDataMateri, obj[0]]);
    visible();
    setListMateri([]);
    return handleNotification('secondary', 'Berhasil Merubah Materi ', 'check');
  };

  switch (statusModal) {
    case 'materi':
      return (
        <Modal className="cms-bimtek-materi" title="Tambah Materi Baru" onClose={visible} visible={visible}>
          <Form onSubmit={handleSubmitMateri(onAddMateri)}>
            <div>
              <Input
                group
                label="Materi"
                name="namaMateri"
                control={controlMateri}
                error={errorsMateri.namaMateri?.message}
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
                <Button className="br-4 mr-8 px-40 py-5 bg-transparent" variant="outline-none" onClick={visible}>
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
          <Form onSubmit={handleSubmitEditMateri(onEditMateri)}>
            <div>
              <Input
                group
                label="Materi"
                name="namaMateriUpdate"
                control={controlEditMateri}
                error={errorsEditMateri.namaMateriUpdate?.message}
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
    default:
      return null;
  }
};
export default ModalCreateMateri;
