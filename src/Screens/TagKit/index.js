import * as React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import * as NfcIcons from '../../Components/NfcIcons';
import * as Ntag424 from '../../data/ntag-424';
import * as Ntag213 from '../../data/ntag-213';
import * as Ntag215 from '../../data/ntag-215';
import * as Sic43NT from '../../data/sic-43nt';

function TagKitScreen(props) {
  const {navigation} = props;

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <List.Section>
        <List.Subheader>SIC 43NT</List.Subheader>
        <List.Item
          title="Rolling Code"
          description="Verificar Rolling Code"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Verificar Rolling Code',
              readOnly: true,
              savedRecord: Sic43NT.verifyRollingCode,
            });
          }}
        />
        <List.Item
          title="Senha"
          description="Habilitar senha de proteção"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Habilitar Senha',
              readOnly: true,
              savedRecord: Sic43NT.enablePassword,
            });
          }}
        />
        <List.Item
          title="Senha"
          description="Verificar Senha"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Verificar Senha',
              readOnly: true,
              savedRecord: Sic43NT.verifyPassword,
            });
          }}
        />

        <List.Subheader>NXP NTAG 424 DNA</List.Subheader>
        <List.Item
          title="Temperatura"
          description="Habilitar Detecção de Temperatura"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Detecção de Temperatura',
              readOnly: true,
              savedRecord: Ntag424.enableTemper,
            });
          }}
        />
        <List.Item
          title="Temperatura"
          description="Verificar Status da Temperatura"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Status da Temperatura',
              readOnly: true,
              savedRecord: Ntag424.verifyTemperState,
            });
          }}
        />
        <List.Item
          title="Assinatura"
          description="Verificar Assinatura"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Verificar Assinatura',
              readOnly: true,
              savedRecord: Ntag424.readSignature,
            });
          }}
        />

        <List.Subheader>NXP NTAG 213</List.Subheader>
        <List.Item
          title="Habilitar Senha"
          description="Habilitar senha de proteção"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Habilitar senha de proteção',
              readOnly: true,
              savedRecord: Ntag213.enablePassword,
            });
          }}
        />
        <List.Item
          title="Senha"
          description="Verificar Senha"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Verify password',
              readOnly: true,
              savedRecord: Ntag213.verifyPassword,
            });
          }}
        />

        <List.Subheader>NXP NTAG 215</List.Subheader>
        <List.Item
          title="Senha"
          description="Habilitar Senha"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Habilitar Senha',
              readOnly: true,
              savedRecord: Ntag215.enablePassword,
            });
          }}
        />
        <List.Item
          title="senha"
          description="Verificar Senha"
          left={NfcIcons.TransceiveIcon}
          onPress={() => {
            navigation.navigate('CustomTransceive', {
              title: 'Verificar Senha',
              readOnly: true,
              savedRecord: Ntag215.verifyPassword,
            });
          }}
        />
      </List.Section>
    </ScrollView>
  );
}

export default TagKitScreen;
