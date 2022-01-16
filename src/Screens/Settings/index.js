import React from 'react';
import {
  Image,
  Linking,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions,
  Alert,
} from 'react-native';
import {List, TextInput, Button} from 'react-native-paper';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {version} from '../../../package.json';
import {captureException} from '../../setupSentry';

const generalText = `
Aplicativo de registro NFC para os produtos da RG Pets.
`;

function SettingsScreen(props) {
  const [nfcStatus, setNfcStatus] = React.useState(null);
  const [feedback, setFeedback] = React.useState('');
  const [keyboardPadding, setKeyboardPadding] = React.useState(0);
  const scrollViewRef = React.useRef();
  const scrollPosRef = React.useRef(0);

  React.useEffect(() => {
    function onNfcStateChanged(evt = {}) {
      const {state} = evt;
      setNfcStatus(state === 'on');
    }

    async function checkNfcState() {
      setNfcStatus(await NfcManager.isEnabled());
      NfcManager.setEventListener(NfcEvents.StateChanged, onNfcStateChanged);
    }

    if (Platform.OS === 'android') {
      checkNfcState();
    }

    return () => {
      if (Platform.OS === 'android') {
        NfcManager.setEventListener(NfcEvents.StateChanged, null);
      }
    };
  }, []);

  React.useEffect(() => {
    async function onKbShow() {
      const estimatedKbHeight = Dimensions.get('window').width;
      setKeyboardPadding(estimatedKbHeight);
      setTimeout(() => {
        scrollViewRef.current.scrollTo({
          y: scrollPosRef.current + estimatedKbHeight,
        });
      }, 200);
    }

    function onKbHide() {
      setKeyboardPadding(0);
    }

    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', onKbShow);
      Keyboard.addListener('keyboardWillHide', onKbHide);
    }

    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeListener('keyboardWillShow', onKbShow);
        Keyboard.removeListener('keyboardWillHide', onKbHide);
      }
    };
  }, []);

  return (
    <ScrollView
      style={[styles.wrapper]}
      ref={scrollViewRef}
      onScroll={({nativeEvent}) => {
        scrollPosRef.current = nativeEvent.contentOffset.y;
      }}
      keyboardShouldPersistTaps="handled">
      <View style={styles.topBanner}>
        <Text style={{lineHeight: 16}}>{generalText}</Text>
      </View>
      <List.Section>
        {Platform.OS === 'android' && (
          <>
            <List.Item
              title="NFC Status"
              description={
                nfcStatus === null ? '---' : nfcStatus ? 'ON' : 'OFF'
              }
            />
            <List.Item
              title="NFC"
              description="Habilitar NFC"
              onPress={() => {
                NfcManager.goToNfcSetting();
              }}
            />
          </>
        )}
        <List.Item title="Versão" description={version} />
        <List.Item
          title="RG Pets"
          description="https://rgpets.shop"
          onPress={() => {
            Linking.openURL(
              'https://rgpets.shop',
            );
          }}
        />

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  topBanner: {
    borderRadius: 6,
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  maintainerIcon: {
    width: 54,
    height: 54,
    overflow: 'hidden',
    borderRadius: 4,
  },
});

export default SettingsScreen;
