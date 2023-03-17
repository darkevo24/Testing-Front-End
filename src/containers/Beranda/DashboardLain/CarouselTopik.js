import React, { useEffect, useState } from 'react';
import { TOPIC_DASHBOARD } from './constants';
import CardTopikDashboardLain from 'components/Cards/CardTopikDashboardLain';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
//import arrow from react-icons
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const Wrapper = styled.div`
  .slick-list {
    width: 900px;
  }
  .slick-prev:before,
  .slick-next:before,
  .slick-prev:after,
  .slick-next:after {
  {
  
    width: 20px;
    height: 20px;
    display: none;

  }
  
`;

const SampleNextArrow = (props) => {
  const { className, style, onClick, white } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        right: '-20px',
        justifyContent: 'center',
        alignItems: 'center',

        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
        background: white ? 'white' : '#ecedf3',
      }}
      onClick={onClick}>
      <span style={{ fontSize: '15px', color: '#3C3E4D' }}>
        <IoIosArrowForward />
      </span>
    </div>
  );
};

function SamplePrevArrow(props) {
  const { className, style, onClick, white } = props;

  return (
    <div
      className={className}
      style={{
        ...style,

        display: 'flex',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        left: '-22px',
        zIndex: '1',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
        background: white ? 'white' : '#ecedf3',
      }}
      onClick={onClick}>
      <span style={{ fontSize: '15px', color: '#3C3E4D' }}>
        <IoIosArrowBack />
      </span>
    </div>
  );
}

const CarouselTopik = ({ clickedActive }) => {
  const [selectedTopik, setSelectedTopik] = useState('');
  const [checkIndex, setCheckIndex] = useState(0);
  const history = useHistory();
  const [whitePrev, setWhitePrev] = useState(true);
  const [whiteNext, setWhiteNext] = useState(false);

  useEffect(() => {
    if (clickedActive) {
      setSelectedTopik(clickedActive);
    }
  }, [clickedActive]);

  useEffect(() => {
    if (clickedActive === 'Pertumbuhan Ekonomi') {
      if (checkIndex === 0) {
        setWhitePrev(false);
        setWhiteNext(true);
      }
      if (checkIndex === 3) {
        setWhitePrev(true);
        setWhiteNext(true);
      }
    }
    if (clickedActive === 'Nilai Tukar Nelayan') {
      if (checkIndex === 0) {
        setWhitePrev(true);
        setWhiteNext(true);
      }
      if (checkIndex === 3) {
        setWhitePrev(true);
        setWhiteNext(false);
      }
    }
    if (clickedActive === 'Gini Rasio') {
      if (checkIndex === 0) {
        setWhitePrev(true);
        setWhiteNext(false);
      } else {
        setWhitePrev(false);
        setWhiteNext(true);
      }
    }
    if (
      clickedActive !== 'Gini Rasio' &&
      clickedActive !== 'Nilai Tukar Nelayan' &&
      clickedActive !== 'Pertumbuhan Ekonomi'
    ) {
      setWhitePrev(true);
      setWhiteNext(true);
    }
  }, [checkIndex, clickedActive]);

  const handleGoNext = (item) => {
    history.push({
      pathname: '/dashboard-lain',
      state: item.title,
    });
    setSelectedTopik(item.title);
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 4,
    initialSlide: 0,
    afterChange: (current) => setCheckIndex(current),
    nextArrow: <SampleNextArrow active={selectedTopik !== 'Pertumbuhan Ekonomi'} white={whiteNext} />,
    prevArrow: <SamplePrevArrow clickedActive={clickedActive} white={whitePrev} />,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        {TOPIC_DASHBOARD.map((topic, id) => (
          <CardTopikDashboardLain onClick={handleGoNext} item={topic} key={id} id={id} onActive={selectedTopik} />
        ))}
      </Slider>
    </Wrapper>
  );
};

export default CarouselTopik;
