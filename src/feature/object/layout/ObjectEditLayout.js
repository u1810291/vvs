import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SidebarLayout from 'layout/SideBarLayout';
import {useParams} from 'react-router-dom';
import ObjectRoute from '../routes';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import {useObject} from '../api';
import Nullable from 'components/atom/Nullable';
import ObjectEditForm from '../form/ObjectEditForm';
import {
  getPath,
  identity,
} from 'crocks';

const ObjectEditLayout = ({headerContent, children, ...props}) => {
  const params = useParams();
  const {query} = useObject(params, [ console.error, identity, ]);
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const send = () => {};

  const breadcrumb = getPath(['data', 'object_by_pk', 'name'], query)
    .alt(getPath(['data', 'object_by_pk', 'id'], query))
    .option(null)

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={ObjectRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      <ObjectEditForm/>
    </SidebarLayout>
  )
};

export default ObjectEditLayout;
