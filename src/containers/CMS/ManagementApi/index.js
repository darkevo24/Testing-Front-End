import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';
import { ReactComponent as Search } from 'assets/search-api.svg';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import bn from 'utils/bemNames';

const bem = bn('cms-api');

const ManagementApi = () => {
  const history = useHistory();
  const LIST_CARD = [
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kominfo',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'asse       ts/Logo_Bappenas_Indonesia.png',
      title: 'Kemendagri',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Bappenas',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kominfo',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kominfo',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'asse       ts/Logo_Bappenas_Indonesia.png',
      title: 'Kemendagri',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Bappenas',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kominfo',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kemendagri',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Bappenas',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kominfo',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kemendagri',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Bappenas',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kominfo',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Kemendagri',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
    {
      img: 'assets/Logo_Bappenas_Indonesia.png',
      title: 'Bappenas',
      url: 'https://bappenas.go.id/data.json/ 123456789/ 01112131415',
      file: 3,
    },
  ];

  return (
    <div className="sdp-cms-api">
      <div className="container">
        <div className={bem.e('header-api')}>
          <div className="row">
            <div className="col-md-6">
              <div className="wrapper-left">
                <h1>API Management</h1>
                <Form.Select>
                  <option>Urut Berdasarkan</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6 d-flex align-bottom">
              <div className="wrapper-right">
                <div className="input-group">
                  <input type="text" placeholder="Cari Instansi" />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <Search />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={bem.e('main-content')}>
        <div className="container">
          <div className="row">
            {LIST_CARD.map((data, index) => {
              return (
                <div key={index} className="col-md-3 px-8 mb-15">
                  <div className="card-list" onClick={() => history.push('api-baru')}>
                    <div className="card-logo">
                      <img src={LogoBappenas} width="60px" alt={''} />
                    </div>
                    <div className="card-description">
                      <h3>{data.title}</h3>
                      <p>{data.url}</p>
                      <div className="card-amount">
                        <span> {data.file} Files </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="wrapper-pagination main">
            <span className="count">Display 1-24</span>
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
