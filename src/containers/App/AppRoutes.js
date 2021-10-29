import React, { lazy } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppLayout } from 'layouts/AppLayout';

const BerandaPage = lazy(() => import('containers/Beranda'));
const TopicDetailPage = lazy(() => import('containers/Beranda/TopicDetails'));
const ForumPage = lazy(() => import('containers/Forum'));

function AppRoutes(props) {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/home" component={BerandaPage} />
        <Route exact path="/topic-detail" component={TopicDetailPage} />
        <Route exact path="/forum" component={ForumPage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </Switch>
    </AppLayout>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(AppRoutes));
