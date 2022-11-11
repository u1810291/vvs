import Button from 'components/Button';
import withPreparedProps from 'hoc/withPreparedProps';
import Listing from 'layout/ListingLayout';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {DislocationZoneActivityForecastCreateRoute} from '../routes';

const DislocationZoneActivityForecastListLayout = () => {
  return <Listing />;
};
// export default DislocationZoneActivityForecastListLayout;

export default withPreparedProps(Listing, props => {
  const nav = useNavigate();
  const {t} = useTranslation('report')

  return {
    buttons: (
      <Button
        onClick={() => nav(DislocationZoneActivityForecastCreateRoute.props.path)}>
        {t('create')}
      </Button>
    ),
  }
});
