/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import appReducer from 'containers/App/reducer';
import authReducer from 'containers/Login/reducer';
import berandaReducer from 'containers/Beranda/reducer';
import daftarReducer from 'containers/Daftar/reducer';
import cmsReducer from 'containers/CMS/reducer';
import tentangReducer from 'containers/TentangSDI/reducer';
import perminataanReducer from 'containers/Perminataan/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers) {
  const rootReducer = combineReducers({
    global: appReducer,
    auth: authReducer,
    beranda: berandaReducer,
    daftar: daftarReducer,
    cms: cmsReducer,
    tentang: tentangReducer,
    perminataan: perminataanReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
