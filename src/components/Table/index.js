import Th from './Th';
import Td from './Td';
import Head from './Head';
import Body from './Body';
import Tr from './Tr';
import {withComponentFactory} from '../../util/react';
import {omit} from 'crocks';
import _Table from './Table';

const Table = withComponentFactory(_Table, {
  mapSetupInComponent: omit(['Th','Td','Head','Body','Tr']),
  Th,
  Td,
  Head,
  Body,
  Tr
});

export default Table;

export {
  Th,
  Td,
  Head,
  Body,
  Tr,
};
