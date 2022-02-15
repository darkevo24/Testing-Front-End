import { combineReducers } from 'redux';

import aboutUsReducer from './AboutUs/reducer';
import aboutUsDetailReducer from './AboutUsEdit/reducer';
import beritaReducer from './Berita/reducer';
import forumSdiReducer from './ForumSDI/reducer';
import bertaLayoutReducer from './BeritaLayout/reducer';
import apiManagementReducer from './ManagementApi/reducer';

export default combineReducers({
  aboutUs: aboutUsReducer,
  aboutUsDetail: aboutUsDetailReducer,
  berita: beritaReducer,
  cmsForumSdi: forumSdiReducer,
  bertaLayout: bertaLayoutReducer,
  apiManagement: apiManagementReducer,
});
