import React from 'react';
import styled from 'styled-components';
import { CardWithIconAndText } from '../../components/Cards/CardWithIconAndText';
import { ReactComponent as EkonomiSvg } from 'assets/ekonomi.svg';
import { ReactComponent as LingkunganSvg } from 'assets/lingkungan.svg';
import { ReactComponent as Bundaya } from 'assets/budaya.svg';
import { ReactComponent as PerlindungamSvg } from 'assets/perlindungam.svg';
import { ReactComponent as PendidikanSvg } from 'assets/pendidikan.svg';
import { ReactComponent as PemerintahanSvg } from 'assets/pemerintahan.svg';
import { ReactComponent as PendukungSvg } from 'assets/pendukung.svg';
import { ReactComponent as KetertibanSvg } from 'assets/ketertiban.svg';
import { ReactComponent as PembangunanSvg } from 'assets/pembangunan.svg';
import { ReactComponent as PertahananSvg } from 'assets/pertahanan.svg';

const Box = styled.div`
  margin-top: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const BoxTopic = styled.div`
  background: #ff0000;
  color: #fff;
  width: 43px;
  text-orientation: upright;
  writing-mode: vertical-lr;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-weight: bold;
  height: 160px;
  font-size: 16px;
  line-height: 22px;
`;

const BoxFlex = styled.div`
  display: flex;
`;

export const Topic = () => (
  <BoxFlex style={{ margin: '44px 0' }}>
    <BoxTopic>Topic</BoxTopic>
    <Box>
      <BoxFlex>
        <CardWithIconAndText icon={<EkonomiSvg />} text={'Ekonomi dan Industri'} />
        <CardWithIconAndText icon={<LingkunganSvg />} text={'Lingkungan dabn SDA'} />
        <CardWithIconAndText icon={<Bundaya />} text={'Bundaya dan Agama'} />
        <CardWithIconAndText icon={<PerlindungamSvg />} text={'Perlindungan Sosial & Kesehtan'} />
        <CardWithIconAndText icon={<PembangunanSvg />} text={'Pembangunan Daerah'} />
      </BoxFlex>
      <BoxFlex>
        <CardWithIconAndText icon={<PendidikanSvg />} text={'Pendidikan dan Tenaga Kerja'} />
        <CardWithIconAndText icon={<PemerintahanSvg />} text={'Pemerintahan Umum'} />
        <CardWithIconAndText icon={<PendukungSvg />} text={'Pendukung Umum'} />
        <CardWithIconAndText icon={<KetertibanSvg />} text={'Ketertiban Umum dan Keselamantan'} />
        <CardWithIconAndText icon={<PertahananSvg />} text={'Pertahanan dan Luar Negeri'} />
      </BoxFlex>
    </Box>
  </BoxFlex>
);
