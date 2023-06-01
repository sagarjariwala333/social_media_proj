import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
// const SystemSetting = lazy(() => import('../../container/systemsetting'));
const Tenant = lazy(() => import('../../container/systemsetting/tenant'));
const Site = lazy(() => import('../../container/systemsetting/site'));
const Department = lazy(() => import('../../container/systemsetting/department'));
const Shift = lazy(() => import('../../container/systemsetting/shift'));
const Designation = lazy(() => import('../../container/systemsetting/designation'));
const Position = lazy(() => import('../../container/systemsetting/position'));
const Contractoragency = lazy(() => import('../../container/systemsetting/contractoragency'));
const Severities = lazy(() => import('../../container/systemsetting/severities'));
const Natureofwork = lazy(() => import('../../container/systemsetting/natureofwork'));
const Notification = lazy(() => import('../../container/systemsetting/notification'));
const Language = lazy(() => import('../../container/systemsetting/language'));
const Stringsource = lazy(() => import('../../container/systemsetting/stringsource'));
const Menumaster = lazy(() => import('../../container/systemsetting/menumaster'));
const Template = lazy(() => import('../../container/systemsetting/template'));

const Organizationstructure = lazy(() => import('../../container/systemsetting/organizationstructure'));
const Systemsettingpage = lazy(() => import('../../container/systemsettingpage'));

const Profile = lazy(() => import('../../container/systemsetting/profile'));
const ProfilePage = lazy(() => import('../../container/systemsetting/profile/ProfilePage'));
const Notificationsettings = lazy(() => import('../../container/systemsetting/notificationsettings'));

const SiteMatrix = lazy(() => import('../../container/systemsetting/site/SiteMatrix'));

function SystemSettingRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/tenant`} component={Tenant} />
      <Route path={`${path}/language`} component={Language} />
      <Route path={`${path}/stringsource`} component={Stringsource} />
      <Route path={`${path}/menumaster`} component={Menumaster} />
      <Route path={`${path}/site`} component={Site} />
      <Route path={`${path}/department`} component={Department} />
      <Route path={`${path}/shift`} component={Shift} />
      <Route path={`${path}/designation`} component={Designation} />
      <Route path={`${path}/position`} component={Position} />
      <Route path={`${path}/contractoragency`} component={Contractoragency} />
      <Route path={`${path}/severities`} component={Severities} />
      <Route path={`${path}/natureofwork`} component={Natureofwork} />
      <Route path={`${path}/notification`} component={Notification} />

      <Route path={`${path}/template`} component={Template} />

      <Route path={`${path}/organizationstructure`} component={Organizationstructure} />
      <Route path={`${path}/systemsettingpage`} component={Systemsettingpage} />

      <Route path={`${path}/notificationsettings`} component={Notificationsettings} />
      <Route path={`${path}/profile`} component={Profile} />
      <Route path={`${path}/profilepage`} component={ProfilePage} />


      <Route path={`${path}/sitematrix`} component={SiteMatrix} />

    </Switch>

  );
}

export default SystemSettingRoutes;
