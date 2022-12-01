import Table from 'components/Table';
import {groupByMaybe} from 'util/array';
import {renderWithChildren} from 'util/react';
import {
  chain,
  option,
  getProp,
  map,
  pipe,
  safe,
  Maybe,
  isArray,
  isFoldable,
} from 'crocks';
import {getAnswerDate, getAnswerOutput, getAnswerTitle} from '../utils';
import {Translation} from 'react-i18next';

const RequestTables = pipe(
  getProp('data'),
  chain(getProp('answer')),
  chain(safe(isFoldable)),
  map(map(answer => (
    Maybe.of(title => date => output => ({
      title,
      date,
      output
    }))
    .ap(getAnswerTitle(answer))
    .ap(getAnswerDate(answer))
    .ap(getAnswerOutput(answer))
    .option({})
  ))),
  map(groupByMaybe(getProp('title'))),
  option({}),
  pipe(
    Object.entries,
    map(([name, data]) => (
      <div key={name}>
        <h3 className='font-semibold text-lg'>{name}</h3>
        <Table className='mt-4'>
          <Table.Head>
            <Translation ns='request'>
              {t => (<Table.Tr>
                <Table.Th>{t`table.date`}</Table.Th>
                <Table.Th>{t`table.answer`}</Table.Th>
              </Table.Tr>)}
            </Translation>
          </Table.Head>
          <Table.Body>
            {pipe(
              safe(isArray),
              map(map(a => (
                <Table.Tr key={JSON.stringify(a)}>
                  <Table.Td>{getProp('date', a).option('-')}</Table.Td>
                  <Table.Td><span className='text-gray-900'>{getProp('output', a).option('-')}</span></Table.Td>
                </Table.Tr>
              ))),
              option(null),
            )(data)}
          </Table.Body>
        </Table>
      </div>
    )),
    renderWithChildren(<div className='p-4 mt-8 space-y-8 lg:flex lg:space-y-0 lg:space-x-8' />),
  ),
);

export default RequestTables;
