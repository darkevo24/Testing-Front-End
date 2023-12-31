import { getApiEndpoint } from 'utils/constants';
import { HTTP } from 'services/core';
import { apiUrls, get, put } from 'utils/request';

const API_URL = {
  berita: (id, action) => {
    let url = getApiEndpoint('cms/v1/berita');
    if (!id) {
      return url;
    }
    url += `/${id}`;
    if (!action) {
      return url;
    }
    url += `/${action}`;
    return url;
  },
};

export const createBerita = (thumbnail, category, tagline, title, content, reference) => {
  let params = {
    judul: title,
    content: content,
    issn: reference,
    tagline: tagline,
    kategori: category,
    status: 0,
  };
  return HTTP.post(API_URL.berita(), HTTP.defaultHeaders(), params)
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.content;
    })
    .then((content) => {
      return {
        id: content.id,
      };
    })
    .catch((err) => {
      return null;
    });
};

export const filterBerita = (page = 1, size = 10, sort = 'id') => {
  let params = {
    page: page - 1,
    rows: size,
    sortBy: sort,
  };
  return HTTP.get(API_URL.berita(), HTTP.defaultHeaders(), params)
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.content;
    })
    .then((content) => {
      return {
        page: content.currentPage,
        size: size,
        total_page: content.totalPages,
        total_records: content.totalItems,
        sort: sort,
        records: content.data.map((item) => {
          return {
            id: item.id,
          };
        }),
      };
    });
};

export const getBerita = (id) => {
  return HTTP.get(API_URL.berita(id), HTTP.defaultHeaders())
    .then((res) => {
      if (!res || res.status === 'failed') {
        return Promise.reject(res);
      }
      return res;
    })
    .then((content) => {
      return {
        id: content.id,
        title: content.judul,
        content: content.isi,
        video_url: content.video,
        status: content.status,
      };
    });
};

export const getBeritaLogs = (id) => {
  return HTTP.get(API_URL.berita(id, 'logs'), HTTP.defaultHeaders())
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.content;
    })
    .then((content) => {
      return content.map((item) => {
        return {
          action: item.remark,
          action_at: new Date(item.createdAt),
          status: item.data.status,
        };
      });
    });
};

export const doBeritaWorkflow = (id, action) => {
  let accepted_action = ['kirim', 'batal', 'setujui', 'publish', 'unpublish', 'arsipkan', 'tolak'];
  if (!action || accepted_action.indexOf(action.trim().toLowerCase()) < 0) {
    return Promise.resolve({ success: false, message: 'Action not accepted!' });
  }
  return HTTP.post(API_URL.berita(id, action), HTTP.defaultHeaders())
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.message;
    })
    .then((message) => {
      return Promise.resolve({ success: false, message: message });
    })
    .catch((err) => {
      return Promise.resolve({ success: false, message: err.message });
    });
};

export const getBertaLayout = async () => {
  const result = await get(apiUrls.beritaLayout);
  return result?.data?.content || null;
};

export const updateBertaLayout = async (code, content) => {
  const data = {
    content,
  };
  const result = await put(apiUrls.updateKiriLayout, data);
  if (result?.data?.content) {
    const { content } = result.data;
    const contentData = content?.content;
    return {
      code: code,
      content: {
        kiri: contentData?.kiri || '',
        kanan: content.content?.kanan || '',
        inactive: contentData?.inactive || '',
      },
    };
  }
  return null;
};
