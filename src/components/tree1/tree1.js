import React from 'react';
import { object } from 'prop-types';
import { Button } from 'antd';
import FeatherIcon from 'feather-icons-react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '../checkbox/checkbox';
import { Dropdown } from '../dropdown/dropdown';

const renderTree = (treeData) => {
  const { t } = useTranslation();
  return (
    <ul className="treeview">
      {treeData.map((node) => (
        <li key={node.id}>
          <div className="flexmianrow">
            <div className="arrowicon">
              <FontAwesome
                name="chevron-right"
                className="super-crazy-colors"
                size="1x"
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
            </div>
            <div className="flexrowbox">
              <div className="firstcol">
                <Checkbox>{node.name}</Checkbox>
              </div>
              <div className="secondcol">
                <Dropdown
                  className="wide-dropdwon"
                  content={
                    <>
                      <Link to="#">
                        <span>{t('addsamelevel')}</span>
                      </Link>
                      <Link to="#">
                        <span>{t('addlevelbelow')}</span>
                      </Link>
                      <Link to="#">
                        <span>{t('addlevelabove')}</span>
                      </Link>
                    </>
                  }
                  action={['click']}
                >
                  <Button className="btn-icon" type="info" to="#" shape="circle">
                    <FeatherIcon icon="more-vertical" size={16} />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
          {
            console.log(node)
          }
          {
          node.children && node.children.length > 0 && node.children.map((child) => {return renderTree(child)})
          }
        </li>
      ))}
    </ul>
  );
};

const TreeView1 = ({ data }) => {
  return <div>{renderTree(data)}</div>;
};

TreeView1.propTypes = {
  data: object,
};

export default TreeView1;
