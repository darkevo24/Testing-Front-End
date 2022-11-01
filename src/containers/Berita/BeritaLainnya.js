import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SectionTitle } from '.';
import { getMonthlyNews, monthlyNewsSelector } from './reducer';
import Accordion from 'react-bootstrap/Accordion';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const AccordionItem = styled(Accordion.Item)`
  width: 100%;
  border: 0;
  display: flex;
`;

const AccordionHeader = styled(Accordion.Header)`
  margin-top: 4px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  border-radius: 4px;
  padding-left: 0;

  & .accordion-button {
    padding: 0.5rem 1.25rem;
    height: 30px;
    font-size: 12px;
    font-weight: 600;
    &:not(.collapsed) {
      background-color: #ed1c24;
      border: 0;
      color: #ffffff;
    }
    &:after {
      display: none;
    }
    &:focus {
      border-color: transparent;
      box-shadow: none;
    }
  }
`;

const Line = styled.div`
  border-left: 1px solid #e2e8f0;
  height: 100%;
`;
const Dot = styled.div`
  height: 11px;
  width: 10px;
  background-color: #e2e8f0;
  border-radius: 50%;
  display: inline-block;

  &.active {
    background-color: transparent;
    border: 1px solid #ed1c24;
  }
`;

const Click = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  flex: 1;
`;

const AccordionBody = styled(Accordion.Body)`
  border-right-style: none;
  cursor: pointer;
  font-size: 12px;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  .accordion-group {
    border: none;
  }
`;

const BeritaLainnya = () => {
  const dispatch = useDispatch();
  const { records, status } = useSelector(monthlyNewsSelector);
  const history = useHistory();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getMonthlyNews('/perbulan'));
    }

    // create new object list from records to datas;
    constructDatas(records);
  }, [dispatch, status]);

  const constructDatas = (records) => {
    const newDatas = Object.entries(records).map(([year, months]) => {
      return {
        year,
        months,
        expanded: false,
      };
    });
    setDatas(newDatas);
  };

  const handleDetail = (event) => {
    const date = `${event.month}-${event.year}`;
    history.push(`/berita/perbulan/${date}`);
  };

  const handleExpanded = (index) => {
    const newDatas = [...datas];
    newDatas[index].expanded = !newDatas[index].expanded;
    setDatas(newDatas);
  };

  return (
    <Wrapper>
      <SectionTitle>Berita Lainnya</SectionTitle>
      <Accordion alwaysOpen>
        {datas.map((data, index) => (
          <AccordionItem eventKey={data.year} className="row">
            <div className="col-2 d-flex flex-column align-items-center">
              <Dot className={`${data.expanded ? 'active' : ''}`} id="dot" />
              <Line />
            </div>
            <div className="col-10 pl-0">
              <AccordionHeader>
                <Click onClick={() => handleExpanded(index)}>
                  {data.year}
                  <span className="fw-normal ml-5">
                    (
                    {data.months.reduce(function (tot, arr) {
                      return tot + arr.jumlah;
                    }, 0)}
                    )
                  </span>
                </Click>
              </AccordionHeader>
              {data.months.map((item) => (
                <AccordionBody key={item.bulan}>
                  <Click onClick={() => handleDetail(item)}>
                    {item.bulan} <span style={{ color: '#858a8f' }}>({item.jumlah})</span>
                  </Click>
                </AccordionBody>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </Wrapper>
  );
};

export default BeritaLainnya;
