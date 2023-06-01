import React, { useState }  from 'react';
import { Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';
import { RecordViewWrapper } from './Style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import TreeView from '../../../components/tree/tree';

const treeData = [
  {
    id: 1,
    name: 'Parent 1',
    show: true,
    children: [
      {
        id: 2,
        name: 'Child 1',
        show: true,
        children: [
          {
            id: 3,
            name: 'Grandchild 1',
            show: true,
            children:[]
          },
          {
            id: 4,
            name: 'Grandchild 2',
            show: true,
            children:[]
          },
        ],
      },
      {
        id: 5,
        name: 'Child 2',
        show: true,
        children:[]
      },
    ],
  },
  {
    id:2,
    name:'Parent-2',
    show: true,
    children: [
      {
        id:1,
        name:'Parent Child-1',
        show: true,
        children:[]
      },
      {
        id:2,
        name:'Parent Child-2',
        show: true,
        children:[]
      }
    ]
  }
];

// const expandAll = (data,hide) =>{
//   data.map(node=>{
//     node.show = hide;
//     if(node.children){
//       node.children = expandAll(node.children,false);
//     }
//   })

//   return data;
// }



const Organization = (props) => {
  const { handleRoute } = props;
  const [expandAll,setexpandAll]=useState(false);
  const { t } = useTranslation();
  const isLoading = false;
  handleRoute('organization');
    
    

 
  return (
    <RecordViewWrapper className='bodycontainer'>
      <PageHeader
        ghost
        title={t('organizationstructure')}
        className="scheduleheader padlefzero"
        buttons={[
         
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input type="text" name="recored-search" placeholder="Search Here" />
          </div>,
           <div>
           <Button className="btn-add_new" size="default" key="1" type="default">
             <Link to="#" onClick={() => setexpandAll(!expandAll)}>
               <FeatherIcon icon={expandAll ? 'minus-circle' : t('plus-circle')} size={14} /> 
               <span>{expandAll ? t('Collapse') : t('Expand')}</span>
             </Link>
           </Button>
         </div>,
         
        ]}
      />
      <Main className='mainContainer'>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                 <TreeView data={treeData}/>
                </div>
              )}

              <div className="stickyBox">
                <div className="selectedcount">
                  2 Selected
                  </div>
                  <div className="buttonBoxArea">
                  <Button className="btn-add" size="default" key="1" type="primary">
                    <Link to="#">
                      <FeatherIcon icon="plus" size={14} /> <span>{t('addnew')}</span>
                    </Link>
                  </Button>
                  <Button className="btn-add" size="default" key="1" type="primary">
                    <Link to="#">
                      <FeatherIcon icon="plus" size={14} /> <span>{t('addnew')}</span>
                    </Link>
                  </Button>
                  <Button className="btn-add" size="default" key="1" type="primary">
                    <Link to="#">
                      <FeatherIcon icon="plus" size={14} /> <span>{t('addnew')}</span>
                    </Link>
                  </Button>
                  <Button className="btn-add" size="default" key="1" type="primary">
                    <Link to="#">
                      <FeatherIcon icon="plus" size={14} />
                    </Link>
                  </Button>
                  </div>
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

Organization.propTypes={
  handleRoute: propTypes.func
}

export default Organization;
