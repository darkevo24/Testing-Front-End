import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SectionTitle } from '.';
import { getMonthlyNews, monthlyNewsSelector } from './reducer';
import { SectionList } from 'components';
import RBDropdown from 'react-bootstrap/Dropdown';
import RBDropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const TopikItem = styled.div`
  border-bottom: 1px solid #e1e2ea;
  padding: 16px;

  & span {
    margin-right: 8px;
  }

  &:nth-child(2) {
    border-top: 1px solid #e1e2ea;
  }
`;

const BeritaLainnya = () => {
  const dispatch = useDispatch();
  const { records, status } = useSelector(monthlyNewsSelector);
  const history = useHistory();

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getMonthlyNews('/perbulan'));
    }
  }, [dispatch, status]);

  // const handleDetail = (event, date) => {
  //   event.preventDefault();
  //   history.push(`/berita/perbulan/${date}`);
  // };

  // const onSortChange = (option) => () => {
  //   setSelectedOption(option);
  //   console.log(option);
  // };

  return (
    <Wrapper>
      <SectionTitle title="Berita Lainnya" />
      <Accordion defaultActiveKey={['2021']} alwaysOpen>
        {Object.entries(records).map(([key, value]) => (
          <Accordion.Item eventKey={key}>
            <Accordion.Header>{key}</Accordion.Header>
            {value.map((item, index) => (
              <Accordion.Body>
                {item.bulan} ({item.jumlah})
              </Accordion.Body>
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </Wrapper>
  );
};

export default BeritaLainnya;
