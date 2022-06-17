import Async from 'crocks/Async';
import Breadcrumbs from '../../components/Breadcrumbs';
import Filter from '../../components/Filter';
import Maybe from 'crocks/Maybe';
import SearchInputGroup from '../../components/InputGroup/SearchInputGroup';
import SidebarLayout from '../../layout/sidebarLayout';
import Table from '../../components/Table';
import {asciifyLT} from '@s-e/frontend/transformer/string';
import {componentToString} from '@s-e/frontend/react';
import {every} from '../../util/array';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {reduce} from 'crocks/pointfree';
import {renderWithProps} from '../../util/react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  and,
  filter,
  not,
  tap,
  hasProps,
  ifElse,
  isArray,
  isEmpty,
  map,
  option,
  pipe,
  safe,
  constant,
  objOf,
} from 'crocks';

/**
 * @type TableColumnComponent
 * @param {Object} props
 * @param {(item: Object) => Maybe<ComponentProps>} props.itemToProps
 * @param {import('react').ComponentType} props.Component
 * @param {string} props.headerText
 * @param {string} props.key
 */

/**
 * @param {Object} props
 * @param {Async} props.asyncGetter
 * @param {(item: object) => string} props.rowKeyLens
 * @param {TableColumnComponent[]} props.tableColumns
 */
const Listing = ({
  asyncGetter,
  rowKeyLens,
  tableColumns,
}) => {
  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [query, setQuery] = useState('');

  const activeTableColumnPred = useCallback(column => isEmpty(columns) || columns.includes(column.key), [columns]);

  const filterItems = useMemo(() => pipe(
    safe(isArray),
    map(map(pipe(
      safe(hasProps(['headerText', 'key'])),
      map(a => ({
        uid: a.key,
        key: a.key,
        children: a.headerText,
      })),
      map(renderWithProps(Filter.Item)),
      option(null),
    ))),
    option(null)
  )(tableColumns), [tableColumns]);

  const headerColumns = useMemo(() => pipe(
    safe(and(isArray, every(hasProps(['key', 'headerText'])))),
    map(pipe(
      filter(activeTableColumnPred),
      map(pipe(
        a => ({ key: a.key, children: a.headerText }),
        renderWithProps(Table.Th)
      ))
    )),
    option([]),
  )(tableColumns), [tableColumns, activeTableColumnPred]);

  const rows = useMemo(() => reduce((rs, r) => ifElse(
    r => tableColumns
    .map(c => componentToString(c.Component(c.itemToProps(r).option(''))))
    .some(c => pipe(
      safe(not(isEmpty)),
      map(String),
      map(c => c.match(new RegExp(asciifyLT(query.replace(/\W+/gm, '')), 'gi'))),
      map(Boolean),
      option(false),
    )(c)),
    item => (
      <Table.Tr key={rowKeyLens(item)}>
      {
        reduce((cs, c) => ifElse(
          and(hasProps(['key', 'itemToProps', 'Component']), activeTableColumnPred),
          ({key, itemToProps, Component}) => [...cs, (
            <Table.Td key={key}>
              <Component {...itemToProps(item).option({className: 'opacity-20 inline-block w-full text-center', children: '—'})} />
            </Table.Td>
          )],
          constant(cs),
          c,
        ), [], tableColumns)
      }
      </Table.Tr>
    ),
    constant(rs),
    r,
  ), [], list), [list, tableColumns, activeTableColumnPred, rowKeyLens, query]);

  useEffect(() => {asyncGetter.fork(console.error, setList)}, [asyncGetter]);

  return (
    <SidebarLayout>
      <TitleBar>
        <div className='md:flex md:space-x-4 md:space-y-0 space-y-4'>
          <Breadcrumbs>
            <Breadcrumbs.Item><span className='font-semibold'>Objektai</span></Breadcrumbs.Item>
            <Breadcrumbs.Item>Visi duomenys</Breadcrumbs.Item>
          </Breadcrumbs>
          <SearchInputGroup onChange={onInputEventOrEmpty(setQuery)} />
        </div>
      </TitleBar>
      <Filter onValues={setColumns}>{filterItems}</Filter>
      <Table>
        <Table.Head>
          <Table.Tr>{headerColumns}
          </Table.Tr>
        </Table.Head>
        <Table.Body>{rows}</Table.Body>
      </Table>
    </SidebarLayout>
  );
}

const TitleBar = props => (
  <header className='flex w-full justify-between p-6'>
    {props?.children}
  </header>
);

export default Listing;
