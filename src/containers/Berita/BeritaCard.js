import styled from 'styled-components';

export const BeritaCard = styled.div`
  border: 1px solid #e1e2ea;
  height: 100%;
`;

export const BeritaCardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

export const BeritaCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const BeritaCardContent = styled.div`
  padding: 16px;
`;

export const BeritaCardTanggal = styled.div`
  font-size: 14px;
  color: #515154;
  margin-bottom: 10px;
`;

export const BeritaCardJudul = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #2d2627;
`;
