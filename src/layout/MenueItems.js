import React from 'react';
import { Layout, Menu, Button, Row, Col } from 'antd';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/authentication/actionCreator';
import Heading from '../components/heading/heading';

const { Header } = Layout;
const MenuItems = ({ darkMode, topMenu, toggleCollapsed, collapsed /* events */ }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const menuData = useSelector((state) => state.menu.data);
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPathnew = pathArray[1]?.split('/')[1];
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath?.split('/');

  /* const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events; */
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const [state, setState] = React.useState({
    showProfile: false,
    subMenu: collapsed,
    submenuArr: [],
    mainmenukey: 'home',
    parentmenu: '',
  });

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const toggleshowProfile = () => {
    setState({ ...state, showProfile: !state.showProfile });
  };
  const toggleshowSubmenu = (submenuArr, key, parentmenu) => {
    console.log(submenuArr);
    console.log('sub menu array');
    if (submenuArr.length > 0) {
      setState({ ...state, submenuArr, subMenu: true, mainmenukey: key, parentmenu });
    } else {
      setState({ ...state, subMenu: false, submenuArr, mainmenukey: key, parentmenu });
    }
  };

  const toggleCollapsedNew = () => {
    toggleCollapsed();
    setState({ ...state, subMenu: false });
  };
  const SignOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    history.push('/');
  };

  const rtl = false;
  return (
    <div>
      <Header
        style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          [!rtl ? 'left' : 'right']: 0,
        }}
      >
        <Row>
          <Col lg={!topMenu ? 4 : 3} sm={6} xs={12} className="align-center-v navbar-brand">
            <Link
              className={topMenu && window.innerWidth > 991 ? 'striking-logo top-menu' : 'striking-logo'}
              to="/admin"
            >
              <img src={require(`../static/img/newlogo.png`)} alt="" />
            </Link>
            {!topMenu || window.innerWidth <= 991 ? (
              <Button type="link" onClick={toggleCollapsedNew}>
                <img src={require(`../static/img/icon/${collapsed ? 'right.svg' : 'left.svg'}`)} alt="menu" />
              </Button>
            ) : null}

            <h3>One mySetu</h3>
          </Col>
        </Row>
      </Header>
      <Menu
        onOpenChange={onOpenChange}
        onClick={onClick}
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        theme={darkMode && 'dark'}
        defaultSelectedKeys={
          !topMenu
            ? [
                `${
                  mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                }`,
              ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<FeatherIcon icon="more-vertical" />}
        openKeys={openKeys}
      >
        <div className="sidemenu">
          <ul>
            {menuData.map((item, index) => {
              return (
                <>
                  {item.isvisible && (
                    <li key={index} className={item.key === state.mainmenukey ? 'active' : ''}>
                      <Link
                        to={`${path}/${item.path}`}
                        onClick={() => toggleshowSubmenu(item.submenu, item.key, item.name)}
                      >
                        <FeatherIcon icon={item.icon} /> {item.name} 
                        
                        
                      </Link>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </Menu>

      <div className={state.subMenu ? 'submenubox openmenu' : 'submenubox'}>
        <h3>{state.parentmenu}</h3>
        <ul className="extramenu">
          {/* <li className="menutitle">{state.parentmenu}</li> */}
          {state.submenuArr.map((item, index) => {
            return (
              <>
                {item.isvisible && (
                  <li key={index} className={item.path === mainPathnew ? 'active' : ''}>
                    <Link to={`${path}/${item.path}`}>
                      <FeatherIcon icon={item.icon} /> {item.name}
                    </Link>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      </div>

      <div className="extramenu">
        <ul>
          <li>
            <a href="/admin/notification">
              <FeatherIcon icon="bell" />
              <span>Notification</span>
            </a>
          </li>
          <li>
            <a href="/admin/help">
              <FeatherIcon icon="help-circle" />
              <span>Help</span>
            </a>
          </li>
          <li>
            <a onClick={toggleshowProfile} href="#">
              <FeatherIcon icon="user" />
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </div>

      <div className={state.showProfile ? 'profilebox open' : 'profilebox'}>
        <div className="user-dropdwon">
          <figure className="user-dropdwon__info">
            <div className="userpic">
              <img src={require('../static/img/avatar/chat-auth.png')} alt="" />
            </div>
            <figcaption>
              <Heading as="h5">Abdullah Bin Talha</Heading>
              <p>UI Expert</p>
            </figcaption>
          </figure>
          <ul className="extramenu">
            <li>
              <Link to="/admin/profile" onClick={toggleshowProfile}>
                <FeatherIcon icon="user" /> Profile
              </Link>
            </li>

            <li>
              <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
                <FeatherIcon icon="log-out" /> Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  collapsed: propTypes.bool,
  toggleCollapsed: propTypes.func,
  /* events: propTypes.object, */
};

export default MenuItems;
