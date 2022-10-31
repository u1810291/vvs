import Index from '../SideBarLayout';
import Nullable from 'components/atom/Nullable';
import SearchInputGroup from '../../components/atom/input/InputGroup/SearchInputGroup';
import Table from '../../components/Table';
// import {asciifyLT} from '@s-e/frontend/transformer/string';
import {componentToString} from '@s-e/frontend/react';
import {every} from '../../util/array';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {reduce} from 'crocks/pointfree';
import {renderWithProps, withMergedClassName} from '../../util/react';
import {useCallback, useMemo, useState, useRef} from 'react';

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
  isFunction
} from 'crocks';
// import Button from 'components/Button';
import SortButton from 'components/Button/SortButton';

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
  api,
  list = [],
  rowKeyLens,
  filters,
  columns,
  tableColumns,
  breadcrumbs,
  buttons,
  innerlinks,
  sortColumnKey,
  setSortColumn,
}) => {
  const [query, setQuery] = useState('');
  const activeTableColumnPred = useCallback(column => isEmpty(columns) || columns.includes(column.key), [columns]);
  
  const headerColumns = useMemo(() => pipe(
    safe(and(isArray, every(hasProps(['key', 'headerText'])))),
    map(pipe(
      filter(activeTableColumnPred),
      map(a => pipe(
        b => ({key: b.key, children: b.headerText}),
        b => {
          let direction = null;
          if (a.key === sortColumnKey) direction = 'asc';
          else if (`-${a.key}` === sortColumnKey) direction = 'desc';
          
          return renderWithProps(SortButton, {...b, direction, isSortable: a.isSortable})
        },
        btn => <Table.Th className='hover:text-black text-left sticky top-0 z-1 bg-gray-50' key={a.key} onClick={() => {
          isFunction(setSortColumn) && a.isSortable && setSortColumn(a.key)
        }}>{btn}</Table.Th>,
      )(a))
    )),
    option([]),
  )(tableColumns), [tableColumns, activeTableColumnPred]);
  
  const rows = useMemo(() => pipe(
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
  )(list), [list, tableColumns, activeTableColumnPred, rowKeyLens, query]);

  // on table scroll
  const tableWrapperRef = useRef(null);
  const onScroll = () => {
    if (tableWrapperRef.current && api) {
      const {scrollTop, scrollHeight, clientHeight} = tableWrapperRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        api.setSize(api.size + 1);
      }
    }
  }

  return (
    <Index>
      <TitleBar>
        <div className='xl:flex xl:items-center xl:space-between pt-5 xl:pb-5 space-y-4 xl:space-y-0 xl:space-x-4 w-full'>
          {breadcrumbs}
          <SearchInputGroup onChange={onInputEventOrEmpty(setQuery)} className='w-1/4' />
        </div>
        <div className='xl:justify-end justify-between flex items-center space-x-4'>
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
      <div className='overflow-x-auto' ref={tableWrapperRef} onScroll={onScroll}>
        <Table id='tableId'>
          <Table.Head>
            <Table.Tr>
              {headerColumns}
            </Table.Tr>
          </Table.Head>
          <Table.Body>{rows}</Table.Body>
        </Table>
      </div>
    </Index>
  );
}

const TitleBar = withMergedClassName(
  'xl:flex w-full xl:justify-between items-center px-5 space-y-4 xl:space-y-0 space-x-0 xl:space-x-4',
  props => (
    <header {...props} />
  )
);

export default Listing;
