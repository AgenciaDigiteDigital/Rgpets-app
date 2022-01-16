import * as React from 'react';
import {ScrollView, Alert} from 'react-native';
import {List} from 'react-native-paper';
import NfcProxy from '../../NfcProxy';
import * as NfcIcons from '../../Components/NfcIcons';

function ToolKitScreen(props) {
  const {navigation} = props;

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <List.Section>
        <List.Subheader>NfcA</List.Subheader>
        <List.Item
          title="NfcA Custom"
          description="Envie o comando NfcA personalizado para sua tag"
          left={NfcIcons.TransceiveIcon}
          onPress={() =>
            navigation.navigate('CustomTransceive', {
              nfcTech: 'NfcA',
            })
          }
        />
        <List.Item
          title="Apagar"
          description="Escreva todos os blocos para Zero"
          left={NfcIcons.EraseIcon}
          onPress={async () => {
            await NfcProxy.eraseNfcA();
          }}
        />
        <List.Item
          title="Formato NDEF"
          description="Apagar e formato NDEF"
          left={NfcIcons.EraseIcon}
          onPress={async () => {
            await NfcProxy.eraseNfcA({format: true});
          }}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>IsoDep</List.Subheader>
        <List.Item
          title="APDU Custom"
          description="Envie o comando APDU customizado para sua tag"
          left={NfcIcons.TransceiveIcon}
          onPress={() =>
            navigation.navigate('CustomTransceive', {
              nfcTech: 'IsoDep',
            })
          }
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Outro</List.Subheader>
        <List.Item
          title="Testar a API registerTagEvent"
          description="registerTagEvent usa varredura somente NDEF para IOS"
          left={NfcIcons.NfcIcon}
          onPress={async () => {
            const ndefTag = await NfcProxy.readNdefOnce();
            if (ndefTag) {
              navigation.navigate('TagDetail', {tag: ndefTag});
            }
          }}
        />
      </List.Section>
    </ScrollView>
  );
}

export default ToolKitScreen;
