import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import { NoPerminataanData } from 'components/Icons.js';
import { BimtekLayout } from 'layouts/BimtekLayout';
import { formatDate, monthList } from 'utils/helper';
import BimTekJadwalItem from './item.js';
import './bimtekjadwal.scss';
import {
  bimtekJadwalDatasetSelector,
  bimtekJadwalLocationsDatasetSelector,
  bimtekJadwalTagsDatasetSelector,
  getBimtekJadwalData,
  getBimtekJadwalLocationsData,
  getBimtekJadwalTagsData,
} from './reducer.js';
import Table from 'components/Table.js';
import Loader from 'components/Loader.js';

const BimTekJadwal = () => {
  let currentYear = new Date().getFullYear();
  let filterYear = [];

  const [paramsData, setParamsData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBimtekJadwalTagsData());
    dispatch(getBimtekJadwalLocationsData());
  }, []);

  useEffect(() => {
    dispatch(getBimtekJadwalData(paramsData));
  }, [paramsData]);

  const { records: jadwalData, totalRecords, page, size, loading } = useSelector(bimtekJadwalDatasetSelector);
  const filterLocations = useSelector(bimtekJadwalLocationsDatasetSelector);
  const filterCategory = useSelector(bimtekJadwalTagsDatasetSelector);

  const handleFilterChange = (e) => {
    setParamsData((prev) => ({ ...prev, [e.key]: e.value }));
  };

  const fetchDataset = (params) => {
    setParamsData({ ...paramsData, page: params.page + 1 });
  };

  for (var i = 0; i < 10; i++) {
    filterYear.push(currentYear - i);
  }

  const tableConfig = {
    variant: 'card',
    columns: [
      {
        accessor: 'card',
        Header: 'Jadwal Record',
        Cell: ({ cell: { row: { original: item } = {} } = {} }) => {
          return (
            <BimTekJadwalItem
              key={item.id}
              title={item.namaBimtek}
              startDate={formatDate(item.tanggalMulaiDisetujui)}
              endDate={formatDate(item.tanggalSelesaiDisetujui)}
              city={item.kota}
              location={item.tempat}
              speaker={item.pembicara}
              materi={item.materi}
              jenisPermintaan={item.jenisPermintaan}
              namaInstansi={item.namaInstansi}
              id={item.id}
            />
          );
        },
      },
    ],
    data: jadwalData,
    totalCount: totalRecords,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchDataset({ page: currentPage });
      }
    },
    showSearch: false,
  };
  return (
    <BimtekLayout>
      <div className="h-100">
        <Row className="bimtek-filter mb-3">
          <Col xs={3}>
            <SingleSelectDropdown
              data={filterCategory.map((category) => ({ key: 'tag', value: category, label: category }))}
              placeHolder="Topik Bimtek"
              isLoading={false}
              noValue={true}
              onChange={handleFilterChange}
            />
          </Col>
          <Col xs={4}>
            <SingleSelectDropdown
              data={filterLocations.map((city) => ({ key: 'kota', value: city.id, label: city.nama }))}
              placeHolder="Pilih Kota Pelaksanaan"
              isLoading={false}
              noValue={true}
              onChange={handleFilterChange}
            />
          </Col>
          <Col xs={3}>
            <SingleSelectDropdown
              data={filterYear.map((year) => ({ key: 'tahun', value: year, label: year }))}
              placeHolder="Pilih Tahun"
              isLoading={false}
              noValue={true}
              onChange={handleFilterChange}
            />
          </Col>
          <Col xs={2}>
            <SingleSelectDropdown
              data={monthList.map((month, key) => ({ key: 'bulan', value: key + 1, label: month }))}
              placeHolder="Pilih Bulan"
              isLoading={false}
              noValue={true}
              onChange={handleFilterChange}
            />
          </Col>
        </Row>
        {!jadwalData.length ? (
          <div className="d-flex justify-content-center align-items-center h-100 flex-column mt-5">
            <NoPerminataanData />
            <div className="text-black-50 mb-2 mt-2">No Data</div>
          </div>
        ) : (
          <div className="px-30 pt-0">{!loading ? <Table {...tableConfig} /> : <Loader fullscreen={true} />} </div>
        )}
      </div>
    </BimtekLayout>
  );
};

export default BimTekJadwal;
