import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TxDetails from '../../src/components/tx/TxDetails';
import BigNumber from 'bignumber.js';

const tx = {
  hash: '0x95c1767c33c37ef93de48897c1001679d947bd7f082fdf4e772c534ae180b9c8',
  data: '0xDADA',
  from: '0x1234',
  to: '0x9876',
  gas: 21000,
  gasPrice: new BigNumber('30000000000'),
  value: new BigNumber('100999370000000000000'),
};

storiesOf('TxDetails', module)
  .add('default', () => (<TxDetails tokenSymbol="ETH" fiatAmount="100.1" transaction={tx}/>));
