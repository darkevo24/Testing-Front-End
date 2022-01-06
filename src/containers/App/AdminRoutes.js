import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout, { PublicRoute, PrivateRoute } from 'layouts/AdminLayout';
import lazily from 'utils/lazily';

const { AdminLogin } = lazily(() => import('containers/Login'));
const DaftarPage = lazy(() => import('containers/Daftar'));
const DataVariablePage = lazy(() => import('containers/DataVariable'));

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <PublicRoute exact path="/admin/login" component={AdminLogin} />
        <PrivateRoute exact path="/admin/daftar" component={DaftarPage} />
        <PrivateRoute exact path="/admin/data-variable" component={DataVariablePage} />
        <Route exact path="/admin" render={() => <Redirect to="/admin/login" />} />
      </Switch>
    </AdminLayout>
  );
}

export default AdminRoutes;
