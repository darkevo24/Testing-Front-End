import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout, { PublicRoute, PrivateRoute } from 'layouts/AdminLayout';
import lazily from 'utils/lazily';

const { AdminLogin } = lazily(() => import('containers/Login'));
const DafterPage = lazy(() => import('containers/Dafter'));
const DataVariablePage = lazy(() => import('containers/DataVariable'));
const KebijakanPrivasiPage = lazy(() => import('containers/KebijakanPrivasi'));
const BeritaPage = lazy(() => import('containers/CMS/Berita'));
const BeritaBaruPage = lazy(() => import('containers/CMS/BeritaBaru'));
const BeritaDetailPage = lazy(() => import('containers/CMS/BeritaDetail'));

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <PublicRoute exact path="/admin/login" component={AdminLogin} />
        <PrivateRoute exact path="/admin/berita" component={BeritaPage} />
        <PrivateRoute exact path="/admin/berita-baru" component={BeritaBaruPage} />
        <PrivateRoute exact path="/admin/berita-detail/:id" component={BeritaDetailPage} />
        <PrivateRoute exact path="/admin/dafter" component={DafterPage} />
        <PrivateRoute exact path="/admin/data-variable" component={DataVariablePage} />
        <PrivateRoute exact path="/admin/policy" component={KebijakanPrivasiPage} />
        <Route exact path="/admin" render={() => <Redirect to="/admin/login" />} />
      </Switch>
    </AdminLayout>
  );
}

export default AdminRoutes;
