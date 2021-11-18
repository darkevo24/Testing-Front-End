/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './history';
import appReducer from 'containers/App/reducer';
import authReducer from 'containers/Login/reducer';
import berandaReducer from 'containers/Beranda/reducer';
import permintaanDataReducer from 'containers/CMS/PermintaanData/reducer';
import permintaanDataDetailReducer from 'containers/CMS/PermintaanDataForm/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers) {
  const rootReducer = combineReducers({
    global: appReducer,
    auth: authReducer,
    beranda: berandaReducer,
    permintaanData: permintaanDataReducer,
    permintaanDataDetail: permintaanDataDetailReducer,

    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
