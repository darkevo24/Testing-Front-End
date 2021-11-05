import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const BimTekSumCarousel = ({ url, title, desc, location, date }) => {
  const Location = styled.div`
    font-family: Myriad Pro;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: #515154;
  `;
  const Title = styled.div`
    white-space: pre-wrap;
    font-family: Myriad Pro;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: #2d2627;
  `;
  const Description = styled.div`
    white-space: pre-wrap;
    font-family: Myriad Pro;
    font-size: 13px;
    font-weight: 400;
    line-height: 22px;
    color: #2d2627;
  `;

  const dataUrl = "url('" + url + "')";

  const stringParse = () => {
    const maxTitle = 76;
    const maxDesc = 315;
    const titleCount = title.length > maxTitle ? title.length : 0;
    const descCount = desc.length;
    const total = titleCount + descCount - (maxTitle + maxDesc);
    let text = desc;

    if (total > 0) {
      text = desc.substring(0, 360 - total);
      let tmp = text.split(' ');
      tmp.slice(tmp.length - 1);

      text = tmp.join(' ') + '...';
    }

    return text;
  };

  return (
    <div className="item">
      <div className="image" style={{ backgroundImage: dataUrl }}></div>
      <Card className="bimtek-jadwal-card" style={{ width: '100%' }}>
        <Location className="mb-2">
          {location}, {date}
        </Location>
        <Title className="mb-2">{title}</Title>
        <Description>{stringParse()}</Description>
      </Card>
    </div>
  );
};

export default BimTekSumCarousel;
