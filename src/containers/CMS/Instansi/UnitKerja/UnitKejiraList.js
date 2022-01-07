import { Button } from 'react-bootstrap';
import bn from 'utils/bemNames';
import { Table } from 'components';
import TableLoader from 'components/Loader/TableLoader';

const bem = bn('instansi-data');

const UnitKejiraList = ({ dataset, onDelete, onEdit }) => {
  const { records, size, loading, page, totalRecors, totalPage } = dataset;
  const columns = [
    {
      Header: 'Kode Unit Kerja',
      accessor: 'kode',
    },
    {
      Header: 'Nama Unit Kerja',
      accessor: 'nama',
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row: { original } }) => {
        const { id } = original;
        return (
          <div className={bem.e('action')}>
            <Button variant="link" onClick={(e) => onEdit(id)}>
              Edit
            </Button>
            <Button variant="link" onClick={(e) => onDelete(id)}>
              Delete{' '}
            </Button>
          </div>
        );
      },
    },
  ];

  const tableConfig = {
    className: 'cms-table-kejira',
    columns,
    data: records,
    variant: 'link',
    title: '',
    showSearch: false,
    onSearch: () => {},
    totalCount: totalRecors || null,
    pageCount: totalPage || null,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
  };

  return (
    <div>
      <div className="pt-0">
        {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      </div>
    </div>
  );
};

export default UnitKejiraList;
