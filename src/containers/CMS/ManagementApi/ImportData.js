import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { ReadOnlyInputs, Table } from 'components';

const ImportData = ({
  className,
  sourceAPITableConfig,
  importData,
  dcatTableConfig,
  onGenerate,
  isGenerate,
  dropDownSelectedValue,
  loader,
}) => {
  const onDownload = async () => {
    try {
      window.open(`${importData.outputUrl}?action=download`);
    } catch (e) {}
  };

  return (
    <div className={`my-20 ${className}`}>
      <div>
        <label className="sdp-sub-heading my-15 mb-24">Source API</label>
        <Table {...sourceAPITableConfig} />
      </div>
      <div className="mt-50">
        <div>
          <div>
            <label className="sdp-sub-heading my-15 mb-24">Mapping DCAT</label>
          </div>
          <div className="d-flex">
            <ReadOnlyInputs
              group
              className="bg-white"
              groupClass="mb-16"
              groupProps={{
                md: 6,
                as: Col,
              }}
              label="Nama"
              labelClass="sdp-form-label fw-normal"
              type="text"
              value={importData?.userName}
            />
            <ReadOnlyInputs
              group
              className="bg-white"
              groupClass="mb-16 ml-24"
              groupProps={{
                md: 6,
                as: Col,
              }}
              label="Email"
              labelClass="sdp-form-label fw-normal"
              type="text"
              value={importData?.email}
            />
          </div>
        </div>
        <div className="mt-40">
          <Table {...dcatTableConfig} />
        </div>
      </div>
      {isGenerate && (
        <div className="mt-50">
          <Button variant="success" disabled={dropDownSelectedValue?.length < 2} onClick={onGenerate}>
            {loader.generate && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
            )}
            Generate Output
          </Button>
        </div>
      )}
      {!loader?.generate && importData?.outputUrl && (
        <div className="mt-50">
          <div className="border d-flex justify-content-between br-5 p-10 align-items-center">
            <label className="sdp-sub-heading">Output</label>
            <div className="w-75">
              <ReadOnlyInputs
                group
                groupClass=""
                groupProps={{
                  md: 22,
                  as: Col,
                }}
                rightIconClass="cursor-pointer"
                className=""
                labelClass="sdp-form-label fw-normal"
                type="text"
                value={importData?.outputUrl || ''}
                rightIcon="copy"
              />
            </div>
            <Button className="d-flex" variant="secondary" onClick={onDownload}>
              Download JSON
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportData;
