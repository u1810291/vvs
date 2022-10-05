import Index from '../SideBarLayout';
import Nullable from 'components/atom/Nullable';
import SearchInputGroup from '../../components/atom/input/InputGroup/SearchInputGroup';
import Table from '../../components/Table';
// import {asciifyLT} from '@s-e/frontend/transformer/string';
import {componentToString} from '@s-e/frontend/react';
import {every} from '../../util/array';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {reduce} from 'crocks/pointfree';
import {renderWithProps, dynamicSort, withMergedClassName} from '../../util/react';
import {useCallback, useMemo, useState} from 'react';

import {
  and,
  constant,
  filter,
  hasProps,
  ifElse,
  isArray,
  isEmpty,
  map,
  not,
  option,
  pipe,
  safe,
} from 'crocks';
import Button from 'components/Button';

export const asciifyLT2 = string => string
  .replace(/a/gi, '(a|ą)')
  .replace(/c/gi, '(c|č)')
  .replace(/e/gi, '(e|ė|ę)')
  .replace(/i/gi, '(i|į)')
  .replace(/s/gi, '(s|š)')
  .replace(/u/gi, '(u|ų|ū)')
  .replace(/z/gi, '(z|ž)');


/**
 * @typedef {Object} TableColumnComponent
 * @prop {(item: Object) => Maybe<ComponentProps>} itemToProps
 * @prop {import('react').ComponentType} Component
 * @prop {string} headerText
 * @prop {string} key
 */

/**
 * @param {Object} props
 * @param {Array} props.list
 * @param {(item: object) => string} props.rowKeyLens
 * @param {TableColumnComponent[]} props.tableColumns
 */
const Listing = ({
  list = [],
  rowKeyLens,
  filters,
  columns,
  tableColumns,
  breadcrumbs,
  buttons,
  innerlinks,
}) => {
  const [query, setQuery] = useState('');
  const activeTableColumnPred = useCallback(column => isEmpty(columns) || columns.includes(column.key), [columns]);
  const [sortColumnKey, setSortColumn] = useState('name');
  const headerColumns = useMemo(() => pipe(
    safe(and(isArray, every(hasProps(['key', 'headerText'])))),
    map(pipe(
      filter(activeTableColumnPred),
      map(a => pipe(
        b => ({key: b.key, children: b.headerText}),
        renderWithProps(Button.NoBg),
        btn => <Table.Th className='hover:text-black' key={a.key} onClick={() => setSortColumn(a.key)}>{btn}</Table.Th>,
      )(a))
    )),
    option([]),
  )(tableColumns), [tableColumns, activeTableColumnPred]);
  
  const rows = useMemo(() => pipe(
    //sort
    row => row.sort(dynamicSort(sortColumnKey)),
    // filter and render
    reduce((rs, r) => ifElse(
      r => tableColumns
        .map(c => componentToString(c.Component(c.itemToProps(r).option(''))))
        .some(c => pipe(
          safe(not(isEmpty)),
          map(String),
          // map(c => c.match(new RegExp(asciifyLT(query.replace(/\W+/gm, '')), 'gi'))),
          map(c => c.match(new RegExp(asciifyLT2(query.replace(/[^\w\d -]/gm, '')), 'gi'))),
          map(Boolean),
          option(false),
        )(c)),

      item => [...rs, (
        <Table.Tr key={rowKeyLens(item)}>
          {
          reduce((cs, c) => ifElse(
            and(hasProps(['key', 'itemToProps', 'Component']), activeTableColumnPred),
            ({key, itemToProps, Component, styles}) => [...cs, (
              <Table.Td key={key}>
                <Component className={styles} {...itemToProps(item).option({className: 'opacity-20 inline-block w-full text-center', children: '—'})} />
              </Table.Td>
            )],
            constant(cs),
            c,
          ), [], tableColumns)
        }
        </Table.Tr>
      )],
      constant(rs),
      r,
    ), []),
  )(list), [list, tableColumns, activeTableColumnPred, rowKeyLens, query, sortColumnKey]);
  return (
    <Index>
      <TitleBar>
        <div className='lg:flex lg:items-center lg:space-between pt-5 lg:pb-5 space-y-4 lg:space-y-0 lg:space-x-4 grow shrink'>
          {breadcrumbs}
          <SearchInputGroup onChange={onInputEventOrEmpty(setQuery)} className='grow shrink' />
        </div>
        <div className='lg:justify-end justify-between flex items-center space-x-4'>
          <div className='flex flex-row md:space-x-4'>
            {buttons}
          </div>
          <div>
            {innerlinks}
          </div>
        </div>
      </TitleBar>
      <Nullable on={filters}>
        <div className='w-full flex'>
          {filters}
        </div>
      </Nullable>
      <Table id='tableId'>
        <Table.Head>
          <Table.Tr>
            {headerColumns}
          </Table.Tr>
        </Table.Head>
        <Table.Body>{rows}</Table.Body>
      </Table>
    </Index>
  );
}

const TitleBar = withMergedClassName(
  'lg:flex w-full lg:justify-between items-center px-5 space-y-4 lg:space-y-0',
  props => (
    <header {...props} />
  )
);

export default Listing;
