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
  const CenterOfScreen = constants.width / 2 - 20;
  const screenRate = (constants.width / AngleOfView[cameraId]).toFixed(0);

  /**
  const temp = Number(
    CenterOfScreen -
      (angle * (constants.width / AngleOfView[cameraId])).toFixed(0),
  );
   */
  const angleTemp = 38.5;

  const temp = Number(
    (
      CenterOfScreen -
      (constants.width / AngleOfView[cameraId]) * angle
    ).toFixed(0),
  );

  console.log(angle, CenterOfScreen, AngleOfView[cameraId], temp);

  return (
    <Container style={{left: temp, top: 0}}>
      <Text>{angle}</Text>
    </Container>
  );
};

/**
<Text>{temp}</Text>
      <Text>{screenRate}</Text>
       */

export default PointingCircle;
