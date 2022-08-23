import Index from '../SideBarLayout';
import Nullable from 'components/atom/Nullable';
import SearchInputGroup from '../../components/atom/input/InputGroup/SearchInputGroup';
import Table from '../../components/Table';
// import {asciifyLT} from '@s-e/frontend/transformer/string';
import {componentToString} from '@s-e/frontend/react';
import {every} from '../../util/array';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {reduce} from 'crocks/pointfree';
import {renderWithProps} from '../../util/react';
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
  // tap,
} from 'crocks';



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
  ), [], list), [list, tableColumns, activeTableColumnPred, rowKeyLens, query]);

  return (
    <Index>
      <TitleBar>
        <div className='md:flex md:space-x-4 md:space-y-0 space-y-4 w-full items-center'>
          <div className=''>
          {breadcrumbs}
          </div>
          <div className='w-96'>
            <SearchInputGroup onChange={onInputEventOrEmpty(setQuery)} />
          </div>
          <div className='flex-grow flex-shrink justify-end flex items-center space-x-4'>
            <div className='flex flex-row md:space-x-4'>
              {buttons}
            </div>
            <div>
              {innerlinks}
            </div>
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
