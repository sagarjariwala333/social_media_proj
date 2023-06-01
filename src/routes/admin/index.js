import React, { Suspense,lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from './dashboard';
import withAdminLayout from '../../layout/withAdminLayout';

const Team = lazy(() => import('../../container/team'));
const Wallet = lazy(() => import('../../container/wallet'));
const DirectReferal = lazy(() => import('../../container/directreferal'));
const Campaign = lazy(() => import('../../container/campaign'));
const Profile = lazy(() => import('../../container/systemsetting/profile'));

const Admin = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/team`} component={Team} />
        <Route path={`${path}/wallet`} component={Wallet} />
        <Route path={`${path}/campaign`} component={Campaign} />
        <Route path={`${path}/directreferal`} component={DirectReferal} />
        <Route path={`${path}/profile`} component={Profile} />

      </Suspense>
    </Switch>
  );
}

export default withAdminLayout(Admin);
