import { combineReducers } from 'redux';

import aboutUsReducer from './AboutUs/reducer';
import aboutUsDetailReducer from './AboutUsEdit/reducer';

export default combineReducers({
  aboutUs: aboutUsReducer,
  aboutUsDetail: aboutUsDetailReducer,
});
