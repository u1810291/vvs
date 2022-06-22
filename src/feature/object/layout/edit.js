import Header from 'components/atom/Header';
import Breadcrumbs from 'components/Breadcrumbs';
import SidebarLayout from 'layout/SideBarLayout';
import {Link} from 'react-router-dom';
import {ObjectListRoute} from '../routes';

const Edit = (props) => {
  return (
    <SidebarLayout>
      <Header>
      <Breadcrumbs>
        <Breadcrumbs.Item><Link to={ObjectListRoute.props.path}>Hey</Link></Breadcrumbs.Item>
      </Breadcrumbs>
      </Header>
    </SidebarLayout>
  )
};

export default Edit;
