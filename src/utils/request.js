import { apiUrls as appApiUrls } from './constants';
import { getQueryString, safeParse } from './helper';
import { cookieKeys, getCookieByName } from './cookie';

export const typeJSON = 'application/json';
export const typePlain = 'text/plain';

export const contentPlainHeader = {
  'Content-Type': typePlain,
};

export class ResponseError extends Error {
  constructor(response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * Parses the response data returned by a network request
 *
 * @param  {object} response A response from a network request
 * @param  {string} responseType A type of response that we are expecting from the server
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseResponse(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  try {
    const responseType = response.headers.get('Content-Type');
    if (responseType && responseType.includes('json')) {
      return response.json();
    }
    const textData = await response.text();
    const data = textData ? safeParse(textData) : textData;
    const responseHeaders = {};
    response.headers.forEach(function (value, name) {
      responseHeaders[name] = value;
    });
    return { headers: responseHeaders, data };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error inn parsing response for: ', response.url);
  }
  return null;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(url, { method = 'GET', headers: optionHeaders = {}, data = {} }) {
  const defaultHeaders = {
    Accept: typeJSON,
    'Content-Type': typeJSON,
  };
  const token = getCookieByName(cookieKeys.token);
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  const headers = Object.assign({}, defaultHeaders, optionHeaders);
  const options = { method, headers };

  // Checking if we need to add body or not.
  if (['POST', 'PUT'].includes(method)) {
    options.body = headers['Content-Type'] === typeJSON ? JSON.stringify(data) : data;
  }
  // Checking if we need to add query string or not.
  if (['GET', 'DELETE'].includes(method)) {
    url += `?${getQueryString(data)}`;
  }

  const fetchResponse = await fetch(url, options);
  const response = checkStatus(fetchResponse);
  return parseResponse(response);
}

/**
 * GET: Make a get request to given url.
 * @param url - URL path to make the request to.
 * @param options - Options that are to be sent with the request.
 */
export function get(url, options) {
  return request(url, Object.assign({ method: 'GET' }, options));
}

/**
 * POST: Make a post request to given url.
 * @param url - URL path to make the request to.
 * @param data - Data to be sent with the request
 * @param options - Options that are to be sent with the request.
 */
export function post(url, data, options) {
  return request(url, Object.assign({ method: 'POST', data }, options));
}

/**
 * PUT: Make a put request to given url.
 * @param url - URL path to make the request to.
 * @param data - Data to be sent with the request
 * @param options - Options that are to be sent with the request.
 */
export function put(url, data, options) {
  return request(Object.assign(url, { method: 'PUT', data }, options));
}

/**
 * DELETE: Make a delete request to given url.
 * @param url - URL path to make the request to.
 * @param options - Options that are to be sent with the request.
 */
export function deleteRequest(url, options) {
  return request(url, Object.assign({ method: 'DELETE' }, options));
}

export const apiUrls = appApiUrls;

export const defaultNumberOfRows = 10;

export const paginationParams = {
  start: 0,
  rows: defaultNumberOfRows,
};
