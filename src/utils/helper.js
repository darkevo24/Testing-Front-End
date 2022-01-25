import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import map from 'lodash/map';
import set from 'lodash/set';
import pick from 'lodash/pick';
import moment from 'moment';
import { katalogUrl } from './constants';

export const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const safeStringify = (value) => {
  try {
    if (['string', 'number'].includes(typeof value)) {
      return `${value}`;
    }
    return JSON.stringify(value);
  } catch (error) {
    return null;
  }
};

export const generateQueryString = (params) => {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
};

export const submitForm = (id) => () => {
  const formNode = document.getElementById(id);
  if (formNode) {
    const submitButton = formNode.querySelector('button[type="submit"]');
    submitButton.click();
  }
};

export const convertToPlain = (html) => {
  // Create a new div element
  var tempDivElement = document.createElement('div');
  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || '';
};

export const copyToClipboard = (text) => {
  const textToCopy = convertToPlain(text);
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    const textArea = document.createElement('textarea');
    textArea.value = convertToPlain(text);
    // make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
};

export const mapParamsToJsonString = (data = {}, keys = []) => {
  keys.forEach((key) => {
    data[key] = safeStringify(data[key]);
  });
  return data;
};

export const mapParamsToOrString = (data = {}, keys = [], dataAccessor = 'id') => {
  keys.forEach((key) => {
    const currentData = data[key];
    if (!currentData || !isArray(currentData)) {
      return;
    }
    const keyData = map(currentData, (value) => {
      if (isObject(value)) {
        return value[dataAccessor];
      }
      return value;
    });
    if (keyData.length) {
      data[key] = `${key}:${keyData.join(' OR ')}`;
    }
  });
  return data;
};

export const mapOrStringsToFq = (data, keys = []) => {
  const dataKeys = map(keys, (key) => data[key]);
  const dataKeysWithValue = dataKeys.filter((orString) => orString && isString(orString));
  const fq = dataKeysWithValue.join(', ');
  if (fq) {
    data.fq = fq;
  }
  return data;
};

export const pickValidDatasetPaginationParams = (data) => {
  return pick(data, [
    'q',
    'fq',
    'facet.field',
    'facet.limit',
    'start',
    'rows',
    'sort',
    'ext_bbox',
    'ext_prev_extent',
    'include_private',
  ]);
};

/**
 * Returns parsed query string into JSON object.
 */
export const parseQueryString = () => {
  const search = window.location.search.substring(1);
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};

export const monthList = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const formatDate = (date) => {
  if (!date) {
    return '';
  }
  const currDate = new Date(date);

  // format: dd Mon yyyy
  return [currDate.getDate(), monthList[currDate.getMonth()], currDate.getFullYear()].join(' ');
};

export const prefixID = (id, text) => {
  if (id < 10) return text + `0000${id}`;
  else if (id < 100) return text + `000${id}`;
  else if (id < 1000) return text + `00${id}`;
  else if (id < 10000) return text + `0${id}`;
  else return text + `${id}`;
};

const grayText = {
  divBG: 'bg-gray',
  textColor: 'sdp-text-disable',
};
const orangeText = {
  divBG: 'bg-orange-light',
  textColor: 'sdp-text-orange-dark',
};
const redText = {
  divBG: 'bg-red-light',
  textColor: 'sdp-text-red',
};
const purpleText = {
  divBG: 'bg-purple-light',
  textColor: 'sdp-text-purple',
};
const greenText = {
  divBG: 'bg-green-light',
  textColor: 'sdp-text-green-light',
};
export const getStatusClass = (status) => {
  switch (status) {
    case 0:
    case 1:
    case 'draft':
      return {
        ...grayText,
        text: 'Draft',
        divText: 'Draft',
      };
    case 8:
    case 'diarsipkan': {
      return {
        ...grayText,
        text: 'Diarsipkan',
        divText: 'Diarsipkan',
      };
    }
    case 6:
    case 'tidak_ditayangkan':
      return {
        ...orangeText,
        text: 'Tidak ditayangkan',
        divText: '',
      };
    case 'unpublished':
      return {
        ...orangeText,
        text: 'Unpublished',
        divText: 'Unpublished',
      };
    case 2:
    case 'waiting_approval':
    case 'menunggu_persetujuan':
      return {
        ...orangeText,
        text: 'Waiting for approval',
        divText: '',
      };
    case 'diproses':
      return {
        ...orangeText,
        text: 'Diprosses',
        divText: 'Permintaan sedang Diproses',
      };
    case 'rejected':
      return {
        ...redText,
        text: 'Rejected',
        divText: 'Rejected',
      };
    case 'dibatalkan':
      return {
        ...redText,
        text: 'Dibatalkan',
        divText: 'Dibatalkan',
      };
    case 4:
    case 'ditolak':
      return {
        ...redText,
        text: 'Ditolak',
        divText: 'Ditolak',
      };
    case 'deleted':
      return {
        ...redText,
        text: 'Dihapus',
        divText: 'Dihapus',
      };
    case 'terkirim':
      return {
        ...purpleText,
        text: 'Terkirim',
        divText: 'Terkirim',
      };
    case 'approved':
      return {
        ...greenText,
        text: 'Approved',
        divText: 'Approved',
      };
    case 'published':
      return {
        ...greenText,
        text: 'Published',
        divText: 'Published',
      };
    case 3:
    case 'disetujui':
      return {
        ...greenText,
        text: 'Disetujui',
        divText: 'Disetujui',
      };
    case 5:
    case 'ditayangkan':
      return {
        ...greenText,
        text: 'Ditayangkan',
        divText: 'Ditayangkan',
      };
    case 'selesai':
      return {
        ...greenText,
        text: 'Selesai',
        divText: 'Selesai',
      };
    case 7:
    case 'dihapus':
      return {
        ...redText,
        text: 'Dihapus',
        divText: 'Dihapus',
      };
    case 'waiting_request_approval':
      return {
        ...grayText,
        text: 'Waiting Request Approval',
        divText: 'Waiting Request Approval',
      };
    default:
      return {};
  }
};

export const dateTransform = (_, originalValue) => {
  return moment(originalValue, 'DD/MM/YYY').toDate();
};

export const findOption = (options, value) => {
  if (isArray(value)) {
    return value.map((nestedItem) => findOption(options, nestedItem));
  }
  return options.find((option) => option.value === value);
};

const emptyOption = { label: '-', value: '' };

export const emptyOptionPad = (options) => {
  if (isArray(options)) {
    return [emptyOption, ...options];
  }
  return [emptyOption, { label: options, value: options }];
};

export const getDatasetUrl = (name) => `${katalogUrl}/dataset/${name}`;

export const arrayToOptionsMapper = (array, mapper, indexValue) => {
  if (!mapper || !isFunction(mapper)) {
    mapper = (label, value) => ({
      label,
      value: indexValue ? value : label,
    });
  }
  return map(array || [], mapper);
};

export const dataToOptionsMapper = (data, mapper) => {
  if (data.result) {
    return arrayToOptionsMapper(data.result, mapper);
  }
  return [];
};

export const dataOptionsMapperCurry = (mapper) => (data) => dataToOptionsMapper(data, mapper);

export const idNameOptionsMapper = (data) => ({
  value: data.id,
  label: data.nama,
});

export const idKeteranganOptionsMapper = (data) => ({
  value: data.id,
  label: data.keterangan,
});

export const prepareFormPayload = (data, fieldsMap) => {
  const payload = cloneDeep(data);
  if (fieldsMap.dropdowns && isArray(fieldsMap.dropdowns)) {
    map(fieldsMap.dropdowns, (field) => {
      const fieldValue = get(payload, field);
      if (!!fieldValue) {
        const finalValue = isArray(fieldValue) ? map(fieldValue, 'value') : get(fieldValue, 'value');
        set(payload, field, finalValue);
      }
    });
  }
  if (fieldsMap.toArray && isArray(fieldsMap.toArray)) {
    map(fieldsMap.toArray, (field) => {
      const fieldValue = get(payload, field);
      if (!!fieldValue) {
        set(payload, field, [fieldValue]);
      }
    });
  }
  if (fieldsMap.dates && isArray(fieldsMap.dates)) {
    map(fieldsMap.dates, (field) => {
      const fieldValue = get(payload, field);
      if (!!fieldValue) {
        set(payload, field, moment(new Date(fieldValue)).format('YYYY-MM-DD'));
      }
    });
  }
  return payload;
};

export const incrementPageParams = (params) => {
  return {
    ...params,
    page: params.page + 1,
  };
};

export const mapFormatToColor = (type) => {
  switch (type.toLowerCase()) {
    case 'csv':
      return 'sdp-text-purple-light';
    case 'json':
      return 'sdp-text-blue-extra-dark';
    case 'wms':
      return 'sdp-text-green-pistal';
    case 'xml':
      return 'sdp-text-red-extra-dark';
    case 'xls':
    case 'xlsx':
      return 'sdp-text-green-dark';
    case 'geo':
    case 'geojson':
      return 'sdp-text-green-gold';
    default:
      return 'sdp-text-disable';
  }
};

export const fileTypes = {
  excel: {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
    extension: 'xslx',
  },
};

export const createFileAndDownload = (data, fileType = fileTypes.excel, filename) => {
  const extension = fileType.extension;
  const fullFilename = `${filename}.${extension}`;
  const blob = new Blob([data], { type: fileType.type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, fullFilename);
  } else {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
};

export const convertTitleToSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[-]+/g, '-')
    .replace(/[^\w-]+/g, '');
};

export const splitByLastChar = (src, char) => {
  const lastIndex = src.lastIndexOf(char);
  return src.substr(0, lastIndex);
};

export const getMapFillColor = (d) => {
  return d > 1000
    ? '#800026'
    : d > 500
    ? '#BD0026'
    : d > 200
    ? '#E31A1C'
    : d > 100
    ? '#FC4E2A'
    : d > 50
    ? '#FD8D3C'
    : d > 20
    ? '#FEB24C'
    : d > 10
    ? '#FED976'
    : '#E31A1C';
};
