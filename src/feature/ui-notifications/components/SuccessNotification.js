
import {CheckCircleIcon} from '@heroicons/react/solid';
import {useTranslation} from 'react-i18next';
import NotificationSimple, {NOTIFICATION_ICON_CLASS_NAME} from './NotificationSimple';

const SuccessNotification = props => {
  const {t} = useTranslation();
  return (
    <NotificationSimple
      Icon={CheckCircleIcon}
      iconClassName={NOTIFICATION_ICON_CLASS_NAME.SUCCESS}
      heading={t`success`}
      {...props}
    />
  );
};

export default SuccessNotification;
