import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BeritaGrid } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherNews, otherNewsSelector } from './reducer';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  border-top: 4px solid #ff0000;
  padding-top: 32px;
`;

const BeritaItem = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid #e1e2ea;
`;

const Topik = styled.div`
  font-size: 14px;
  color: #007aff;
  background: rgba(0, 122, 255, 0.12);
  border-radius: 4px;
  padding: 8px 12px;
  display: inline-block;
`;

const Judul = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #2d2627;
  margin: 12px 0;
  cursor: pointer;
`;

const Konten = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: #515154;
`;

const Image = styled.img`
  width: 100%;
`;

const ButtonLoadMore = styled.button`
  background: #f5f6fa;
  border-radius: 4px;
  font-size: 14px;
  color: #2d2627;
  padding: 16px 24px;
  margin: 32px 0;
  border: 0;
`;

const ListBerita = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { records, status } = useSelector(otherNewsSelector);
  const [page, setPage] = useState(3);

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getOtherNews(page));
    }
  }, [dispatch, status, page]);
  const handleLoadMore = () => {
    setPage(page + 3);
  };
  const handleDetail = (event, title) => {
    event.preventDefault();
    history.push(`/berita/${title}`);
  };
  return (
    <Wrapper>
      <BeritaGrid columns={props.columns}>
        {records.length &&
          records.map((content, i) => {
            const { judul, slug, image, kategori, id } = content;
            return (
              <BeritaItem className="row" key={'lb' + i}>
                <div className="col-lg-4" style={{ paddingRight: '24px' }}>
                  <Image src={image} />
                </div>
                <div className="col-lg-8">
                  <Topik>{kategori}</Topik>
                  <Judul onClick={(event) => handleDetail(event, id)}>{judul}</Judul>
                  <Konten>{slug}</Konten>
                </div>
              </BeritaItem>
            );
          })}
      </BeritaGrid>
      {records.length > 3 && <ButtonLoadMore onClick={handleLoadMore}>Muat Lebih Banyak</ButtonLoadMore>}
    </Wrapper>
  );
};

export default ListBerita;
