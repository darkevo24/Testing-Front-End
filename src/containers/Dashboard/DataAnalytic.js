import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAnalitik } from '../CMS/DashboardManage/reducer';
import Dashboard from 'containers/Dashboard';
import { getAnalyticsUrl } from 'utils/constants';

const DataAnalytic = () => {
  // const getLink = (id) => `${getAnalyticsUrl('superset/dashboard')}/${id}`;
  const dispatch = useDispatch();
  const [options, setOptions] = useState({ options: [], title: 'Data Analytic' });

  const fetchData = () => {
    dispatch(getAllAnalitik()).then((res) => {
      let optionArr = [];
      res?.payload?.records
        .filter((el) => el.is_active && el.publish)
        .forEach((el) => {
          optionArr.push({ title: el.title, url: el.url });
        });
      setOptions({ ...options, options: optionArr });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const props = {
  //   options: [
  //     { title: 'Corona Virus Covid-19 Indonesia', url: getLink('37') },
  //     { title: 'Cuaca dan Gempa Bumi', url: getLink('38') },
  //     { title: 'PIHPS Nasional', url: getLink('21') },
  //   ],
  //   title: 'Data Analytic',
  // };

  return <Dashboard {...options} />;
};

export default DataAnalytic;
