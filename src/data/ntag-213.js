const cloneDeep = require('clone-deep');

export function genEnablePasswordCommands(authPageIdx = 0x29) {
  return {
    description:
      'Habilitar Senha\n\nAo definir a SENHA de 4 bytes e PACK de 2 bytes (Password Ack), o acesso de gravação da memória será protegido.',
    payload: {
      tech: 'NfcA',
      value: [
        {
          type: 'command', // read current auth config
          payload: [0x30, authPageIdx],
        },
        {
          type: 'command', // set pack
          payload: [0xa2, authPageIdx + 3, 0, 0, 0, 0],
        },
        {
          type: 'command', // set password
          payload: [0xa2, authPageIdx + 2, 0, 0, 0, 0],
        },
        {
          type: 'command', // set protect read only or read / write
          payload: [0xa2, authPageIdx + 1, 0, 0, 0, 0],
        },
        {
          type: 'command', // set the starting page
          payload: [0xa2, authPageIdx, 0, 0, 0, 0],
        },
      ],
    },

    parameters: [
      {name: 'Password (4 bytes)', length: 4},
      {name: 'Password Ack (2 bytes)', length: 2},
      {name: 'Start Block (1 byte)', length: 1},
    ],

    onParameterChanged: ({parameters, commands}) => {
      const [password, pack, startBlock] = parameters;
      console.log(password);
      const nextCommands = cloneDeep(commands);
      nextCommands[1].payload[2] = pack.payload[0] || 0;
      nextCommands[1].payload[3] = pack.payload[1] || 0;
      nextCommands[2].payload[2] = password.payload[0] || 0;
      nextCommands[2].payload[3] = password.payload[1] || 0;
      nextCommands[2].payload[4] = password.payload[2] || 0;
      nextCommands[2].payload[5] = password.payload[3] || 0;
      nextCommands[4].payload[5] = startBlock.payload[0] || 0;
      return nextCommands;
    },

    beforeTransceive: ({cmdIdx, commands, responses}) => {
      const command = cloneDeep(commands[cmdIdx]);

      if (cmdIdx === 0) {
        return command;
      }

      const currAuthBytes = responses[0];

      if (cmdIdx === 1) {
        command.payload[4] = currAuthBytes[14];
        command.payload[5] = currAuthBytes[15];
      } else if (cmdIdx === 3) {
        // eslint-disable-next-line no-bitwise
        command.payload[2] = currAuthBytes[4] & 0x7f;
        command.payload[3] = currAuthBytes[5];
        command.payload[4] = currAuthBytes[6];
        command.payload[5] = currAuthBytes[7];
      } else if (cmdIdx === 4) {
        command.payload[2] = currAuthBytes[0];
        command.payload[3] = currAuthBytes[1];
        command.payload[4] = currAuthBytes[2];
      }

      return command;
    },
  };
}

export function genVerifyPasswordCommands() {
  return {
    description:
      'Verficar Senha\n\nAo acessar a memória protegida, você deve digitar uma senha para certificar-se de que a autenticação foi concluída.',
    payload: {
      tech: 'NfcA',
      value: [
        {
          type: 'command',
          payload: [0x1b, 0, 0, 0, 0],
        },
      ],
    },

    parameters: [{name: 'Password (4 bytes)', length: 4}],

    onParameterChanged: ({parameters, commands}) => {
      const [password] = parameters;
      const nextCommands = cloneDeep(commands);
      nextCommands[0].payload[1] = password.payload[0] || 0;
      nextCommands[0].payload[2] = password.payload[1] || 0;
      nextCommands[0].payload[3] = password.payload[2] || 0;
      nextCommands[0].payload[4] = password.payload[3] || 0;
      return nextCommands;
    },
  };
}

const enablePassword = {
  name: 'nxp213-enable-pass',
  ...genEnablePasswordCommands(),
};

const verifyPassword = {
  name: 'nxp213-verify-pass',
  ...genVerifyPasswordCommands(),
};

export {enablePassword, verifyPassword};
