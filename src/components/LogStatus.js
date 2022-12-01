import React from 'react';
import Chip from 'components/Chip';
import { formatDate } from 'utils/helper';

const LogStatus = (props) => {
  const data = props;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="mt-3 mb-10 w-100" style={{ fontWeight: '600', fontSize: '14px' }}>
          {formatDate(data.createdAt)}
        </div>
        <hr className="w-100 border-1" style={{ color: '#E1E5ED' }} />
      </div>

      <div style={{ display: 'flex' }}>
        {data.status === 'ACTIVE' ? (
          <Chip className="active">{data.data.status}</Chip>
        ) : (
          <Chip className="inactive">Inactive</Chip>
        )}
        <span style={{ color: '#515154' }}>{data.remark}</span>
      </div>
    </div>
    // <div>
    //   <div style={{ display: 'flex', alignItems: 'center' }}>
    //     <div className="mt-3 mb-10 w-100" style={{ fontWeight: '600', fontSize: '14px' }}>
    //       {formatDate(data.createdAt)}
    //     </div>
    //     <hr className="w-100 border-1" style={{ color: '#E1E5ED' }} />
    //   </div>

    //   <div style={{ display: 'flex' }}>
    //     {data.status === 'ACTIVE' ? (
    //       <Chip className="active">{data.data.status}</Chip>
    //     ) : (
    //       <Chip className="inactive">Inactive</Chip>
    //     )}
    //     <span style={{ color: '#515154' }}>{data.remark}</span>
    //   </div>
    // </div>
  );
};

export default LogStatus;
