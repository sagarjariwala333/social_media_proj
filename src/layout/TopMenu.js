import React, { useLayoutEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TopMenuStyle } from './style';

function TopMenu() {
  const { path } = useRouteMatch();
  const menuData = useSelector((state) => state.menu.data);
  console.log(menuData);
  useLayoutEffect(() => {
    const active = document.querySelector('.strikingDash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const addParentActive = (event) => {
    document.querySelectorAll('.parent').forEach((element) => {
      element.classList.remove('active');
    });

    const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
    const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
    if (!megaMenu) {
      event.currentTarget.closest('ul').previousSibling.classList.add('active');
      if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
    } else {
      event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
    }
  };

  return (
    <TopMenuStyle>
      <div className="strikingDash-top-menu">
        <ul>
          <li>
            <NavLink to={`${path}/social`} onClick={addParentActive}>
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;
