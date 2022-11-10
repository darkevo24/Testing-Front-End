import React, { lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from 'components/Loader';
import { AppLayout, PrivateRoute, PublicRoute } from 'layouts';
import lazily from 'utils/lazily';
import { Roles } from 'containers/App/config';

const { Login, TermAndCondition } = lazily(() => import('containers/Login'));
const BerandaPage = lazy(() => import('containers/Beranda'));
const TopicDetailPage = lazy(() => import('containers/Beranda/TopicDetails'));
const DataSetPage = lazy(() => import('containers/Beranda/DataSet'));
const { Perminataan } = lazily(() => import('containers/Perminataan'));
const { PerminataanDetail } = lazily(() => import('containers/Perminataan/detail'));
const PerminataanForumPage = lazy(() => import('containers/Perminataan/Forum'));
const { ForumSDI } = lazily(() => import('containers/ForumSDI'));
const { ForumSDIDetail } = lazily(() => import('containers/ForumSDI/ForumSDIDetail'));
const { ForumSDIIframe } = lazily(() => import('containers/ForumSDI/ForumSDIIframe'));
const BimTekSummaryPage = lazy(() => import('containers/BimTekSummary'));
const BimTekFormPage = lazy(() => import('containers/BimTekForm'));
const BimTekJadwalPage = lazy(() => import('containers/BimTekJadwal'));
const BimTekMateriPage = lazy(() => import('containers/BimTekMateri'));
const BimTekPermintaanPage = lazy(() => import('containers/BimtekPermintaan'));
const BimTekPermintaanDetailPage = lazy(() => import('containers/BimtekPermintaan/permintaanDetail'));
const BimTekKotaPage = lazy(() => import('containers/BimTekKota'));
const BimTekDokumentasiPage = lazy(() => import('containers/BimTekDokumentasi'));
const TentangPage = lazy(() => import('containers/TentangSDI'));
const KomunitasPage = lazy(() => import('containers/Komunitas'));
const BeritaPage = lazy(() => import('containers/Berita'));
const BeritaDetailPage = lazy(() => import('containers/Berita/BeritaUtamaDetail'));
const BeritaPreviewPage = lazy(() => import('containers/Berita/Preview'));
const BeritaPerBulan = lazy(() => import('containers/Berita/BeritaPerBulan'));
const BeritaPopular = lazy(() => import('containers/Berita/BeritaPopular'));
const BeritaByTopic = lazy(() => import('containers/Berita/BeritaByTopic'));
const KesiapanSDI = lazy(() => import('containers/Dashboard/KesiapanSDI'));
const DashboardEksekutif = lazy(() => import('containers/Dashboard/DashboardEksekutif'));
const DashboardSaya = lazy(() => import('containers/Dashboard/DashboardSaya'));
const DataAnalytic = lazy(() => import('containers/Dashboard/DataAnalytic'));
const DaftarPage = lazy(() => import('containers/Daftar'));
const DataVariablePage = lazy(() => import('containers/DataVariable'));
const DaftarMenjadiAhli = lazy(() => import('containers/DaftarMenjadiAhli'));
const ManagementApiPage = lazy(() => import('containers/ManagementApi'));
const ManagementApiAddPage = lazy(() => import('containers/ManagementApi/Form'));
const ManagementApiDetailPage = lazy(() => import('containers/ManagementApi/DetailApi'));
const ManagementApiUpdatePage = lazy(() => import('containers/ManagementApi/UpdateApi'));
const ChangePasswordLogin = lazy(() => import('containers/ChangePasswordLogin'));
const ChangePasswordUser = lazy(() => import('containers/ChangePasswordUser'));
const ForgotPassword = lazy(() => import('containers/ForgotPassword'));
const KebijakanPrivasiPage = lazy(() => import('containers/KebijakanPrivasi'));
const MetadataRegistryPage = lazy(() => import('containers/MetadataRegistry'));
const Glosarium = lazy(() => import('containers/Glosarium'));
const RegistrasiHakAkses = lazy(() => import('containers/RegistrasiHakAkses'));
const SDIWiki = lazy(() => import('containers/SDIWiki'));
const ApprovalBudget = lazy(() => import('containers/ApprovalBudget'));
const FormFeedback = lazy(() => import('containers/FormFeedback'));

function AppRoutes(props) {
  return (
    <Switch>
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
      <PublicRoute exact path="/change-password" component={ChangePasswordLogin} />
      <PublicRoute exact path="/term-and-condition" component={TermAndCondition} />
      <PublicRoute exact path="/registrasi-hak-akses" component={RegistrasiHakAkses} />
      <AppLayout>
        <Suspense fallback={<Loader fullscreen />}>
          <Switch>
            <Route exact path="/policy" component={KebijakanPrivasiPage} />
            <Route exact path="/home" component={BerandaPage} />
            <Route exact path="/topic-detail" component={TopicDetailPage} />
            <Route exact path="/berita" component={BeritaPage} />
            <Route path="/berita/perbulan/:date" component={BeritaPerBulan} />
            <Route exact path="/berita/preview" component={BeritaPreviewPage} />
            <Route exact path="/berita-populer" component={BeritaPopular} />
            <Route exact path="/berita-topik/:id" component={BeritaByTopic} />
            <Route exact path="/berita/:id/:slug?" component={BeritaDetailPage} />
            <Route exact path="/tentang" component={TentangPage} />
            <Route exact path="/daftar-menjadi-ahli" component={DaftarMenjadiAhli} />
            <Route exact path="/glosarium" component={Glosarium} />
            {/* <Route exact path="/registrasi-hak-akses" component={RegistrasiHakAkses} /> */}
            <Route exact path="/sdi-wiki" component={SDIWiki} />
            <Route exact path="/permintaan-budget" component={ApprovalBudget} />
            <Route exact path="/form-feedback" component={FormFeedback} />
            {/*  <Route exact path="/api" component={ManagementApiPage} />
            <Route exact path="/api/edit/:id" component={ManagementApiUpdatePage} />
            <Route exact path="/api-detail/:id" component={ManagementApiDetailPage} />
            <Route exact path="/api/form" component={ManagementApiAddPage} />
 */}
            <PrivateRoute
              exact
              path="/permintaan-data-detail/:id"
              component={PerminataanDetail}
              permissions={[Roles.MEMBER]}
            />
            <PrivateRoute exact path="/permintaan-data" component={Perminataan} permissions={[Roles.MEMBER]} />
            <PrivateRoute
              exact
              path="/forum-sdi/:id"
              component={ForumSDIDetail}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.EKSEKUTIF,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/forum-sdi"
              component={ForumSDIIframe}
              // component={ForumSDI}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.EKSEKUTIF,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/forum"
              component={PerminataanForumPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.EKSEKUTIF,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/change-user-password"
              component={ChangePasswordUser}
              permissions={[
                Roles.MEMBER,
                Roles.EKSEKUTIF,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
                Roles.ADMIN,
                Roles.REGISTERED_USER,
                Roles.PEMBINA_DATA,
                Roles.PIC_SDGS,
                Roles.PIC_SDGS,
                Roles.SUPERADMIN,
              ]}
            />
            <PrivateRoute
              exact
              path="/dataset"
              component={DataSetPage}
              permissions={[Roles.ADMIN, Roles.EKSEKUTIF, Roles.REGISTERED_USER, Roles.MEMBER, Roles.SEKRETARIANT]}
            />
            <PrivateRoute
              exact
              path="/daftar"
              component={DaftarPage}
              permissions={[Roles.MEMBER, Roles.SEKRETARIANT, Roles.SEKRETARIANT_CREATOR, Roles.SEKRETARIANT_EDITOR]}
            />
            <PrivateRoute
              exact
              path="/daftar/:daftarId/variable"
              component={DataVariablePage}
              permissions={[Roles.MEMBER, Roles.SEKRETARIANT, Roles.SEKRETARIANT_CREATOR, Roles.SEKRETARIANT_EDITOR]}
            />
            <PrivateRoute
              exact
              path="/komunitas-ahli"
              component={KomunitasPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-summary"
              component={BimTekSummaryPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-form"
              component={BimTekFormPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-jadwal"
              component={BimTekJadwalPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-materi"
              component={BimTekMateriPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-permintaan"
              component={BimTekPermintaanPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-permintaan/:id"
              component={BimTekPermintaanDetailPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-kota-pelaksanaan"
              component={BimTekKotaPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/bimtek-dokumentasi"
              component={BimTekDokumentasiPage}
              permissions={[
                Roles.MEMBER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/kesiapan-sdi"
              component={KesiapanSDI}
              permissions={[
                Roles.REGISTERED_USER,
                Roles.MEMBER,
                Roles.EKSEKUTIF,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/dashboard-eksekutif"
              component={DashboardEksekutif}
              permissions={[
                Roles.EKSEKUTIF,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/dashboard-saya"
              component={DashboardSaya}
              permissions={[
                Roles.REGISTERED_USER,
                Roles.CONTENT_CREATOR,
                Roles.CONTENT_EDITOR,
                Roles.SEKRETARIANT,
                Roles.SEKRETARIANT_CREATOR,
                Roles.SEKRETARIANT_EDITOR,
              ]}
            />
            <PrivateRoute
              exact
              path="/dataprioritas"
              component={DataAnalytic}
              permissions={[Roles.ADMIN, Roles.REGISTERED_USER, Roles.MEMBER, Roles.SEKRETARIANT, Roles.EKSEKUTIF]}
            />
            <PrivateRoute
              exact
              path="/sdmx"
              component={MetadataRegistryPage}
              permissions={[Roles.MEMBER, Roles.SEKRETARIANT, Roles.SEKRETARIANT_CREATOR, Roles.SEKRETARIANT_EDITOR]}
            />
          </Switch>
          {/* <Route exact path="/change-password" component={ChangePassword} /> */}
          {/* <Route exact path="/forgot-password" component={ForgotPassword} /> */}
          {/* <Route path="/not-found" component={NotFoundPage} /> */}
        </Suspense>
      </AppLayout>
    </Switch>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(AppRoutes));
