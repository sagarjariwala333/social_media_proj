import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { RecordViewWrapper } from './Style';
import { Main } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import Notification from '../../../components/utilities/auth-info/notification';
import { Cards } from '../../../components/cards/frame/cards-frame';

const ViewPage = () => {
const { t } = useTranslation();
console.log("loading notification")
  return (
    <RecordViewWrapper>
      <PageHeader
        ghost
        title={t("notification")}
      />
      <Main>
           <Cards headless>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Notification />
          </Col>
        </Row>
        </Cards>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPage;
