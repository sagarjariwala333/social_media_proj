/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Layout } from 'antd'; 
import { Scrollbars } from 'react-custom-scrollbars';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import MenueItems from './MenueItems';
import { Div } from './style';
import { changeRtlMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';

const { darkTheme } = require('../config/theme/themeVariables');

const {  Sider, Content } = Layout;
// const { darkMode } = config;

const ThemeLayout = (WrappedComponent) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }

    render() {
      const { collapsed } = this.state;
      const { ChangeLayoutMode, rtl, changeRtl, changeLayout, changeMenuMode } = this.props;
      const left = !rtl ? 'left' : 'right';
      const darkMode = ChangeLayoutMode;
      

      const toggleCollapsedMobile = () => {
        
          this.setState({
            collapsed: !collapsed,
          });
        
      };




      // const footerStyle = {
      //   padding: '20px 30px 18px',
      //   color: 'rgba(0, 0, 0, 0.65)',
      //   fontSize: '14px',
      //   background: 'rgba(255, 255, 255, .90)',
      //   width: '100%',
      //   boxShadow: '0 -5px 10px rgba(146,153,184, 0.05)',
      // };

      const SideBarStyle = {
        margin: '63px 0 0 0',
        padding: '15px 15px 55px 15px',
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        [left]: 0,
        zIndex: 998,
      };

      const renderView = ({ style, ...props }) => {
        const customStyle = {
          marginRight: 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div {...props} style={{ ...style, ...customStyle }} />;
      };

      const renderThumbVertical = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
          [left]: '2px',
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
      };

      const renderTrackVertical = () => {
        const thumbStyle = {
          position: 'absolute',
          width: '6px',
          transition: 'opacity 200ms ease 0s',
          opacity: 0,
          [rtl ? 'left' : 'right']: '2px',
          bottom: '2px',
          top: '2px',
          borderRadius: '3px',
        };
        return <div style={thumbStyle} />;
      };

      const renderThumbHorizontal = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
      };

      const onRtlChange = () => {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'rtl');
        changeRtl(true);
      };

      const onLtrChange = () => {
        const html = document.querySelector('html');
        html.setAttribute('dir', 'ltr');
        changeRtl(false);
      };

      const modeChangeDark = () => {
        changeLayout(true);
      };

      const modeChangeLight = () => {
        changeLayout(false);
      };

      const modeChangeTopNav = () => {
        changeMenuMode(true);
      };

      const modeChangeSideNav = () => {
        changeMenuMode(false);
      };

      const onEventChange = {
        onRtlChange,
        onLtrChange,
        modeChangeDark,
        modeChangeLight,
        modeChangeTopNav,
        modeChangeSideNav,
      };

      return (
        <Div darkMode={darkMode}>
          <Layout className="layout">
            <Layout>
              { 
                <ThemeProvider theme={darkTheme}>
                  <Sider width={280} style={SideBarStyle} collapsed={collapsed} theme={!darkMode ? 'light' : 'dark'}>
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumbVertical}
                      renderView={renderView}
                      renderTrackVertical={renderTrackVertical}
                    >
                      {/* <p className="sidebar-nav-title">MAIN MENU</p> */}
                      <MenueItems
                        topMenu={false}
                        rtl={rtl}
                        toggleCollapsed={toggleCollapsedMobile}
                        darkMode={darkMode}
                        events={onEventChange}
                      />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              }
              <Layout className="atbd-main-layout">
                <Content>
                  <WrappedComponent {...this.props} />
                  {/* <Footer className="admin-footer" style={footerStyle}>
                    <Row>
                      <Col md={12} xs={24}>
                        <span className="admin-footer__copyright">2023 © SovWare</span>
                      </Col>
                      <Col md={12} xs={24}>
                        <div className="admin-footer__links">
                          <NavLink to="#">About</NavLink>
                          <NavLink to="#">Team</NavLink>
                          <NavLink to="#">Contact</NavLink>
                        </div>
                      </Col>
                    </Row>
                  </Footer> */}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      ChangeLayoutMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  };

  const mapStateToDispatch = (dispatch) => {
    return {
      changeRtl: (rtl) => dispatch(changeRtlMode(rtl)),
      changeLayout: (show) => dispatch(changeLayoutMode(show)),
      changeMenuMode: (show) => dispatch(changeMenuMode(show)),
    };
  };

  LayoutComponent.propTypes = {
    ChangeLayoutMode: propTypes.bool,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
    changeRtl: propTypes.func,
    changeLayout: propTypes.func,
    changeMenuMode: propTypes.func,
  };

  return connect(mapStateToProps,mapStateToDispatch)(LayoutComponent);
};
export default ThemeLayout;
