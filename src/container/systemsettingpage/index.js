import React, { Suspense, useState, lazy } from 'react';
import { Row, Col, Spin } from 'antd';
import { Switch, NavLink, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { AddUser } from '../pages/style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';

const Department = lazy(() => import('../systemsetting/department'));
const Site = lazy(() => import('../systemsetting/site'));
const Shift = lazy(() => import('../systemsetting/shift'));
const Designation = lazy(() => import('../systemsetting/designation'));
const Position = lazy(() => import('../systemsetting/position'));
const Severities = lazy(() => import('../systemsetting/severities'));
const Natureofwork = lazy(() => import('../systemsetting/natureofwork'));
const Contractoragency = lazy(() => import('../systemsetting/contractoragency'));
const Organization = lazy(() => import('../systemsetting/organizationstructure'));
const SiteMatrix = lazy(() => import('../systemsetting/site/SiteMatrix'));

function AddNew({ match }) {
  const [compName, setCompName] = useState('organization');

  const handleRoute = (compName) => {
    setCompName(compName);
  };
 
  return (
    <>
      <PageHeader ghost title="" />
      <Main className="mainCard">
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards
                title={
                  <div className="card-nav tabmainBox">
                    <ul>
                      <li>
                        <NavLink
                          className={compName === 'organization' ? 'active' : ''}
                          to={`${match.path}/organizationstructure`}
                        >
                          Organization Structure
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/site`}>Site</NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/department`}>Department</NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/shift`}>Shift</NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/designation`}>Designation</NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/position`} onClick={() => handleRoute('position')}>
                          Position
                        </NavLink>
                      </li>

                      

                      <li>
                        <NavLink to={`${match.path}/severities`}>Severities</NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/natureofwork`}>Nature Of Work</NavLink>
                      </li>

                      <li>
                        <NavLink to={`${match.path}/rolepermissions`}>Role Permissions</NavLink>
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
                    <Route exact path={`${match.path}`}>
                      <Organization handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/organizationstructure`}>
                      <Organization handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/site`}>
                      <Site handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/department`}>
                      <Department handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/shift`}>
                      <Shift handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/designation`}>
                      <Designation handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/position`}>
                      <Position handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/contractoragency`}>
                      <Contractoragency handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/severities`}>
                      <Severities handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/natureofwork`}>
                      <Natureofwork handleRoute={handleRoute} />
                    </Route>
                    <Route exact path={`${match.path}/sitematrix`}>
                      <SiteMatrix />
                    </Route>
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

AddNew.propTypes = {
  match: propTypes.object,
};

export default AddNew;
