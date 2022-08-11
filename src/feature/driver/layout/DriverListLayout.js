import Breadcrumbs, {RouteAsBreadcrumb} from '../../../components/Breadcrumbs';
import ListingLayout from '../../../layout/ListingLayout';
import React from 'react';
import withPreparedProps from '../../../hoc/withPreparedProps';
import DriverRoute from '../routes';
import {useTranslation} from 'react-i18next';
import {getPropOr} from 'crocks';

const DriverListLayout = withPreparedProps(ListingLayout, () => {
  return {
    list: [],
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <RouteAsBreadcrumb route={DriverRoute}/>
        <Breadcrumbs.Item>
          {useTranslation('driver', {keyPrefix: 'breadcrumbs'}).t`allData`}
        </Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    tableColumns: [
    ],
  }
});

export default DriverListLayout;
