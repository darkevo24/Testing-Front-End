import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { Input } from 'components';
import { apiUrls, post, put } from 'utils/request';
import ImportData from './ImportData';
import { getById, getByIDSelector } from './reducer';
import Loader from 'components/Loader';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  sourceApi: yup.string().required('Source API is required'),
});

const CreateManagementAPI = () => {
  const [loader, setLoader] = useState({});
  const [saved, setSaved] = useState(false);
  const [apiError, setAPIError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [responseData, setResponseData] = useState({});
  const [isImport, setIsImport] = useState(false);
  const [mappedRecords, setMappedRecords] = useState([]);
  const [dropDownValues, setDropDownValues] = useState([]);
  const [dcatTableData, setDcatTableData] = useState([]);
  const { id, instansiId } = useParams();
  const { records, error, loading } = useSelector(getByIDSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const [dropDownSelectedValue, setDropDownSelectedValue] = useState([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      sourceApi: '',
    },
  });

  useEffect(() => {
    if (!id) return;
    if (records?.id !== +id) dispatch(getById(instansiId));
    else {
      setDefaultData();
    }
  }, [id]);

  useEffect(() => {
    setDefaultData();
  }, [records]);

  useEffect(() => {
    if (isEmpty(responseData)) return;
    const currentRecord = get(responseData, `dataSource.${currentPage}`, {});
    const mappedRecords_clone = Object.keys(currentRecord).map((key) => ({
      field: key,
      value: !currentRecord[key] ? (
        '---'
      ) : typeof currentRecord[key] === 'object' ? (
        <ReactJson src={currentRecord[key]} collapsed={true} />
      ) : (
        currentRecord[key]
      ),
    }));
    const dropDownValues_clone = mappedRecords.map((elem, index) => ({
      label: elem.field,
      value: index,
    }));
    const dcatTableData_clone = responseData?.dcatproperties?.map((elem, index) => ({
      ...elem,
      index: index + 1,
    }));
    setDropDownValues(dropDownValues_clone);
    setMappedRecords(mappedRecords_clone);
    setDcatTableData(dcatTableData_clone);
  }, [responseData, currentPage]);

  const setDefaultData = () => {
    setResponseData(records);
    const fields = [
      { name: 'title', value: records?.title || '' },
      { name: 'description', value: records?.description || '' },
      { name: 'sourceApi', value: records?.sourceApi || '' },
    ];
    fields.forEach(({ name, value }) => setValue(name, value));
  };

  const sourceApiColumns = [
    {
      Header: 'Field',
      accessor: 'field',
    },
    {
      Header: 'Value',
      accessor: 'value',
    },
  ];
  const sourceAPITableConfig = {
    // variant: 'spaced',
    columns: sourceApiColumns,
    data: mappedRecords || [],
    showSearch: false,
    totalCount: responseData?.dataSource?.length || null,
    pageSize: mappedRecords.length || null,
    manualPagination: true,
    pageCount: responseData?.dataSource?.length || null,
    currentPage,
    onPageIndexChange: (page) => {
      setCurrentPage(page);
    },
  };

  const onDcatDropdownChange = (data) => (value) => {
    const dropDownSelectedValue_clone = [...dropDownSelectedValue];
    dropDownSelectedValue_clone[data.row.index] = value;
    setDropDownSelectedValue(dropDownSelectedValue_clone);
  };

  const dcatColumns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'index',
      },
      {
        Header: 'DCAT Property',
        accessor: 'jsonKey',
      },
      {
        Header: 'Equivalent',
        accessor: 'equivalent',
      },
      {
        Header: 'Source API',
        accessor: 'sourceApiKey',
        Cell: (data) => {
          return (
            <SingleDropDown
              defaultData={dropDownSelectedValue[data.row.index]}
              data={dropDownValues}
              onChange={onDcatDropdownChange(data)}
            />
          );
        },
      },
    ],
    [dropDownSelectedValue, dropDownValues],
  );
  const dcatTableConfig = useMemo(
    () => ({
      columns: dcatColumns,
      data: dcatTableData,
      showSearch: false,
      totalCount: null,
      manualPagination: true,
    }),
    [dcatColumns, dcatTableData],
  );

  const goBack = () => {
    if (id) history.push(`/cms/api-detail/${+id}`);
    else history.push(`/cms/api-baru/${instansiId}`);
  };

  const onImport = async () => {
    setLoader({
      import: true,
    });
    try {
      let params = {
        id: responseData.id,
        title: responseData.title,
        description: responseData.description,
        instansi: {
          id: responseData.instansi.id,
        },
        sourceApi: responseData.sourceApi,
      };
      const res = await post(`${apiUrls.cmsManagementApi}/import`, params);
      setResponseData(res?.data?.content);
      setIsImport(true);
      setSaved(false);
      setLoader({});
    } catch (e) {
      setLoader({});
      setAPIError(e.message);
    }
  };

  const onSubmit = async (data) => {
    setLoader({
      simpan: true,
    });
    try {
      const method = id ? put : post;
      const url = id ? `${apiUrls.cmsManagementApi}/${+id}` : apiUrls.cmsManagementApi;
      let params = {
        title: data.title,
        description: data.description,
        instansi: {
          id: +instansiId,
        },
        sourceApi: data.sourceApi,
      };
      const response = await method(url, params);
      setResponseData(response?.data?.content);
      setSaved(true);
      setLoader({});
    } catch (e) {
      setLoader({});
      setAPIError(e.message);
    }
  };

  const onGenerate = async () => {
    setLoader({
      generate: true,
    });
    const configData = [...dcatTableConfig.data];
    if (!id) {
      dropDownSelectedValue.forEach((elem, index) => {
        configData[index].sourceApiKey = elem.label;
        delete configData[index].index;
      });
    }
    try {
      const response = await post(
        `${apiUrls.cmsManagementApi}/generate-output`,
        { id: responseData?.id, dcatproperties: configData },
        {
          q: { action: 'download' },
        },
      );
      setLoader({});
      setResponseData(response?.data?.content);
    } catch (e) {
      setLoader({});
      setAPIError(e.message);
    }
  };

  if (loading) {
    return <Loader fullscreen />;
  }

  return (
    <div className="sdp-management-api-create-container sdp-cms-api bg-gray-lighter">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-between border-bottom-gray-stroke">
          <div className="d-flex align-items-center">
            <label className="fw-bold fs-24 lh-29 p-32">Buat API Baru</label>
            <Button
              key="Batal"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-13 px-40"
              onClick={goBack}>
              Batal
            </Button>
            <Button key="Simpan" variant="info" type="submit" className="mr-16 br-4 py-13 px-32 border-0">
              {loader.simpan && (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
              )}
              Simpan
            </Button>
          </div>
        </div>
        <div className="p-32">
          <Row className="">
            {apiError || error ? <label className="sdp-error mb-20">{apiError || error}</label> : null}
            <Input
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              label="Judul"
              labelClass="sdp-form-label fw-normal"
              control={control}
              name="title"
              error={errors?.title?.message}
              infoIcon="Judul API yang akan disesuaikan dengan field DCAT."
            />
            <Input
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              label="Deskripsi"
              labelClass="sdp-form-label fw-normal"
              control={control}
              name="description"
              error={errors?.description?.message}
              infoIcon="Deskripsi API, penjelasan mengenai data yang akan diintegrasikan."
            />
            <Input
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              label="Source API"
              labelClass="sdp-form-label fw-normal"
              control={control}
              name="sourceApi"
              error={errors?.sourceApi?.message}
              infoIcon="URL link endpoint json."
            />
          </Row>
        </div>
      </Form>
      <div className="px-32">
        {((!responseData?.dataSource?.length && id) ||
          (responseData?.dataSource?.length && id && saved) ||
          (saved && !isImport)) && (
          <Button variant="success" onClick={onImport}>
            {loader.import && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
            )}
            Import
          </Button>
        )}
        <div className="mb-100">
          {((responseData?.dataSource?.length > 0 && id) || isImport) && (
            <ImportData
              sourceAPITableConfig={sourceAPITableConfig}
              importData={responseData}
              dcatTableConfig={dcatTableConfig}
              onGenerate={onGenerate}
              isGenerate={true}
              className=""
              dropDownSelectedValue={dropDownSelectedValue}
              loader={loader}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateManagementAPI;
