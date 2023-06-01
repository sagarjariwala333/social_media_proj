import React from 'react';
import { Badge } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';

function NotificationBox() { 
  const { rtl } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  function renderThumb({ style, ...props }) {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

 

  function renderView({ style, ...props }) {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  }

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  const content = (
    
     <></>
    
  );

  return (
    <div className="notification">
      <Popover placement="bottomLeft" content={content} action="click" >
        <div className='headerNotification'>
        <Badge dot offset={[-8, -5]}>
          <Link to="#" className="head-example">
            <FeatherIcon icon="bell" size={20} />
          </Link>
        </Badge>
        <Heading as="h5" className="atbd-top-dropdwon__title">
        <span className="title-text">Notifications</span>
        <Badge className="badge-success" count={3} />
      </Heading>
      </div>
      </Popover>
      <div className="notification">
     
      
        <ul className="atbd-top-dropdwon__nav notification-list">
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-primary">
                  <FeatherIcon icon="hard-drive" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>
                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
       
      <Link className="btn-seeAll" to="#">
        See all incoming activity
      </Link>
      </div>
    </div>
  );
}

export default NotificationBox;
