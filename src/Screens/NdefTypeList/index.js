import * as React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import * as NfcIcons from '../../Components/NfcIcons';

function NdefTypeListScreen(props) {
  const {navigation} = props;

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <List.Section>
        <List.Subheader>Registros</List.Subheader>
        <List.Item
          title="TEXTO"
          description="Exibe um Texto"
          left={NfcIcons.TxtIcon}
          onPress={() => navigation.navigate('NdefWrite', {ndefType: 'TEXT'})}
        />
        <List.Item
          title="URL"
          description="Direciona para um URL"
          left={NfcIcons.UriIcon}
          onPress={() => navigation.navigate('NdefWrite', {ndefType: 'URI'})}
        />

        <List.Item
          title="TELEFONE"
          description="Exibe o Contato"
          left={NfcIcons.TelIcon}
          onPress={() =>
            navigation.navigate('NdefWrite', {ndefType: 'URI', scheme: 'tel:'})
          }
        />

        <List.Item
          title="SMS"
          description="Envia um SMS"
          left={NfcIcons.SmsIcon}
          onPress={() =>
            navigation.navigate('NdefWrite', {ndefType: 'URI', scheme: 'sms:'})
          }
        />

        <List.Item
          title="E-MAIL"
          description="Exibe um E-mail de Contato"
          left={NfcIcons.EmailIcon}
          onPress={() =>
            navigation.navigate('NdefWrite', {
              ndefType: 'URI',
              scheme: 'mailto:',
            })
          }
        />

        <List.Subheader>MIME</List.Subheader>
        <List.Item
          title="WI-FI"
          description="Conecta a uma Rede Wi-Fi"
          left={NfcIcons.WifiIcon}
          onPress={() =>
            navigation.navigate('NdefWrite', {ndefType: 'WIFI_SIMPLE'})
          }
        />

        <List.Item
          title="Contato"
          description="Exibe suas informações de Contato"
          left={NfcIcons.ContactIcon}
          onPress={() => navigation.navigate('NdefWrite', {ndefType: 'VCARD'})}
        />
      </List.Section>
    </ScrollView>
  );
}

export default NdefTypeListScreen;
