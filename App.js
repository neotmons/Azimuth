import React, {useState, useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

import RNDeviceRotation from 'react-native-device-rotation';
import LPF from 'lpf'; // Low Pass Filter
import {RNCamera} from 'react-native-camera';

import styled from 'styled-components';
import PointingCircle from './component/PointingCircle';
import constants from './constants';

//align-items: center;
const Container = styled.View`
  width: 100%;
`;
const Text = styled.Text``;
const Button = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  width: 150px;
  height: 80px;
  border-radius: 10px;
`;
const HeaderBox = styled.View`
  background-color: black;
  height: 50px;
`;

const CameraBox = styled.View`
  background-color: red;
`;
const ControlBox = styled.View``;

const Touchable = styled.TouchableOpacity``;
let subscription = null;

const App = () => {
  const [cameraTop, setCameraTop] = useState(0);
  const [cameraLeft, setCameraLeft] = useState(0);
  const [cameraZoom, setCameraZoom] = useState(0);

  const [azimuth, setAzimuth] = useState(0);
  const [cAzimuth, setCAzimuth] = useState(0);

  /**
   * Initialize & Clean Up
   */
  useEffect(() => {
    console.log('Initialize');
    // Low Pass Filter
    LPF.init([]);
    LPF.smoothing = 0.2;

    const orientationEvent = new NativeEventEmitter(RNDeviceRotation);
    subscription = orientationEvent.addListener(
      'DeviceRotation',
      ({azimuth}) => {
        //setAzimuth(LPF.next(azimuth));
        setAzimuth(azimuth);
      },
    );
    RNDeviceRotation.start();

    // Clean up
    return () => {
      if (subscription) {
        subscription.remove();
      }
      RNDeviceRotation.stop();
      console.log('Clean up');
    };
  }, []);

  useEffect(() => {}, [azimuth]);

  const targetAngle = (azimuth - cAzimuth).toFixed(1);

  /**
   * 화각 - 77, 45
   */

  return (
    <Container>
      <HeaderBox></HeaderBox>
      <CameraBox>
        <RNCamera
          ratio="4:3"
          style={{
            top: cameraTop,
            left: cameraLeft,
            width: constants.width,
            height: 500,
          }}
          type={RNCamera.Constants.Type.back}
          zoom={cameraZoom}
          captureAudio={false}
        />
        <PointingCircle cameraId={1} angle={targetAngle} />
      </CameraBox>
      <ControlBox>
        <Text>
          {targetAngle}({cAzimuth.toFixed(2)})
        </Text>

        <Touchable
          onPress={() => {
            setCAzimuth(azimuth);
          }}>
          <Button>
            <Text>Calibration</Text>
          </Button>
        </Touchable>
      </ControlBox>
    </Container>
  );
};

export default App;
