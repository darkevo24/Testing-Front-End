import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as Arrow } from 'assets/arrow-left-add.svg';
import { ReactComponent as Union } from 'assets/union.svg';

import './index.scss';

const AddApi = () => {
  const history = useHistory();

  const [buttonActive, setButtonActive] = useState(true);

  const handleImport = (e) => {
    console.log(e);

    // If Success Import
    setButtonActive(!buttonActive);
  };
  return (
    <div className="management-api add">
      <div className="container">
        <div className="header-add">
          <div className="header-left">
            <Arrow onClick={() => history.push('/api')} />
            <p> Tambah Api </p>
          </div>
          <div className="header-right">
            <button className="btn btn-secondary">Simpan</button>
          </div>
        </div>
        <div className="wrapper-input">
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Judul </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Deskripsi </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Source API </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <div className="input-group">
              <input className="custom-file-input" type="file" />
              <div class="input-group-append">Upload</div>
            </div>
          </div>
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Max Data Parameter </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <input type="text" placeholder="1000" />
          </div>
          <button className="btn btn-success" onClick={handleImport}>
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddApi;
