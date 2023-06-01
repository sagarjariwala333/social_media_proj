import React, { Suspense, lazy } from 'react';
import { Row, Col, Spin } from 'antd';
import { Switch, NavLink, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { AddUser } from '../../pages/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main } from '../../styled';

const Profile = lazy(() => import('./ProfilePage'));
const NotificationSettings = lazy(() => import('./NotificationSettings'));

function ViewPage({ match }) {
  return (
    <>
      <PageHeader ghost title="" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards
                title={
                  <div className="card-nav tabmainBox">
                    <ul>
                      <li>
                        <NavLink to={`${match.path}/profilepage`} onclick="">
                          Profile
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/notificationsettings`} onclick="">
                          Notification Settings
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                }
              >
                <Switch>
                  <Suspense
                    fallback={
                      <div className="spin">
                        <Spin />
                      </div>
                    }
                  >
                    <Route exact path={`${match.path}`} component={Profile} />
                    <Route exact path={`${match.path}/profilepage`} component={Profile} />
                    <Route exact path={`${match.path}/notificationsettings`} component={NotificationSettings} />
                  </Suspense>
                </Switch>
              </Cards>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
}

ViewPage.propTypes = {
  match: propTypes.object,
};

export default ViewPage;
