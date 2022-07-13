import React from 'react';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { CMS_DASHBOARD } from 'utils/constants';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import { Roles } from 'containers/App/config';
import { useEffect } from 'react';

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector(userSelector);
  const apmAllowedRole = [Roles.ADMIN, Roles.SUPERADMIN, Roles.SUPERVISOR];
  const feedbackAllowedRole = [Roles.CONTENT_CREATOR, Roles.SEKRETARIANT_CREATOR, Roles.SUPERADMIN, Roles.ADMIN];
  const budgetAllowedRole = [Roles.OPERASIONAL, Roles.PPK, Roles.SUPERADMIN, Roles.ADMIN];
  const knowledgeAllowedRole = [Roles.GLOSARIUM_CREATOR, Roles.GLOSARIUM_APPROVER, Roles.SUPERADMIN, Roles.ADMIN];
  const releaseAllowedRole = [
    Roles.CONTENT_CREATOR,
    Roles.SEKRETARIANT,
    Roles.SEKRETARIANT_CREATOR,
    Roles.CR_APPROVER,
    Roles.SUPERADMIN,
  ];

  const redirectToPage = (page) => {
    if (!page?.link) {
      window.location.replace(page.externalLink);
    }
    history.push(page.link);
  };

  useEffect(() => {
    const isRoleAllowedToOpenApm = apmAllowedRole.some((allowedRole) => allowedRole === user.roles);
    if (!isRoleAllowedToOpenApm) {
      const apmDashboardIndex = CMS_DASHBOARD.findIndex((cms) => cms.title === 'Application Monitoring');
      if (apmDashboardIndex > -1) {
        CMS_DASHBOARD.splice(apmDashboardIndex, 1);
      }
    }

    const isRoleAllowedToOpenFeedback = feedbackAllowedRole.some((allowedRole) => allowedRole === user.roles);
    if (!isRoleAllowedToOpenFeedback) {
      const feedbackDashboardIndex = CMS_DASHBOARD.findIndex((cms) => cms.title === 'Feedback');
      if (feedbackDashboardIndex > -1) {
        CMS_DASHBOARD.splice(feedbackDashboardIndex, 1);
      }
    }

    const isRoleAllowedToOpenBudget = budgetAllowedRole.some((allowedRole) => allowedRole === user.roles);
    if (!isRoleAllowedToOpenBudget) {
      const budgetDashboardIndex = CMS_DASHBOARD.findIndex((cms) => cms.title === 'Budget');
      if (budgetDashboardIndex > -1) {
        CMS_DASHBOARD.splice(budgetDashboardIndex, 1);
      }
    }

    const isRoleAllowedToOpenKnowledge = knowledgeAllowedRole.some((allowedRole) => allowedRole === user.roles);
    if (!isRoleAllowedToOpenKnowledge) {
      const knowledgeDashboardIndex = CMS_DASHBOARD.findIndex((cms) => cms.title === 'Knowledge');
      if (knowledgeDashboardIndex > -1) {
        CMS_DASHBOARD.splice(knowledgeDashboardIndex, 1);
      }
    }

    const isRoleAllowedToOpenRelease = releaseAllowedRole.some((allowedRole) => allowedRole === user.roles);
    if (!isRoleAllowedToOpenRelease) {
      const changeAndReleaseDashboardIndex = CMS_DASHBOARD.findIndex((cms) => cms.title === 'Change & Release');
      if (changeAndReleaseDashboardIndex > -1) {
        CMS_DASHBOARD.splice(changeAndReleaseDashboardIndex, 1);
      }
    }
  }, []);

  return (
    <Row md={4} className="m-50 d-flex align-items-center justify-content-center">
      {CMS_DASHBOARD.map((_, idx) => (
        <Col key={idx} className="sdp-csm-card m-10" onClick={() => redirectToPage(_)}>
          <Card className="box-shadow-none bg-transparent">
            <div className={_.iconColor + ' div-icon-wrapper brp-50 p-16 w-fit-content'}>
              <div className="sdp-text-white">{_.icon}</div>
            </div>
            <Card.Body className="mt-16">
              <Card.Title className="sdp-text-black-light fw-bold fs-20 lh-24">{_.title}</Card.Title>
              <Card.Text className="sdp-text-black-lighter fs-16 lh-21">{_.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Dashboard;
