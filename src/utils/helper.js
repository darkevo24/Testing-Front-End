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
    console.log(formNode);
    console.log(submitButton);
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
    textArea.value = convertToPlain;
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
  return pick(data, ['q', 'fq', 'facet.field', 'facet.limit', 'start', 'rows', 'sort']);
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

export const formatDate = (date) => {
  if (!date) {
    return '';
  }
  const currDate = new Date(date);
  let monthList = [
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

export const getStatusClass = (status) => {
  switch (status) {
    case 'draft':
      return {
        divBG: 'bg-gray',
        textColor: 'sdp-text-disable',
        text: 'Dibuat',
        divText: 'Draft',
      };
    case 'menunggu_persetujuan':
      return {
        divBG: 'bg-orange-light',
        textColor: 'sdp-text-orange-dark',
        text: 'Waiting for approval',
        divText: '',
      };
    case 'diproses':
      return {
        divBG: 'bg-orange-light',
        textColor: 'sdp-text-orange-dark',
        text: 'Diprosses',
        divText: 'Permintaan sedang Diproses',
      };
    case 'dibatalkan':
    case 'ditolak':
      return {
        divBG: 'bg-red-light',
        textColor: 'sdp-text-red',
        text: 'Ditolak',
        divText: 'Ditolak',
      };
    case 'terkirim':
      return {
        divBG: 'bg-purple-light',
        textColor: 'sdp-text-purple',
        text: 'Terkirim',
        divText: 'Terkirim',
      };
    case 'selesai':
      return {
        divBG: 'bg-green-light',
        textColor: 'sdp-text-green-light',
        text: 'Disetujui',
        divText: 'Selesai',
      };
    default:
      return {};
  }
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
      set(payload, field, get(payload, `${field}.value`));
    });
  }
  if (fieldsMap.toArray && isArray(fieldsMap.toArray)) {
    map(fieldsMap.toArray, (field) => {
      set(payload, field, [get(payload, field)]);
    });
  }
  if (fieldsMap.dates && isArray(fieldsMap.dates)) {
    map(fieldsMap.dates, (field) => {
      set(payload, field, moment(new Date(get(payload, field)), 'YYYY-MM-DD'));
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
