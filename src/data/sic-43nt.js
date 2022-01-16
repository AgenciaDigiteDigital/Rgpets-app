import NfcProxy from '../NfcProxy';
import {Ndef} from 'react-native-nfc-manager';
import {Alert} from 'react-native';
import {genEnablePasswordCommands, genVerifyPasswordCommands} from './ntag-213';

const enablePassword = {
  name: 'sic43nt-enable-pass',
  ...genEnablePasswordCommands(),
};

const verifyPassword = {
  name: 'sic43nt-verify-pass',
  ...genVerifyPasswordCommands(),
};

let _prefix = null;

const verifyRollingCode = {
  name: 'sic43nt-verify-rolling-code',
  description: `Rolling Code é uma etiqueta passiva NFC-Forum Tipo 2. A mensagem NDEF de resposta pode ser atualizada automaticamente por um evento acionado com base no campo NFC ou na evidência de violação de tag. \n\nNDEF de resposta quando há campo NFC ou quando o fio ou traço do circuito de detecção de violação foi desconectado.
  Os 80 bits de KEY para gerar o Rolling Code, cujo formato padrão é “Prefixo” de 3 bytes + seu UID de 7 bytes.`,
  payload: {
    tech: 'NfcA',
    value: [],
  },
  parameters: [{name: 'Prefix (3 bytes)', length: 3}],
  onParameterChanged: ({parameters, commands}) => {
    console.warn(parameters);
    const [prefix] = parameters;
    _prefix = [...prefix.payload];
    return commands;
  },
  onExecute: async () => {
    try {
      const tag = await NfcProxy.readTag();
      const firstNdef = tag.ndefMessage[0];
      const uri = Ndef.uri.decodePayload(firstNdef.payload);
      const [_, fullCode] = uri
        .split('?')[1]
        .split('&')
        .map((pair) => pair.split('='))
        .find((query) => query[0] === 'd');
      const uid = fullCode.slice(0, 14).toLowerCase();
      const ts = fullCode.slice(16, 16 + 8).toLowerCase();
      const code = fullCode.slice(24).toLowerCase();
      const prefix = _prefix
        .map((byte) => ('00' + byte.toString(16)).slice(-2))
        .join('');
      console.warn(uid, ts, code, prefix);
      const endpoint = `https://2j6p8l98z5.execute-api.ap-northeast-1.amazonaws.com/prod/sic4310/sign?uid=${uid}&ts=${ts}&prefix=${prefix}`;
      console.warn('endpoint', endpoint);
      const result = await (await fetch(endpoint)).json();
      console.warn('signed reuslt', result);
      if (result.sig !== code) {
        throw new Error('sig error');
      }
      Alert.alert('Rolling Code - Atualizado!');
    } catch (ex) {
      console.warn(ex);
      Alert.alert("Rolling Code - Não Atualizado!");
    }
  },
};

export {enablePassword, verifyPassword, verifyRollingCode};
