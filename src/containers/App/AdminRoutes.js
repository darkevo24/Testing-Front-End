import React, { lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminLayout from 'layouts/AdminLayout';

const LoginPage = lazy(() => import('containers/Login'));
const DafterPage = lazy(() => import('containers/Dafter'));

function AdminRoutes(props) {
  return (
    <AdminLayout>
      <Switch>
        <Route exact path="/admin/login" component={LoginPage} />
        <Route exact path="/admin/dafter" component={DafterPage} />
        <Route exact path="/admin" render={() => <Redirect to="/admin/login" />} />
      </Switch>
    </AdminLayout>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(AdminRoutes));
