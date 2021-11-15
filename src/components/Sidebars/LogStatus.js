import React from 'react';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('log');

export const LogStatus = ({data}) => (
  <div className={bem.e('section')}>
    <div className={bem.e('title')}>Log Status</div>
    {!data ? "" : data.map((item, key) => (
      <div key={key} className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className={bem.e('date')}>{item.date}</div>
          <div className={bem.e('date-line')}></div>
        </div>
        <div className="d-flex">
          <div className={cx(bem.e('status'), item.status.toLowerCase())}>{item.status}</div>
          <div className={bem.e('content')}>{item.content}</div>
        </div>
      </div>
    ))}
  </div>
);
