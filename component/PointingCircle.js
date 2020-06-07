import React from 'react';
import styled from 'styled-components';
import constants from '../constants';

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-width: 1px;
  border-radius: 25px;
  border-color: red;

  position: absolute;
`;

const Text = styled.Text`
  color: red;
`;

// Angle of View for Camera
const AngleOfView = [77, 45];

const PointingCircle = ({cameraId = 0, angle = 0}) => {
  const onLeft = 0;
  const CenterOfScreen = constants.width / 2 - 20;
  const temp = Number(
    (
      CenterOfScreen +
      angle * (constants.width / AngleOfView[cameraId])
    ).toFixed(0),
  );

  return (
    <Container style={{left: temp, top: 200}}>
      <Text>{angle}</Text>
      <Text>{temp}</Text>
    </Container>
  );
};

export default PointingCircle;
