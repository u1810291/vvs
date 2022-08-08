
import SearchInputGroup from '../../components/atom/input/InputGroup/SearchInputGroup';
import Index from '../SideBarLayout';
import Table from '../../components/Table';
import {asciifyLT} from '@s-e/frontend/transformer/string';
import {componentToString} from '@s-e/frontend/react';
import {every} from '../../util/array';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {reduce} from 'crocks/pointfree';
import {renderWithProps} from '../../util/react';
import {useCallback, useMemo, useState} from 'react';
import {
  and,
  filter,
  not,
  hasProps,
  ifElse,
  isArray,
  isEmpty,
  map,
  option,
  pipe,
  safe,
  constant,
} from 'crocks';
import Nullable from 'components/atom/Nullable';

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
}) => {
  const [query, setQuery] = useState('');
  const activeTableColumnPred = useCallback(column => isEmpty(columns) || columns.includes(column.key), [columns]);

  

  

  const headerColumns = useMemo(() => pipe(
    safe(and(isArray, every(hasProps(['key', 'headerText'])))),
    map(pipe(
      filter(activeTableColumnPred),
      map(pipe(
        a => ({key: a.key, children: a.headerText}),
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
    item => [...rs, (
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
    )],
    constant(rs),
    r,
  ), [], list), [list, tableColumns, activeTableColumnPred, rowKeyLens, query]);

  return (
    <Index>
      <TitleBar>
        <div className='md:flex md:space-x-4 md:space-y-0 space-y-4 w-full'>
          <div className='flex-grow flex-shrink'>
          {breadcrumbs}
          </div>
          <div className='flex-grow flex-shrink'>
            <SearchInputGroup onChange={onInputEventOrEmpty(setQuery)} />
          </div>
          <div className='flex-grow flex-shrink justify-end flex md:space-x-4'>
            {buttons}
          </div>
        </div>
      </TitleBar>
      <Nullable on={filters}>
        <div className='w-full'>
          {filters}
        </div>
      </Nullable>
      <Table>
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

const TitleBar = props => (
  <header className='flex w-full justify-between p-5 h-20'>
    {props?.children}
  </header>
);

export default Listing;
