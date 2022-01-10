import { generateQueryString, safeParse } from 'utils/helper';
import { cookieKeys, getCookieByName } from 'utils/cookie';

class SuccessResponse {
  status;
  message;
  HTTPstatus;
  content;
  constructor(responseObj) {
    let response = responseObj.data || {};
    Object.assign(this, response);
    this.HTTPstatus = responseObj.status;
  }
}

class ErrorResponse {
  status;
  message;
  HTTPstatus;
  content;
  constructor(responseObj) {
    this.status = 'failed';
    this.HTTPstatus = responseObj.status;
    this.content = null;
    switch (responseObj.status) {
      case 400:
        this.message = 'Bad request, invalid parameter';
        break;
      case 401:
        this.message = 'Unauthenticated user';
        break;
      case 403:
        this.message = 'Unauthorized action';
        break;
      case 404:
        this.message = 'Resource not found';
        break;
      default:
        this.message = 'Server Error';
        break;
    }
  }
}

const parseResponse = async (responseObj) => {
  if (responseObj.status !== 200) {
    return new ErrorResponse(responseObj);
  }
  try {
    let responseType = responseObj.headers.get('Content-Type');
    if (responseType && responseType.includes('json')) {
      responseObj.data = await responseObj.json();
    } else {
      let textData = await responseObj.text();
      responseObj.data = textData ? safeParse(textData) : textData;
    }
  } catch (err) {}
  return new SuccessResponse(responseObj);
};

export const typeJSON = 'application/json';
export const typePlain = 'text/plain';
export const REQUEST_GET = 'GET';
export const REQUEST_POST = 'POST';
export const REQUEST_PUT = 'PUT';
export const REQUEST_DELETE = 'DELETE';
export const defaultHeaders = () => {
  let headers = {
    Accept: typeJSON,
    'Content-Type': typeJSON,
  };
  let token = getCookieByName(cookieKeys.token);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const request = async (url, method = REQUEST_GET, headers = defaultHeaders(), data = {}) => {
  let requestOptions = {
    method: method,
    headers: headers,
  };

  if (['POST', 'PUT'].includes(method)) {
    requestOptions.body = headers['Content-Type'] === typeJSON ? JSON.stringify(data) : data;
  }
  if (['GET', 'DELETE'].includes(method) && Object.keys(data).length) {
    url += `?${generateQueryString(data)}`;
  }
  return await parseResponse(await fetch(url, requestOptions));
};

export const get = async (url, headers, data) => {
  return request(url, REQUEST_GET, headers, data);
};
export const post = async (url, headers, data) => {
  return request(url, REQUEST_POST, headers, data);
};
export const put = async (url, headers, data) => {
  return request(url, REQUEST_PUT, headers, data);
};
export const deleteRequest = async (url, headers, data) => {
  return request(url, REQUEST_DELETE, headers, data);
};
