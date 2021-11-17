import React from 'react';
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

const List = [
  {
    title: 'Layanan',
    linkList: [
      {
        title: 'Unduhan',
        link: '/unduhan',
      },
      {
        title: 'Data Requests',
        link: '/data-requests',
      },
      {
        title: 'Developer',
        link: '/developer',
      },
      {
        title: 'FAQ',
        link: '/faq',
      },
    ],
  },
  {
    title: 'Indeks',
    linkList: [
      {
        title: 'Brenda',
        link: '/brenda',
      },
      {
        title: 'Dataset',
        link: '/dataset',
      },
      {
        title: 'Dashboard',
        link: '/dashboard',
      },
      {
        title: 'Berita',
        link: '/berita',
      },
      {
        title: 'Tentang',
        link: '/tentang',
      },
    ],
  },
  {
    title: 'Links',
    linkList: [
      {
        title: 'Kontak Kami',
        link: '/kontak-kami',
      },
      {
        title: 'Open Project SDI',
        link: '/open-project-sdi',
      },
      {
        title: 'Chat',
        link: '/chat',
      },
    ],
  },
];

export const Top = () => (
  <Box>
    <Container>
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

        {List.map((item, index) => (
          <Column key={index + item.title}>
            <Titles>{item.title}</Titles>
            {item.linkList.map((linkItem) => (
              <FooterLink href="#" key={linkItem.title}>
                {linkItem.title}
              </FooterLink>
            ))}
          </Column>
        ))}
      </Row>
    </Container>
  </Box>
);
