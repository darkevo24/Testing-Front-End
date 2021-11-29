import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';
import { ReactComponent as Search } from 'assets/search-api.svg';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import { ReactComponent as Edit } from 'assets/edit.svg';

import './index.scss';

const DetailApi = () => {
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
    <div className="management-api add">
      <div className="card-bappenas">
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
      <div className="header-api">
        <div className="row">
          <div className="col-md-6">
            <div className="wrapper-left">
              <button className="btn blue-primary"> Tambah API </button>
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
      <div className="container">
        <div className="management-table">
          <table>
            <thead>
              <th width="20%">Judul API</th>
              <th width="50%">Deskripsi</th>
              <th width="20%">Output JSON</th>
              <th width="10%">Detail</th>
            </thead>
            <tbody>
              {LIST_TABLE.map((data) => {
                return (
                  <tr>
                    <td className="data-title">{data.title}</td>
                    <td className="data-description">{data.description}</td>
                    <td className="data-description">{data.json}</td>
                    <td className="data-description">
                      <button className="btn blue-primary">Detail</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default DetailApi;
