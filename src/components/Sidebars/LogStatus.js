import React from 'react';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { formatDate } from 'utils/helper';

const bem = bn('log');

export const LogStatus = ({ data }) => (
  <div className={bem.e('section')}>
    <div className={bem.e('title')}>Log Status</div>
    {!data || data.length === 0
      ? 'Tidak ada log'
      : data.map((item, key) => (
          <div key={key} className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <div className={bem.e('date')}>{formatDate(item.createdAt)}</div>
              <div className={bem.e('date-line')}>{}</div>
            </div>
            <div className="d-flex align-items-center">
              <div className={cx(bem.e('status'), item.data?.status.toLowerCase())}>{item.data?.status}</div>
              <div className={bem.e('content')}>{item.remark}</div>
            </div>
          </div>
        ))}
  </div>
);
