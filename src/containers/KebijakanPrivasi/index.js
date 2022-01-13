import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Privasi, Syarat_Ketentuan } from './constant';

const LIST = [
  { key: 'kebijakan_privasi', value: 'Kebijakan Privasi', text: Privasi },
  { key: 'syarat_ketentuan', value: 'Syarat & Ketentuan', text: Syarat_Ketentuan },
];
const KebijakanPrivasi = () => {
  const [selectedTab, setSelectedTab] = useState(LIST[0]);
  return (
    <div className="sdp-topic-detail-wrapper">
      <Row className="mt-48 justify-content-center">
        <Col lg="8">
          <Row>
            <Col lg={3}>
              <div className="sdp-item-wrapper mt-32 mb-32 pr-32">
                {LIST.map((item, index) => (
                  <div
                    className={cx('menu-item pl-16 pt-12 pb-12 cursor-pointer', {
                      'bg-gray br-4': item.key === selectedTab.key,
                    })}
                    key={index}
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
        </Col>
      </Row>
    </div>
  );
};

export default KebijakanPrivasi;
