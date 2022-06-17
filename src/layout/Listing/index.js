import SidebarLayout from '../../layout/sidebarLayout';
import SearchInputGroup from '../../components/InputGroup/SearchInputGroup';
import Breadcrumbs from '../../components/Breadcrumbs';
import Table from '../../components/Table';
import Filter from '../../components/Filter';
import {
  Async,
  and,
  bichain,
  chain,
  curry,
  filter,
  getProp,
  getPropOr,
  hasProp,
  hasProps,
  ifElse,
  isArray,
  isEmpty,
  map,
  not,
  objOf,
  option,
  pipe,
  safe,
  tap,
} from 'crocks';
import { every } from '../../util/array';

import {useEffect, useState} from 'react';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {titleCase} from '@s-e/frontend/transformer/string';
import {renderWithProps} from '../../util/react';

const Listing = ({
  asyncGetter,
  rowKeyLens,
  tableColums,
}) => {
  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    asyncGetter
      .fork(console.error, setList)
  }, []);

  return (
    <SidebarLayout>

      <TitleBar>
        <div className='md:flex md:space-x-4 md:space-y-0 space-y-4'>

          <Breadcrumbs>
            <Breadcrumbs.Item><span className='font-semibold'>Objektai</span></Breadcrumbs.Item>
            <Breadcrumbs.Item>Visi duomenys</Breadcrumbs.Item>
          </Breadcrumbs>

          <SearchInputGroup />

        </div>
      </TitleBar>

      <Filter onValues={setColumns}>
        {
          pipe(
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
          )(tableColums)
        }
      </Filter>

      <Table>
        <Table.Head>
          <Table.Tr>
            {
              pipe(
                safe(and(isArray, every(hasProps(['key', 'headerText'])))),
                map(pipe(
                  tap(console.warn),
                  filter(a => isEmpty(columns) || columns.includes(a.key)),
                  map(pipe(
                    a => ({ key: a.key, children: a.headerText }),
                    renderWithProps(Table.Th)
                  ))
                )),
                option([]),
              )(tableColums)
            }
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {
            pipe(
              map(pipe(
                item => (
                  <Table.Tr key={rowKeyLens(item)}>
                  {
                    pipe(
                      safe(isArray),
                      map(filter(a => isEmpty(columns) || columns.includes(a.key))),
                      map(
                        map(
                          pipe(
                            safe(hasProps(['key', 'itemPropMapper', 'Component'])),
                            map(({key, itemPropMapper, Component}) => (
                              <Table.Td key={key}>
                                <Component {...itemPropMapper(item)} />
                              </Table.Td>
                            )),
                            option(null),
                          ),
                        ),
                      ),
                      option(null),
                    )(tableColums)
                  }
                  </Table.Tr>
                )
              )),
            )(list)
          }
        </Table.Body>
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
