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
import cmsLogActifitiasReducer from 'containers/CMS/LogAktifitas/reducer';
import KonfigurasiEmailReducer from 'containers/CMS/KonfigurasiEmail/reducer';
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
import managemenPenggunaReducer from 'containers/ManagemenPengguna/reducer';
import subscribersReducer from 'containers/CMS/Subscribers/reducer';
import bimtekMateriReducer from 'containers/BimTekMateri/reducer';
import bimtekDokumentasiReducer from 'containers/BimTekDokumentasi/reducer';
import bimtekPermintaanReducer from 'containers/BimtekPermintaan/reducer';
import sosialMediaReducer from 'containers/CMS/MediaSosial/reducer';
import contactUsReducer from 'containers/CMS/ContactUs/reducer';
import dataAnalyticReducer from 'containers/CMS/DashboardManage/reducer';
import cmsInstansiReducer from 'containers/CMS/Instansi/reducer';
import penggunaManagementReducer from 'containers/CMS/PenggunaManagement/reducer';
import penggunaDataDetailReducer from 'containers/CMS/PenggunaManagementDetails/reducer';
import cmsSecurity from 'containers/CMS/Security/reducer';
import portalManagmentApiReducer from 'containers/ManagementApi/reducer';
import konfigurasiPortalReducer from 'containers/CMS/KonfigurasiPortal/reducer';
import chatReducer from 'containers/Chat/reducer';

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
    cmsSecurity: cmsSecurity,
    tentang: tentangReducer,
    portalManagmentApi: portalManagmentApiReducer,
    cmsTentang: cmsAboutUsReducer,
    perminataan: perminataanReducer,
    struktur: strukturReducer,
    permintaanData: permintaanDataReducer,
    permintaanDataDetail: permintaanDataDetailReducer,
    cmsBerita: beritaCmsReducer,
    cmsKomunitasAhli: cmsKomunitasAhliReducer,
    cmsLogActifitias: cmsLogActifitiasReducer,
    cmsKonfigurasiLogEmail: KonfigurasiEmailReducer,
    cmsInstansi: cmsInstansiReducer,
    cmsBimtekPermintaan: cmsBimtekPermintaanDataReducer,
    cmsBimtekDokumentasi: cmsBimtekDokumentasiReducer,
    cmsBimtekJadwal: cmsBimtekJadwalReducer,
    komunitasAhli: komunitasAhliReducer,
    userPortalBerita: userPortalBeritaReducer,
    forumSDI: forumSDIReducer,
    bimtekSummary: bimtekSummaryReducer,
    bimtekJadwal: bimtekJadwalReducer,
    formulirPendaftaran: formulirPendaftaranReducer,
    bimtekMateri: bimtekMateriReducer,
    bimtekDokumentasi: bimtekDokumentasiReducer,
    bimtekPermintaan: bimtekPermintaanReducer,
    sosialMedia: sosialMediaReducer,
    cmsContactUs: contactUsReducer,
    penggunaManagement: penggunaManagementReducer,
    penggunaManagementDetails: penggunaDataDetailReducer,
    router: connectRouter(history),
    cmsDataAnalytic: dataAnalyticReducer,
    konfigurasiPortal: konfigurasiPortalReducer,
    chat: chatReducer,
    managemenPengguna: managemenPenggunaReducer,
    subscribersList: subscribersReducer,
    ...injectedReducers,
  });
}
