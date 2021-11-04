import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Privasi } from './constant';

const LIST = [
  { key: 'kebijakan_privasi', value: 'Kebijakan Privasi', text: Privasi },
  { key: 'syarat_ketentuan', value: 'Syarat & Ketentuan', text: Privasi },
];
const KebijakanPrivasi = () => {
  const [selectedTab, setSelectedTab] = useState(LIST[0]);
  return (
    <div className="sdp-topic-detail-wrapper">
      <Row className="mx-200 mt-48">
        <Col xs={3}>
          <div className="sdp-item-wrapper mt-32 mb-32 pr-32">
            {LIST.map((item) => (
              <div
                className={cx('menu-item pl-16 pt-12 pb-12', {
                  'bg-gray br-4': item.key === selectedTab.key,
                })}
                onClick={() => setSelectedTab(item)}>
                {item.value}
              </div>
            ))}
          </div>
        </Col>
        <Col>
          <div className="mt-32 mb-32 pr-32">
            <label className="fw-bold fs-32 lh-38">{selectedTab.value}</label>
            {selectedTab.text}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default KebijakanPrivasi;
