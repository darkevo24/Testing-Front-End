import { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SectionTitle } from '.';
import { getMonthlyNews, monthlyNewsSelector } from './reducer';
import cx from 'classnames';
import bn from 'utils/bemNames';
const bem = bn('section-list');

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

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getMonthlyNews('/perbulan'));
    }
    Object.entries(records).map(([key, value]) => {
      value.map((id, item) => {
        console.log(key);
        // console.log(item.bulan);
        // console.log(item.tahun);
        // console.log(item.jumlah);
        // console.log(item.month);
      });
    });
  }, [dispatch, status]);

  const handleDetail = (event, date) => {
    event.preventDefault();
    history.push(`/berita/perbulan/${date}`);
  };

  // const content = [
  //   {
  //     bulan: 'September',
  //     year: 2022,
  //     month: 9,
  //     jumlah: 1,
  //   },
  //   {
  //     bulan: 'August   ',
  //     year: 2022,
  //     month: 8,
  //     jumlah: 4,
  //   },
  //   {
  //     bulan: 'July     ',
  //     year: 2022,
  //     month: 7,
  //     jumlah: 3,
  //   },
  //   {
  //     bulan: 'June     ',
  //     year: 2022,
  //     month: 6,
  //     jumlah: 8,
  //   },
  //   {
  //     bulan: 'May      ',
  //     year: 2022,
  //     month: 5,
  //     jumlah: 3,
  //   },
  //   {
  //     bulan: 'April    ',
  //     year: 2022,
  //     month: 4,
  //     jumlah: 1,
  //   },
  //   {
  //     bulan: 'March    ',
  //     year: 2022,
  //     month: 3,
  //     jumlah: 2,
  //   },
  //   {
  //     bulan: 'December ',
  //     year: 2021,
  //     month: 12,
  //     jumlah: 2,
  //   },
  //   {
  //     bulan: 'October  ',
  //     year: 2021,
  //     month: 10,
  //     jumlah: 1,
  //   },
  //   {
  //     bulan: 'September',
  //     year: 2021,
  //     month: 9,
  //     jumlah: 3,
  //   },
  //   {
  //     bulan: 'August   ',
  //     year: 2021,
  //     month: 8,
  //     jumlah: 9,
  //   },
  //   {
  //     bulan: 'July     ',
  //     year: 2021,
  //     month: 7,
  //     jumlah: 6,
  //   },
  //   {
  //     bulan: 'June     ',
  //     year: 2021,
  //     month: 6,
  //     jumlah: 1,
  //   },
  //   {
  //     bulan: 'March    ',
  //     year: 2021,
  //     month: 3,
  //     jumlah: 2,
  //   },
  //   {
  //     bulan: 'November ',
  //     year: 2020,
  //     month: 11,
  //     jumlah: 2,
  //   },
  //   {
  //     bulan: 'October  ',
  //     year: 2020,
  //     month: 10,
  //     jumlah: 2,
  //   },
  //   {
  //     bulan: 'September',
  //     year: 2020,
  //     month: 9,
  //     jumlah: 2,
  //   },
  //   {
  //     bulan: 'August   ',
  //     year: 2020,
  //     month: 8,
  //     jumlah: 1,
  //   },
  // ];

  const handleOptionSelect = (filter) => (option) => {
    // const newFilterParams = cloneDeep(params);
    // let currentFilter = newFilterParams[filter];
    // if (currentFilter) {
    //   const findPredicate = (f) => f.id === option.id;
    //   const foundFilter = find(currentFilter, findPredicate);
    //   if (foundFilter) {
    //     remove(currentFilter, findPredicate);
    //   } else {
    //     currentFilter.push(option);
    //   }
    // } else {
    //   currentFilter = [option];
    // }
    // newFilterParams[filter] = currentFilter;
    // fetchDataset(newFilterParams, true);
  };

  return (
    <Wrapper>
      <SectionTitle>Berita Lainnya</SectionTitle>
      {Object.entries(records).map(([key, value]) => {
        return (
          <TopikItem key={key}>
            {/* <div className={cx(bem.b() && bem.e('disabled'))}> */}
            <div className={cx(bem.e('header'), 'flex-row-between bg-secondary')}></div>
            <div className={cx(bem.e('title'), 'fw-bold lh-18')}>{key}</div>
            <div className="icon-box right"></div>
            <span>{key}</span>
            {/* </div> */}

            {value.map((item) => {
              // <SectionList
              //   key={`section-${item.filter}`}
              //   {...item}
              //   className="mt-8"
              //   search
              //   onSelectOption={handleOptionSelect(item.filter)}
              //   // isDisabled={isSectionDisabled(item.filter)}
              // />;
            })}
          </TopikItem>
        );
      })}
    </Wrapper>
  );
};

export default BeritaLainnya;
