import { HomeIcon } from '@heroicons/react/solid'
import {
  pipe,
  getProp,
  map,
  option,
  getPropOr,
  getPathOr,
} from 'crocks';
import {caseMap} from '@s-e/frontend/flow-control';
import {putIntoArray} from '../../util/array';
import {withComponentFactory} from '../../util/react';

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

const Breadcrumbs = ({FirstItem, Item, ...props}) => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol role="list" className="flex items-center space-x-4">
      {
        pipe(
          getProp('children'),
          map(putIntoArray),
          map(array  => array.map((itemComponent, index, all) => (
            <Item {...{
              ...getPropOr({}, 'props', itemComponent),
              key: index,
              hasSlash: index > 0,
            }} />
          ))),
          option(null),
        )(props)
      }
    </ol>
  </nav>
)

const Item = ({hasSlash = true, children, props}) => (
  <li {...props}>
    <div className="flex items-center">
      {hasSlash && (
          <svg
            className="flex-shrink-0 h-5 w-5 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
      )}
      <span className="ml-4 text-sm font-medium text-gray-500">
        {children}
      </span>
    </div>
  </li>
);

export default withComponentFactory(Breadcrumbs, {
  Item,
});
