import React, {useState, useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

import RNDeviceRotation from 'react-native-device-rotation';
import styled from 'styled-components';
import PointingCircle from './component/PointingCircle';
import LPF from 'lpf';

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

const Touchable = styled.TouchableOpacity``;
let subscription = null;

const App = () => {
  const [azimuth, setAzimuth] = useState(0);
  const [cAzimuth, setCAzimuth] = useState(0);

  /**
   * Initialize & Clean Up
   */
  useEffect(() => {
    console.log('Initialize');
    LPF.init([]);
    LPF.smoothing = 0.2;

    const orientationEvent = new NativeEventEmitter(RNDeviceRotation);
    subscription = orientationEvent.addListener(
      'DeviceRotation',
      ({azimuth}) => {
        setAzimuth(LPF.next(azimuth));
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
        <PointingCircle cameraId={0} angle={targetAngle} />
      </Touchable>
    </Container>
  );
};

export default App;
