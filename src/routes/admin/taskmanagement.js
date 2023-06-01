import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Taskmanagement = lazy(() => import('../../container/taskmanagement'));

function TaskmanagementRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Taskmanagement} />
      <Route path={`${path}/social`} component={Dashboard} />
    </Switch>
  );
}

export default TaskmanagementRoutes;
