import isEmpty from 'lodash/isEmpty';
import { apiUrls as appApiUrls } from './constants';
import { generateQueryString, safeParse } from './helper';
import { cookieKeys, getCookieByName, removeAllCookie } from './cookie';

export const typeJSON = 'application/json';
export const typePlain = 'text/plain';

export const contentPlainHeader = {
  'Content-Type': typePlain,
};

/**
 * Parses the response data returned by a network request
 *
 * @param  {object} response A response from a network request
 * @param  {boolean} download states if request is to download from the server
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseResponse(response, download, fileName) {
  try {
    const responseHeaders = {};
    response.headers.forEach(function (value, name) {
      responseHeaders[name] = value;
    });
    let data = {};
    const responseType = response.headers.get('Content-Type');
    const disposition = response.headers.get('Content-Disposition');
    if (responseType && responseType.includes('json')) {
      data = await response.json();
    } else if (
      (responseType && responseType.includes('application/force-download')) ||
      (disposition && disposition.includes('attachment;')) ||
      download
    ) {
      data = await response.blob();
      if ((disposition && disposition.includes('filename=')) || fileName) {
        const filename = !fileName ? disposition.split('filename=')[1] : fileName;
        const url = window.URL.createObjectURL(data);
        const aNode = document.createElement('a');
        aNode.href = url;
        aNode.download = filename;
        document.body.appendChild(aNode);
        aNode.click();
        aNode.remove();
      }
    } else {
      const textData = await response.text();
      data = textData ? safeParse(textData) : textData;
    }
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
  if ([401].includes(response.status)) {
    removeAllCookie();
    window.location.reload();
  }
  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url,
  { method = 'GET', headers: optionHeaders = {}, data = {}, query = {}, download = false, fileName = null },
) {
  const defaultHeaders = {
    Accept: typeJSON,
    'Content-Type': typeJSON,
  };
  const token = getCookieByName(cookieKeys.token);
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  const headers = Object.assign({}, defaultHeaders, optionHeaders);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 40 * 1000); // Timeout in 20 seconds
  const options = { method, headers, credentials: 'include', signal: controller.signal };

  // Checking if body has data.
  if (!isEmpty(data) || data instanceof FormData) {
    options.body = headers['Content-Type'] === typeJSON ? JSON.stringify(data) : data;
  }
  // Checking if we need to add query string or not.
  if (!isEmpty(query)) {
    url += `?${generateQueryString(query)}`;
  }

  if (!headers['Content-Type']) {
    delete headers['Content-Type'];
  }

  let fetchResponse;
  try {
    fetchResponse = await fetch(url, options);
    clearTimeout(timeout);
  } catch (error) {
    fetchResponse = error.response;
  }
  const response = checkStatus(fetchResponse);
  const parsedResponse = await parseResponse(response, download, fileName);
  if (response.ok) {
    return parsedResponse;
  }
  throw parsedResponse;
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
  return request(url, Object.assign({ method: 'PUT', data }, options));
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

export const apiPaginationParams = {
  page: 0,
  size: defaultNumberOfRows,
};
