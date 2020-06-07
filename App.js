import React, {useState, useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import RNDeviceRotation from 'react-native-device-rotation';
import styled from 'styled-components';

const Container = styled.View`
  align-items: center;
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
    const orientationEvent = new NativeEventEmitter(RNDeviceRotation);
    subscription = orientationEvent.addListener(
      'DeviceRotation',
      ({azimuth}) => {
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

  return (
    <Container>
      <Text>
        {(azimuth - cAzimuth).toFixed(0)}({cAzimuth.toFixed(2)})
      </Text>

      <Touchable
        onPress={() => {
          setCAzimuth(azimuth);
        }}>
        <Button>
          <Text>Calibration</Text>
        </Button>
      </Touchable>
    </Container>
  );
};

export default App;
