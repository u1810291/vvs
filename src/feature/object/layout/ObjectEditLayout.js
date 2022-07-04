import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SidebarLayout from 'layout/SideBarLayout';
import {useParams} from 'react-router-dom';
import ObjectRoute from '../routes';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import {
  getPath,
  objOf,
} from 'crocks';
import {useObject} from '../api';


const ObjectEditLayout = ({headerContent, children, buttonchildren, ...props}) => {
  const params = useParams();
  const {query} = useObject(params);
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const send = () => {};

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={ObjectRoute}/>
            {
              getPath(['data', 'object_by_pk', 'name'], query)
                .alt(getPath(['data', 'object_by_pk', 'id'], query))
                .map(objOf('children'))
                .map(props => (
                  <Breadcrumbs.Item  className='font-semibold' key={props.children}>
                    <span {...props} />
                  </Breadcrumbs.Item>
                ))
                .option(null)
            }
        </Breadcrumbs>
        <div className='space-x-4'>
          <Button.Nd>{t`cancel`}</Button.Nd>
          <Button onClick={send}>{t`save`}</Button>
        </div>
      </>
    </Header>
      {/*<ObjectEditForm />*/}
    </SidebarLayout>
  )
};

export default ObjectEditLayout;
