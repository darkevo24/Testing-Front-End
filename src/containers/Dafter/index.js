import { useMemo } from 'react';
import Table from 'components/Table';
import makeData from 'utils/makeData';

const Dafter = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Instansi',
        accessor: 'instansi',
      },
      {
        Header: 'Nama Data',
        accessor: 'name',
      },
      {
        Header: 'Konsep',
        accessor: 'konsep',
      },
      {
        Header: 'Definisi',
        accessor: 'definisi',
      },
      {
        Header: 'Sumber Definisi',
        accessor: 'sumber',
      },
      {
        Header: 'Jadwal Pemutakhiran',
        accessor: 'jadwal',
      },
      {
        Header: 'Dibuat',
        accessor: 'dibuat',
      },
      {
        Header: 'Diperbarui',
        accessor: 'diper',
      },
      {
        Header: 'Produsen Data',
        accessor: 'produsen',
      },
      {
        Header: 'Format',
        accessor: 'format',
      },
      {
        Header: 'Link Akses',
        accessor: 'link',
        Cell: Table.Link,
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'edit',
            callback: () => {
              // TODO: handle edit callback
            },
          },
          {
            type: 'trash',
            callback: () => {
              // TODO: handle delete callback
            },
          },
        ],
        Cell: Table.Actions,
      },
    ],
    [],
  );
  const data = useMemo(() => makeData(200), []);

  return (
    <div className="dafter-page h-100 w-100">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Dafter;
