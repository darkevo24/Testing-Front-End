import { getApiEndpoint } from 'utils/constants';
import { HTTP } from 'services/core';

const API_URL = {
  get_published_tentang: () => getApiEndpoint('public/tentang'),
  tentang: (id, action) => {
    let url = getApiEndpoint('cms/v1/tentang');
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

export const getPublicTentang = () => {
  return HTTP.get(API_URL.get_published_tentang())
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.content;
    })
    .then((content) => {
      return content.map((item) => {
        return {
          title: item.judul,
          content: item.isi,
          video_url: item.video,
        };
      });
    })
    .catch((err) => {
      // console.log(err);
      return Promise.resolve([]);
    });
};

export const createTentang = (title, content, videourl) => {
  let params = {
    judul: title,
    isi: content,
    video: videourl,
  };
  return HTTP.post(API_URL.tentang(), HTTP.defaultHeaders(), params)
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.content;
    })
    .then((content) => {
      return {
        id: content.id,
        title: content.judul,
        content: content.isi,
        video_url: content.video,
        status: content.status,
      };
    })
    .catch((err) => {
      // console.log(err);
      return null;
    });
};

export const filterTentang = (page = 1, size = 10, sort = 'id') => {
  let params = {
    page: page - 1,
    rows: size,
    sortBy: sort,
  };
  return HTTP.get(API_URL.tentang(), HTTP.defaultHeaders(), params)
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
            title: item.judul,
            content: item.isi,
            video_url: item.video,
            type: 'About Us',
            status: item.status,
            created_at: new Date(item.createdAt),
            updated_at: new Date(item.updatedAt),
            creator: item.user.name,
          };
        }),
      };
    });
};

export const getTentang = (id) => {
  return HTTP.get(API_URL.tentang(id), HTTP.defaultHeaders())
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

export const getTentangLogs = (id) => {
  return HTTP.get(API_URL.tentang(id, 'logs'), HTTP.defaultHeaders())
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

export const doTentangWorkflow = (id, action) => {
  let accepted_action = ['kirim', 'batal', 'setujui', 'publish', 'unpublish', 'arsipkan', 'tolak'];
  if (!action || accepted_action.indexOf(action.trim().toLowerCase()) < 0) {
    return Promise.resolve({ success: false, message: 'Action not accepted!' });
  }
  return HTTP.post(API_URL.tentang(id, action), HTTP.defaultHeaders())
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.message;
    })
    .then((message) => {
      return Promise.resolve({ success: true, message: message });
    })
    .catch((err) => {
      // console.log(err);
      return Promise.resolve({ success: false, message: err.message });
    });
};

export const updateTentang = (id, title, content, videourl) => {
  let params = {
    judul: title,
    isi: content,
    video: videourl,
  };
  return HTTP.put(API_URL.tentang(id), HTTP.defaultHeaders(), params)
    .then((res) => {
      if (!res || res.status !== 'success') {
        return Promise.reject(res);
      }
      return res.content;
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
