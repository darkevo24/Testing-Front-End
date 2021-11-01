import styled from 'styled-components';

const TentangProfile = ({urlPhoto, name, position}) => {
  const ProfileName = styled.div`
    font-family: Myriad Pro;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0px;
    text-align: center;
    color: #2D2627;
    margin: 16px 0;
  `;

  const ProfilePosition = styled.div`
    font-family: Myriad Pro;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0px;
    text-align: center;
    color: #515154;
  `;

  const ProfilePhoto = styled.div`
    background-image: url('${urlPhoto}');
    height: 200px;
    width: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
  `;

  const Container = styled.div`
    display: inline-grid;
    padding: 24px 63px;
  `;

  return (
    <Container>
      <ProfilePhoto/>
      <ProfileName>{name}</ProfileName>
      <ProfilePosition>{position}</ProfilePosition>
    </Container>
  );
};

export default TentangProfile;
