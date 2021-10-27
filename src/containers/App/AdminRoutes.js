import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout, { PublicRoute, PrivateRoute } from 'layouts/AdminLayout';
import lazily from 'utils/lazily';

const { AdminLogin } = lazily(() => import('containers/Login'));
const DafterPage = lazy(() => import('containers/Dafter'));

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <PublicRoute exact path="/admin/login" component={AdminLogin} />
        <PrivateRoute exact path="/admin/dafter" component={DafterPage} />
        <Route exact path="/admin" render={() => <Redirect to="/admin/login" />} />
      </Switch>
    </AdminLayout>
  );
}

export default AdminRoutes;
