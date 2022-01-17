import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { formatDate } from 'utils/helper';
import { apiUrls, get } from 'utils/request';
import BimTekSumJadwal from './jadwal.js';
import { ReactComponent as Download } from 'assets/download.svg';
import './bimteksummary.scss';
import bn from 'utils/bemNames';
import cx from 'classnames';
import {
  getBimtekSummaryMateriTerdekat,
  getBimtekSummaryJadwalTerdekat,
  getBimtekLatestDokumentasi,
  bimtekSummaryMateriTerdekatDatasetSelector,
  bimtekSummaryJadwalTerdekatDatasetSelector,
  bimtekLatestDokumentasiSelector,
} from './reducer';

const bem = bn('bimtek-summary');

const BimtekSummary = () => {
  const dispatch = useDispatch();
  const settings = {
    className: 'slider variable-width',
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const MateriItem = styled.div`
    border-top: 1px solid #e1e2ea;
    padding: 12px 16px;
    font-family: Myriad Pro;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
    color: #2d2627;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Button = styled.div`
    background: #f5f6fa;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
  `;

  const history = useHistory();
  const gotoJadwal = () => history.push('/bimtek-jadwal');

  useEffect(() => {
    dispatch(getBimtekSummaryMateriTerdekat());
    dispatch(getBimtekSummaryJadwalTerdekat());
    dispatch(getBimtekLatestDokumentasi());
  }, []);

  const { records: materiRecords } = useSelector(bimtekSummaryMateriTerdekatDatasetSelector);
  const { records: jadwalRecords } = useSelector(bimtekSummaryJadwalTerdekatDatasetSelector);
  const { records: dokumentasiRecords } = useSelector(bimtekLatestDokumentasiSelector);

  const dataJadwal = jadwalRecords.slice(0, 3);

  const downloadMateri = async (file) => {
    try {
      await get(`${apiUrls.bimtekMateriTerdekatDownload}/${file}`);
    } catch (e) {}
  };

  return (
    <BimtekLayout>
      <div className={bem.b()}>
        <div className={bem.e('list')}>
          <Slider {...settings}>
            {dokumentasiRecords.map((dokumentasi, index) => (
              <DokumentasiItem
                key={index}
                title={dokumentasi.namaBimtek}
                kota={dokumentasi.kota}
                date={formatDate(dokumentasi.tanggalMulaiDisetujui)}
                urlPhoto={dokumentasi?.images[0]?.location ?? null}
                desc={dokumentasi.isiDokumentasi}
              />
            ))}
          </Slider>
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <div className="bimteksum-title">Jadwal</div>
              <div className="bimteksum-title-border"></div>
            </div>
            <div onClick={gotoJadwal} className="bimteksum-viewall">
              Lihat Semua
            </div>
          </div>
          {dataJadwal.map((item, key) => (
            <BimTekSumJadwal
              key={key}
              title={item.namaBimtek}
              startDate={formatDate(item.tanggalMulaiDisetujui)}
              endDate={formatDate(item.tanggalSelesaiDisetujui)}
              city={item.kota}
            />
          ))}
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <div className="bimteksum-title">Materi</div>
              <div className="bimteksum-title-border"></div>
            </div>
            <div className="bimteksum-viewall">Lihat Semua</div>
          </div>
          {materiRecords.map((item, key) => (
            <MateriItem key={key}>
              {item.nama}
              <Button onClick={() => downloadMateri(item.fileName)}>
                <Download />
              </Button>
            </MateriItem>
          ))}
        </div>
      </div>
    </BimtekLayout>
  );
};

const DokumentasiItem = ({ urlPhoto, title, date, kota, desc }) => {
  return (
    <div className={cx(bem.e('list-item', ''), 'mr-16')}>
      <div>
        <img className={cx(bem.e('content-image', 'd-block'))} src={urlPhoto} alt="Not Load here" />
      </div>
      <div className={cx(bem.e('content-section'), 'm-16')}>
        <div className={cx(bem.e('content-date'), 'fs-14 mt-15')}>
          {kota}, {date}
        </div>
        <div className={cx(bem.e('content-title'), 'fw-600 fs-14 mt-8')}>{title}</div>
        <div
          className={cx(bem.e('content-description'), 'fw-400 fs-13 mt-8')}
          dangerouslySetInnerHTML={{ __html: desc }}></div>
      </div>
    </div>
  );
};

export default BimtekSummary;
