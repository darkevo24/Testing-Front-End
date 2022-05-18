import { useEffect, useState } from 'react';
import RBRow from 'react-bootstrap/Row';
import RBCol from 'react-bootstrap/Col';
import { ReactComponent as CallIcon } from 'assets/call.svg';
import { ReactComponent as PrinterIcon } from 'assets/printer.svg';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';

import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { globalData } from '../App/reducer';
import _ from 'lodash';

export const Box = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-right: 80px;
  @media only screen and (max-width: 992px) {
    margin-right: 40px;
  }
`;

const ColumnWithMargin = styled(Column)`
  @media only screen and (max-width: 992px) {
    margin-top: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Titles = styled.p`
  font-weight: 600;
`;

const FooterLink = styled.a`
  color: #515154;
  margin-bottom: 20px;
  text-decoration: none;
  font-weight: normal;
`;

export const Top = () => {
  const { records } = useSelector(globalData);
  const [logoFooter, setLogoFooter] = useState(null);
  const [noTelepon, setNoTelepon] = useState(null);
  const [noFax, setNoFax] = useState(null);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);
  const [footerLink, setFooterLink] = useState(null);
  const [alamatOrganisasi, setAlamatOrganisasi] = useState(null);

  const history = useHistory();
  const { keycloak } = useKeycloak();
  const isLoggedIn = !!keycloak.authenticated;
  const indexes = [
    {
      title: 'Beranda',
      link: '/home',
    },
    {
      title: 'Dataset',
      link: isLoggedIn ? '/dataset' : '/topic-detail',
    },
  ];
  if (isLoggedIn) {
    indexes.push({
      title: 'Dashboard',
      link: '/kesiapan-sdi',
    });
  }
  indexes.push(
    {
      title: 'Berita',
      link: '/berita',
    },
    {
      title: 'Tentang',
      link: '/tentang',
    },
  );
  const List = [
    {
      title: 'Indeks',
      linkList: indexes,
    },
    {
      title: 'Links',
      linkList: [
        {
          title: 'Kontak Kami',
          link: '/tentang#tentang-form',
        },
        {
          title: 'Kebijakan Privasi',
          link: '/policy',
        },
        {
          title: 'FAQ',
          link: '',
          disabled: true,
        },
      ],
    },
  ];

  useEffect(() => {
    if (!_.isEmpty(records)) {
      let data = _.groupBy(records, 'code');
      if (!_.isEmpty(data.LOGO_FOOTER[0])) {
        setLogoFooter(data.LOGO_FOOTER[0]?.content?.url);
      }

      if (!_.isEmpty(data.NAMA_ORGANISASI[0])) {
        setNamaOrganisasi(data.NAMA_ORGANISASI[0].content.value);
      }

      if (!_.isEmpty(data.ALAMAT_ORGANISASI[0])) {
        setAlamatOrganisasi(data.ALAMAT_ORGANISASI[0].content.value);
      }

      if (!_.isEmpty(data.NO_FAX[0])) {
        setNoFax(data.NO_FAX[0].content.value);
      }

      if (!_.isEmpty(data.NO_TELEPON[0])) {
        setNoTelepon(data.NO_TELEPON[0].content.value);
      }

      if (!_.isEmpty(data.FOOTER_LINK[0])) {
        const footerLink = data.FOOTER_LINK[0].content.value;
        const dataLink = footerLink.split('-');
        List[1].linkList.push({
          title: dataLink[0],
          link: dataLink[1],
        });
      }
    }
  }, [records]);

  const handleClick = (e) => {
    const href = e.target.dataset?.href;
    if (!href) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    history.push(href);
    return false;
  };

  return (
    <Box className="mt-80 mb-55">
      <Container>
        <RBRow>
          <RBCol sm={{ span: 10, offset: 1 }}>
            <div className="d-flex justify-content-between flex-wrap px-16">
              <Row>
                <Column>
                  <img src={logoFooter} alt="logo" height="96px" width="96px" />
                </Column>
                <Column>
                  <Titles>{namaOrganisasi}</Titles>
                  <FooterLink>
                    <div dangerouslySetInnerHTML={{ __html: alamatOrganisasi }} />
                  </FooterLink>
                  <FooterLink>
                    <CallIcon /> {noTelepon}
                  </FooterLink>
                  <FooterLink>
                    <PrinterIcon /> {noFax}
                  </FooterLink>
                </Column>
              </Row>

              <ColumnWithMargin>
                <Row>
                  {List.map((item, index) => (
                    <Column key={index + item.title} className={!index ? 'mr-200' : ''}>
                      <Titles>{item.title}</Titles>
                      {item.linkList.map((linkItem) => (
                        <FooterLink
                          className={linkItem.disabled && 'disabled pe-none'}
                          href={linkItem.link}
                          data-href={linkItem.link}
                          onClick={handleClick}
                          key={linkItem.title}>
                          {linkItem.title}
                        </FooterLink>
                      ))}
                    </Column>
                  ))}
                </Row>
              </ColumnWithMargin>
            </div>
          </RBCol>
        </RBRow>
      </Container>
    </Box>
  );
};
