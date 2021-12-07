import { useHistory, useLocation } from 'react-router-dom';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';
import { ReactComponent as Search } from 'assets/search-api.svg';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { CMSTable } from 'components';

import './index.scss';

const CreateApi = () => {
  const history = useHistory();
  const LIST_TABLE = [
    {
      id: 1,
      title: 'Judul 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      id: 2,
      title: 'Judul 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      id: 3,
      title: 'Judul 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      id: 4,
      title: 'Judul 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      id: 5,
      title: 'Judul 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      id: 6,
      title: 'Judul 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
    {
      id: 7,
      title: 'Judul 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt ut labore et',
      json: 'data.go.id/api/(instansi)/(judul).json',
    },
  ];
  return (
    <div className="management-api add">
      <div className="card-bappenas">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="wrapper-left">
                <div className="card-logo">
                  <img src={LogoBappenas} alt="logo" height="60px" width="60px" />
                </div>
                <div className="card-description">
                  <h3>Bappenas</h3>
                  <div className="input-group">
                    <input type="text" placeholder="https://bappenas.go.id/data.json/123456789/01112131415" />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <Edit />
                      </span>
                    </div>
                  </div>
                  <p>3 Files</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-api">
        <div className="container">
          <div className="row">
            <div className="col-md-6 pl-0">
              <div className="wrapper-left">
                <button className="btn btn-info" onClick={() => history.push('api/form')}>
                  Tambah API
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-bottom">
              <div className="wrapper-right">
                <div className="input-group">
                  <input type="text" placeholder="Cari..." />
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <Search />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="management-table pt-20">
          <CMSTable
            customWidth={[20, 50, 20, 20, 10]}
            header={['Judul API', 'Deskripsi', 'Output JSON', 'Detail']}
            data={LIST_TABLE.map((item) => {
              let value = {
                data: [item.title, item.description, item.json],
                action: '/cms/api-detail/' + item.id,
              };
              return value;
            })}
          />
          <div className="wrapper-pagination">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link prev" href="#">
                  <Prev />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link active" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link next" href="#">
                  <Next />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateApi;
