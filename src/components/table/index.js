import Header from './Header';
import Data from './Data';
import Head from './Head';
import Body from './Body';
import Row from './Row';
import {withComponentFactory} from '../../util/react';
import {omit} from 'crocks';
import Table from './table';

const TableComponent = withComponentFactory(Table, {
  mapSetupInComponent: omit(['Header','Data','Head','Body','Row']),
  Header,
  Data,
  Head,
  Body,
  Row
});

export default TableComponent;

export {
    Header,
    Data,
    Head,
    Body,
    Row
};
