import RBRow from 'react-bootstrap/Row';
import RBCol from 'react-bootstrap/Col';
import { ReactComponent as CallIcon } from 'assets/call.svg';
import { ReactComponent as PrinterIcon } from 'assets/printer.svg';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';

import styled from 'styled-components';

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

export const Top = ({ history, token }) => {
  const indexes = [
    {
      title: 'Beranda',
      link: '/home',
    },
    {
      title: 'Dataset',
      link: !!token ? '/dataset' : '/topic-detail',
    },
  ];
  if (token) {
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
          title: 'FAQ',
          link: '',
          disabled: true,
        },
      ],
    },
  ];

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
            <div className="d-flex justify-content-between">
              <Row>
                <Column>
                  <img src={LogoBappenas} alt="logo" height="96px" width="96px" />
                </Column>
                <Column>
                  <Titles>Kementerian PPN/Bappenas</Titles>
                  <FooterLink>
                    Sekretariat Satu Data Indonesia
                    <br />
                    Jalan Taman Suropati No.2 Jakarta 10310
                  </FooterLink>
                  <FooterLink>
                    <CallIcon /> 021-31936207
                  </FooterLink>
                  <FooterLink>
                    <PrinterIcon /> 021-3145374
                  </FooterLink>
                </Column>
              </Row>

              <Column>
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
              </Column>
            </div>
          </RBCol>
        </RBRow>
      </Container>
    </Box>
  );
};
