import { ReactComponent as Union } from 'assets/union.svg';

import './index.scss';

const ApiForm = () => {
  return (
    <div className="management-api form">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="wrapper-input">
              <div className="form-group">
                <label for="Judul">Judul</label>
                <div className="box-input">
                  <input type="text" placeholder="" />
                  <div className="wrapper-union">
                    <Union />
                    <div className="wrapper-desc">
                      Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                      Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label for="Judul">Judul</label>
                <div className="box-input">
                  <input type="text" placeholder="" />
                  <div className="wrapper-union">
                    <Union />
                    <div className="wrapper-desc">
                      Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                      Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                    </div>
                  </div>
                </div>
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
              <button className="btn btn-success">Import</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiForm;
