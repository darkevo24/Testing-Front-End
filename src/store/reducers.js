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
import strukturReducer from 'containers/CMS/StrukturOrganisasi/reducer';
import permintaanDataReducer from 'containers/CMS/PermintaanData/reducer';
import permintaanDataDetailReducer from 'containers/CMS/PermintaanDataForm/reducer';
import beritaCmsReducer from 'containers/CMS/BeritaBaru/reducer';
import cmsKomunitasAhliReducer from 'containers/CMS/KomunitasAhli/reducer';
import cmsBimtekPermintaanDataReducer from 'containers/CMS/BimtekPermintaan/reducer';
import cmsBimtekDokumentasiReducer from 'containers/CMS/BimtekDokumentasi/reducer';
import cmsBimtekJadwalReducer from 'containers/CMS/BimtekJadwal/reducer';
import cmsAboutUsReducer from 'containers/CMS/AboutUs/reducer';
import komunitasAhliReducer from 'containers/Komunitas/reducer';
import forumSDIReducer from 'containers/ForumSDI/reducer';
import userPortalBeritaReducer from 'containers/Berita/reducer';
import bimtekSummaryReducer from 'containers/BimTekSummary/reducer';
import bimtekJadwalReducer from 'containers/BimTekJadwal/reducer';
import formulirPendaftaranReducer from 'containers/BimTekForm/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    global: appReducer,
    auth: authReducer,
    beranda: berandaReducer,
    daftar: daftarReducer,
    cms: cmsReducer,
    tentang: tentangReducer,
    cmsTentang: cmsAboutUsReducer,
    perminataan: perminataanReducer,
    struktur: strukturReducer,
    permintaanData: permintaanDataReducer,
    permintaanDataDetail: permintaanDataDetailReducer,
    cmsBerita: beritaCmsReducer,
    cmsKomunitasAhli: cmsKomunitasAhliReducer,
    cmsBimtekPermintaan: cmsBimtekPermintaanDataReducer,
    cmsBimtekDokumentasi: cmsBimtekDokumentasiReducer,
    cmsBimtekJadwal: cmsBimtekJadwalReducer,
    komunitasAhli: komunitasAhliReducer,
    userPortalBerita: userPortalBeritaReducer,
    forumSDI: forumSDIReducer,
    bimtekSummary: bimtekSummaryReducer,
    bimtekJadwal: bimtekJadwalReducer,
    formulirPendaftaran: formulirPendaftaranReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
}
