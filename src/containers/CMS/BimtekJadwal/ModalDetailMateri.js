import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import isFunction from 'lodash/isFunction';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiUrls, post, put } from 'utils/request';
import { Input, Modal, Notification } from 'components';
import { Galery, Close } from 'components/Icons';

const schemaMateri = yup
  .object({
    materi: yup.string().required(),
  })
  .required();

const schemaEditMateri = yup
  .object({
    materiUpdate: yup.string().required(),
  })
  .required();

export const ModalDetailMateri = ({
  statusModal,
  idMateri,
  visible,
  listMateri,
  setListMateri,
  initialCall,
  idJadwal,
  namaMateriEdit,
  apiError,
  setAPIError,
}) => {
  const {
    control: controlMateri,
    formState: { errors: errorsMateri },
    reset: resetMateri,
    setValue: setValueMateri,
    handleSubmit: handleSubmitMateri,
  } = useForm({
    resolver: yupResolver(schemaMateri),
    defaultValues: {
      materi: '',
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
      materiUpdate: '',
    },
  });

  useEffect(() => {
    if (namaMateriEdit) setValueEditMateri('materiUpdate', namaMateriEdit);
  }, [namaMateriEdit]);

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, message, callBack) => {
    try {
      await method(url, {}, params);
      visible();
      handleNotification('secondary', `${message}`, 'check');
      initialCall();
      isFunction(callBack) && callBack();
      setAPIError(false);
    } catch (e) {
      setAPIError(true);
      visible();
      return handleNotification('secondary', `Error, ${e.message}`, 'cross');
    }
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

  const onAddMateri = (data) => {
    let obj = listMateri.map((item) => ({
      nama: data.materi,
      fileName: item.fileName,
      location: item.location,
      fileType: item.fileType,
      size: item.size,
    }));
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${idJadwal}/materi`,
      { data: { materi: obj } },
      'Berhasil Menambah Materi',
    );
    if (!apiError) {
      resetMateri({});
      setValueMateri('materi', '');
    }
    setListMateri([]);
  };

  const onEditMateri = (data) => {
    let obj = listMateri.map((item) => ({
      nama: data.materiUpdate,
      fileName: item.fileName,
      location: item.location,
      fileType: item.fileType,
      size: item.size,
    }));
    visible();
    handleAPICall(
      put,
      `${apiUrls.cmsBimtekJadwal}/${idJadwal}/materi/${idMateri}`,
      { data: obj[0] },
      'Berhasil Merubah Materi',
    );
    setListMateri([]);
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
      return handleNotification(`secondary', 'Error, ${e.message}', 'cross`);
    }
  };

  const removeFile = (index) => {
    let selected = listMateri[index];
    setListMateri(listMateri.filter((item) => item !== selected));
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
                name="materi"
                control={controlMateri}
                error={errorsMateri.materi?.message}
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
          <Form onSubmit={handleSubmitEditMateri(onEditMateri)}>
            <div>
              <Input
                group
                label="Materi"
                name="materiUpdate"
                control={controlEditMateri}
                error={errorsEditMateri.materi?.message}
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
export default ModalDetailMateri;
