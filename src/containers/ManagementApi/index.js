import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { ReactComponent as Search } from 'assets/search-api.svg';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import bn from 'utils/bemNames';

const bem = bn('management-api');

const ManagementApi = () => {
  const history = useHistory();
  const LIST_TABLE = [
    {
      title: 'Judul 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      title: 'Judul 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      title: 'Judul 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      title: 'Judul 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      title: 'Judul 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      title: 'Judul 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      title: 'Judul 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
  ];
  return (
    <div className="sdp-management-api">
      <div className="container">
        <div className={bem.e('card-api')}>
          <Row>
            <Col md={6}>
              <div className="wrapper-left">
                <div className="card-logo">
                  <img src={LogoBappenas} alt="logo" height="60px" width="60px" />
                </div>
                <div className="card-description">
                  <h3>Bappenas</h3>
                  <div className="input-group">
                    <input type="text" placeholder="https://bappenas.go.id/data.json/123456789/01112131415" />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <Edit />
                      </span>
                    </div>
                  </div>
                  <p>3 Files</p>
                </div>
              </div>
            </Col>
            <Col Md={6}>
              <div className="wrapper-right">
                <Button variant="info" onClick={() => history.push('/api/form')}>
                  Tambah API
                </Button>
                <div className="input-group">
                  <input type="text" placeholder="Cari..." />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <Search />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={bem.e('management-table bappenas')}>
          <table>
            <thead>
              <th width="25%">Judul API</th>
              <th width="50%">Deskripsi</th>
              <th width="25%">Output JSON</th>
            </thead>
            <tbody>
              {LIST_TABLE.map((data) => {
                return (
                  <tr onClick={() => history.push('api-detail/api-1')}>
                    <td className="data-title">{data.title}</td>
                    <td className="data-description">{data.description}</td>
                    <td className="data-json">{data.json}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="wrapper-pagination">
            <ul className="pagination">
              <li className="page-item">
                <button className="page-link prev">
                  <Prev />
                </button>
              </li>
              <li className="page-item">
                <button className="page-link active">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
              <li className="page-item">
                <button className="page-link">4</button>
              </li>
              <li className="page-item">
                <button className="page-link next">
                  <Next />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementApi;
