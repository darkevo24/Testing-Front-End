import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { getBimtekPermintaan, bimtekPermintaan, getBimtekLogs, bimtekLogs } from './reducer';
import moment from 'moment';
import { BackArrow } from 'components/Icons';
import bn from 'utils/bemNames';
import 'moment/locale/id';

moment.locale('id');

const bem = bn('bimtek-permintaan');

const PermintaanDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleRecord: permintaanRecord } = useSelector(bimtekPermintaan);
  const { records: logRecord } = useSelector(bimtekLogs);

  useEffect(() => {
    dispatch(getBimtekPermintaan({ id }));
    dispatch(getBimtekLogs({ id }));
  }, [id]);

  return (
    <BimtekLayout className="bimtek-permintaan">
      {permintaanRecord && logRecord && (
        <Row>
          <Col lg={9}>
            <div className={bem.e('item', '')}>
              <div className={bem.e('info-data', 'pt-3 pb-3')}>
                <a href="/bimtek-permintaan" className={bem.e('', 'fs-16 text-decoration-none')}>
                  <span className="mr-12">
                    <BackArrow variant="blue" />
                  </span>
                  Permintaan Bimtek Saya
                </a>{' '}
                / {permintaanRecord.kodeBimtek}
              </div>
            </div>
            <div className={bem.e('', 'p-0')}>
              <div className={bem.e('terkim-div')}>Token</div>
            </div>
            <div className={bem.e('item', 'pt-3 pb-3')}>
              <h5 className={bem.e('info-permit-data', '')}>Informasi Peminta Data</h5>
              <div className={bem.e('', 'px-3')}>
                <div className="d-flex justify-content-between pt-3">
                  <div>Nama Lengkap</div>
                  <div>{permintaanRecord?.requestor?.nama}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>No Handphone</div>
                  <div>{permintaanRecord?.requestor?.noHp}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Email</div>
                  <div>{permintaanRecord?.requestor?.email}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Materi</div>
                  <div>{permintaanRecord?.tagMateri?.join()}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Dinas/Instansi</div>
                  <div>{permintaanRecord?.requestor?.instansiName}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Jabatan/Peran Pendaftar</div>
                  <div>{permintaanRecord?.requestor?.jabatanName}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Kota Pelaksana</div>
                  <div>{permintaanRecord?.kota}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Provinsi/Kab/Kota</div>
                  <div>{permintaanRecord?.requestor?.kabupatenKotaName}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Ekspektasi Jumlah Peserta</div>
                  <div>{permintaanRecord?.ekspektasiJumlahPeserta}</div>
                </div>
              </div>
            </div>
            <div className={bem.e('item', ' pt-3 pb-3')}>
              <h5 className={bem.e('info-permit-data', '')}>Informasi Bimbingan Teknis</h5>
              <div className={bem.e('', ' px-3')}>
                <div className="d-flex justify-content-between pt-3">
                  <div>Nama Bimtek</div>
                  <div>{permintaanRecord?.namaBimtek}</div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Tanggal Mulai Pelaksana</div>
                  <div>
                    {moment(permintaanRecord?.tanggalMulaiDisetujui).format('D MMMM YYYY ')},
                    {moment(permintaanRecord.tanggalMulaiDisetujui).format('HH:MM ')}
                  </div>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <div>Tanggal Selesai Pelaksanaan</div>
                  <div>
                    {moment(permintaanRecord.tanggalSelesaiDisetujui).format('D MMMM YYYY ')},
                    {moment(permintaanRecord.tanggalSelesaiDisetujui).format('HH:MM ')}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={3} className={bem.e('log-status-wrapper')}>
            <h3>Log Status</h3>
            {logRecord.map((records, index) => (
              <div key={index} className="mb-3">
                <div className={bem.e('after-content-hr', 'd-flex flex-row')}>
                  {moment(records.createdAt).format('D MMMM YYYY ')}
                </div>

                <div className="d-flex align-items-center">
                  <div className={bem.e('log-status-terkim')}>{records.status}</div>
                  <div className={bem.e('log-message-terkim')}>{records.displayMessage}</div>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      )}
    </BimtekLayout>
  );
};
export default PermintaanDetailPage;
