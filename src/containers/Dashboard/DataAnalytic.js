import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllAnalitik } from '../CMS/DashboardManage/reducer';
import Dashboard from 'containers/Dashboard';

const DataAnalytic = () => {
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

  return <Dashboard {...options} />;
};

export default DataAnalytic;
